export class EventDTO {
  public constructor(
    public eventId: number = 0,
    public eventName: string = '',
    public homeTeam: string = '',
    public awayTeam: string = '',
    public logoHome: string = 'https://img0.aiscore.com/football/team/b65ee16a9cfe056825b1e0c15c05cf54.png!w60',
    public logoAway: string = 'https://img0.aiscore.com/football/team/97ee43cef74dd2025cec4a2cefd401ab.png!w60',
    public leagueName: string = '',
    public eventDate: string = '',
    public htScore: string = '',
    public ftScore: string = '',
    public cornerScore: string = '',
    public link: string = '',
    public isMainLeague: boolean = false,
    public isClearOu: string = '',
    public isClearHdc: string = '',
    public isClearCorner: string = '',
    public parsedOddInfo: OddInfo = {},
  ) {
  }
}

export type OddInfo = {
  hdc?: OddLine;
  ou?: OddLine;
  corner?: OddLine;
}


export type OddLine = {
  line?: string;
  overOdds?: number;
  underOdds?: number;
  awayOdds?: number;
  homeOdds?: number;
  isClear?: string;
}
