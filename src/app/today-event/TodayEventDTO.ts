export class TodayEventDTO {
  public constructor(
    public eventDate: string = '',
    public homeTeam: string = '',
    public awayTeam: string = '',
    public leagueName: string = '',
    public eventId: number = 0,
    public homeHdc: string = '',
    public homeOdd: number = 0,
    public awayOdd: number = 0,
    public awayHdc: string = '',
    public ouLine: string = '',
    public overOdd: number = 0,
    public underOdd: number = 0,
    public cornerLine: string = '',
    public cornerOverOdd: number = 0,
    public cornerUnderOdd: number = 0,
    public h2h: string[] = [],
    public homeH2h: string[] = [],
    public awayH2h: string[] = [],
  ) {
  }
}
