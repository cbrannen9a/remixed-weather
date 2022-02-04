import { LoaderFunction, useLoaderData } from "remix";
import { WeatherData, WeatherDataResponse } from "types";
import { normaliseWeatherData } from "~/utils";

export let loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let city = url.searchParams.get("city");

  const response = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPEN_WEATHER_MAP_API}&units=metric`
  );
  const data = await (await response).json();
  return normaliseWeatherData(data as WeatherDataResponse);
};

export default function WeatherRoute() {
  const { cityName, conditions } = useLoaderData<WeatherData>();
  console.log(cityName);
  return (
    <div>
      <h1>Weather</h1>
      <main>
        <h2>{cityName}</h2>
        <p>{conditions}</p>
      </main>
    </div>
  );
}
