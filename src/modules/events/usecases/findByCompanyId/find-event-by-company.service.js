export class FindEventByCompanyId {
  constructor({ eventRepo }) {
    this.eventRepo = eventRepo;
  }
  async execute({ companyId }) {
    const events = await this.eventRepo.findByCompanyId(companyId);
    return events;
  }
}
