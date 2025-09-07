export class FindEventByTeamIdService {
  constructor({ teamRepo, eventRepo }) {
    this.teamRepo = teamRepo;
    this.eventRepo = eventRepo;
  }
  async execute({ teamId }) {
    const events = await this.eventRepo.findByTeamId(teamId);
    return events;
  }
}
