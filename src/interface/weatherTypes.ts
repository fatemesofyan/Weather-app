export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
}

export interface Sys {
  country: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface WeatherData {
  cod: number | string;
  name: string;
  sys: Sys;
  main: Main;
  weather: Weather[];
  wind: Wind;
}

export interface RecentSearch {
  name: string;
  country: string;
  temp: number;
  icon: string;
}
