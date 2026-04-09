import jwt from "jsonwebtoken";
import {
  CompanyNotFoundError,
  InvalidStreamTokenRequestError,
  NotCompanyMemberError,
  NotTeamCompanyError,
  NotTeamMemberError,
  StreamServiceConfigError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";
import { STREAM_API_KEY, STREAM_API_SECRET } from "../../../../configs/env.js";

export class GenerateStreamTokenService {
  constructor({ companyRepo, teamRepo }) {
    this.companyRepo = companyRepo;
    this.teamRepo = teamRepo;
  }

  async execute({ userId, companyId, teamId, callId }) {
    if (!companyId || !teamId) {
      throw new InvalidStreamTokenRequestError();
    }

    if (!STREAM_API_KEY || !STREAM_API_SECRET) {
      throw new StreamServiceConfigError();
    }

    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new TeamNotFoundError();
    if (!team.isCompany(companyId)) throw new NotTeamCompanyError();
    if (!team.isMember(userId)) throw new NotTeamMemberError();

    const normalizedCallId = callId || `team-${teamId}`;
    const expiresInSeconds = 60 * 60 * 3;
    const now = Math.floor(Date.now() / 1000);
    const exp = now + expiresInSeconds;

    const token = jwt.sign(
      {
        user_id: userId,
        call_cids: [`default:${normalizedCallId}`],
      },
      STREAM_API_SECRET,
      {
        algorithm: "HS256",
        expiresIn: expiresInSeconds,
      },
    );

    return {
      token,
      apiKey: STREAM_API_KEY,
      callId: normalizedCallId,
      expiresAt: new Date(exp * 1000).toISOString(),
      userId,
    };
  }
}
