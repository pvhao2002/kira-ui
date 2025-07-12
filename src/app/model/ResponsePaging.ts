export interface ResponsePaging<T> {
  data: T[];
  page?: number;
  size?: number;
  total?: number;
  isTeam?: boolean;
  exact?: boolean;
  detail?: TeamAnalystDetail;
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
