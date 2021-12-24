export type Period = {
  from: Date;
  to: Date;
}

export type Photo = {
  path: string;
  description: string;
  coord: {
    lat: number;
    lon: number;
  }
  date: Date | Period
}
