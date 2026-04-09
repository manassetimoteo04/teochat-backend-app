export class FindEventByTeamIdService {
  constructor({ teamRepo, eventRepo }) {
    this.teamRepo = teamRepo;
    this.eventRepo = eventRepo;
  }
  async execute({ teamId, query, range, timezone }) {
    const normalizedRange = typeof range === "string" ? range.toLowerCase() : "";
    const resolvedTimezone =
      typeof timezone === "string" && timezone.trim() !== ""
        ? timezone
        : Intl.DateTimeFormat().resolvedOptions().timeZone;

    let dateRange = null;
    if (normalizedRange === "week") {
      dateRange = getCurrentWeekRange(resolvedTimezone);
    }

    const events = await this.eventRepo.findByTeamId(teamId, {
      query,
      dateRange,
    });
    return events;
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
  const day = localNow.getUTCDay(); // 0=Sun, 1=Mon, ...
  const diffToMonday = (day + 6) % 7; // Monday=0
  const startLocal = new Date(localMidnight.getTime() - diffToMonday * 86400000);
  const endLocal = new Date(startLocal.getTime() + 7 * 86400000 - 1);

  return {
    startUtc: zonedLocalToUtc(startLocal, timeZone),
    endUtc: zonedLocalToUtc(endLocal, timeZone),
  };
}
