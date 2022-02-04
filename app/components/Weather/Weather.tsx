import { WeatherData } from "types";

export default function Weather({ cityName, conditions }: WeatherData) {
  return (
    <div>
      <h2>{cityName}</h2>
      <p>{conditions}</p>
    </div>
  );
}
