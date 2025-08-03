export class TodayEventDTO {
  public constructor(
    public eventId: number = 0,
    public eventName: string = '',
    public leagueName: string = '',
    public eventDate: string = '',
    public link: string = '',
    public odds1x2: OddToday[] = [],
    public oddsGoal: OddToday[] = [],
    public oddsHandicap: OddToday[] = [],
    public oddsCorner: OddToday[] = [],
  ) {
  }
}

export class OddToday {
  public constructor(
    public oddDate: string = '',
    public _1: string = '',
    public x: string = '',
    public _2: string = '',
    public goals: string = '',
    public corner: string = '',
    public home: string = '',
    public away: string = '',
    public over: number = 0,
    public under: number = 0,
  ) {
  }
}

export class TodayEventResponse {
  public constructor(
    public leagueName: string = '',
    public events: TodayEventDTO[] = [],
  ) {
  }
}
