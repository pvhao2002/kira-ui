export class FilterOddLineDTO {
  public constructor(
    public dislayType: string = '',
    public type: string = '',
    public firstLine: string = '',
    public lastLine: string = '',
    public line: string = '',
    public odd1: number = 0,
    public odd2: number = 0,
    public isCompareOdd: boolean = false,
  ) {
  }
}


export class EventOddDTO {
  public constructor(
    public eventId: number = 0,
    public homeTeam: string = '',
    public awayTeam: string = '',
    public logoHome: string = '',
    public logoAway: string = '',
    public leagueName: string = '',
    public eventDate: string = '',
    public htScoreStr: string = '',
    public ftScoreStr: string = '',
    public cornerStr: string = '',
    public link: string = '',
    public homeLineHdcMovement: string = '',
    public awayLineHdcMovement: string = '',
    public overLineMovement: string = '',
    public underLineMovement: string = '',
    public firstHomeOdds: number = 0,
    public lastHomeOdds: number = 0,
    public firstAwayOdds: number = 0,
    public lastAwayOdds: number = 0,
    public firstOverOdds: number = 0,
    public lastOverOdds: number = 0,
    public firstUnderOdds: number = 0,
    public lastUnderOdds: number = 0,
    public firstHdc: string = '',
    public lastHdc: string = '',
    public firstOu: string = '',
    public lastOu: string = '',
    public odds: OddLineDTO[] = [],
  ) {
  }
}


export class OddLineDTO {
  public constructor(
    public oddType: string = '',
    public line: string = '',
    public homeLine: number = 0,
    public awayLine: number = 0,
    public odd1: number = 0,
    public odd2: number = 0,
  ) {
  }
}
