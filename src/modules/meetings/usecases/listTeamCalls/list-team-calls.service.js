export class ListTeamCallsService {
  constructor({ meetingCallRepo }) {
    this.meetingCallRepo = meetingCallRepo;
  }

  async execute({ teamId }) {
    return this.meetingCallRepo.findByTeamId(teamId);
  }
}
