import { TeamNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class FindProjectByTeamIdService {
  constructor({ teamRepo, projectRepo }) {
    this.teamRepo = teamRepo;
    this.projectRepo = projectRepo;
  }
  async execute({
    teamId,
    query,
    range,
    status,
    sort,
    page,
    limit,
    timezone,
  }) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();

    const normalizedRange = typeof range === "string" ? range.toLowerCase() : "";
    const normalizedSort =
      typeof sort === "string" ? sort.toLowerCase() : "createdat_desc";
    const resolvedTimezone =
      typeof timezone === "string" && timezone.trim() !== ""
        ? timezone
        : Intl.DateTimeFormat().resolvedOptions().timeZone;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const safePage = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1;
    const safeLimit =
      Number.isFinite(limitNumber) && limitNumber > 0 ? Math.min(limitNumber, 100) : 20;

    let dateRange = null;
    if (normalizedRange === "week") {
      dateRange = getCurrentWeekRange(resolvedTimezone);
    } else if (normalizedRange === "month") {
      dateRange = getCurrentMonthRange(resolvedTimezone);
    }

    const { data, total } = await this.projectRepo.findByTeamId(teamId, {
      query,
      status,
      dateRange,
      sort: normalizedSort,
      page: safePage,
      limit: safeLimit,
    });

    return {
      data,
      meta: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / safeLimit),
      },
    };
  }
}

function getTimeZoneOffsetMinutes(date, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return (asUTC - date.getTime()) / 60000;
}

function zonedLocalToUtc(localDate, timeZone) {
  const offset = getTimeZoneOffsetMinutes(localDate, timeZone);
  return new Date(localDate.getTime() - offset * 60000);
}

function getCurrentWeekRange(timeZone) {
  const now = new Date();
  const offsetNow = getTimeZoneOffsetMinutes(now, timeZone);
  const localNow = new Date(now.getTime() + offsetNow * 60000);

  const localMidnight = new Date(
    Date.UTC(
      localNow.getUTCFullYear(),
      localNow.getUTCMonth(),
      localNow.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );
  const day = localNow.getUTCDay();
  const diffToMonday = (day + 6) % 7;
  const startLocal = new Date(localMidnight.getTime() - diffToMonday * 86400000);
  const endLocal = new Date(startLocal.getTime() + 7 * 86400000 - 1);

  return {
    startUtc: zonedLocalToUtc(startLocal, timeZone),
    endUtc: zonedLocalToUtc(endLocal, timeZone),
  };
}

function getCurrentMonthRange(timeZone) {
  const now = new Date();
  const offsetNow = getTimeZoneOffsetMinutes(now, timeZone);
  const localNow = new Date(now.getTime() + offsetNow * 60000);

  const startLocal = new Date(
    Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), 1, 0, 0, 0, 0)
  );
  const endLocal = new Date(
    Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth() + 1, 1, 0, 0, 0, 0)
  );
  endLocal.setUTCDate(endLocal.getUTCDate() - 1);
  endLocal.setUTCHours(23, 59, 59, 999);

  return {
    startUtc: zonedLocalToUtc(startLocal, timeZone),
    endUtc: zonedLocalToUtc(endLocal, timeZone),
  };
}
