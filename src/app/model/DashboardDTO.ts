export class DashboardDTO {
  public constructor(
    public totalEvents: number = 0,
    public todayEvents: number = 0,
    public upcomingEvents: number = 0,
    public totalLeagues: number = 0,
  ) {
  }
}
