export interface ResponsePaging<T> {
  data: T[];
  page?: number;
  size?: number;
  total?: number;
  isTeam?: boolean;
  exact?: boolean;
  detail?: TeamAnalystDetail;
  summary?: SummaryOddEventAnalyst;
  scoreSummary?: ScoreSummary[];
}

export interface TeamAnalystDetail {
  minFtScore?: number;
  maxFtScore?: number;
  avgFtScore?: number;

  minHtScore?: number;
  maxHtScore?: number;
  avgHtScore?: number;

  minCorner?: number;
  maxCorner?: number;
  avgCorner?: number;
}

export interface SummaryOddEventAnalyst {
  homeGreaterAway?: number;
  awayGreaterHome?: number;
  homeEqualAway?: number;

  overGreaterUnder?: number;
  underGreaterOver?: number;
  overEqualUnder?: number;

  homeAndOverGreater?: number;
  homeAndUnderGreater?: number;
  awayAndOverGreater?: number;
  awayAndUnderGreater?: number;
  lineAndOddSame?: number;
}

export interface ScoreSummary {
  score?: string;
  cnt?: number;
  regularOdd?: string;
  minOdd?: string;
  maxOdd?: string;

  h2a?: string;
  o2u?: string;

  h2aOdd?: string;
  o2uOdd?: string;

  highlightH2A?: boolean;
  highlightO2U?: boolean;
  highlight?: boolean;
}
