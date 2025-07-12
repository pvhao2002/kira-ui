export class AnalystDTO {
  public constructor(
    public line: string = '',
    public type: string = '',
    public numberEventClear: number = 0,
    public numberEventNotClear: number = 0,
  ) {
  }
}
