export class Weather {
  constructor(
    public woeId: string,
    public city: string,
    public minTemp: string,
    public maxTemp: string,
    public theTemp: string,
    public tempIcon: string,
    public date: Date) { }
}