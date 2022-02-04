import { useEffect, useRef } from "react";
import { Form, ActionFunction, useActionData } from "remix";
import { WeatherData, WeatherDataResponse } from "types";
import { Weather } from "~/components";
import { normaliseWeatherData } from "~/utils";

export function meta() {
  return { title: "Remixed Weather App" };
}
export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let city = formData.get("city");

  const response = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPEN_WEATHER_MAP_API}&units=metric`
  );
  const data = await (await response).json();
  return normaliseWeatherData(data as WeatherDataResponse);
};

export default function Index() {
  const data = useActionData<WeatherData>();
  let cityRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data && cityRef.current) {
      cityRef.current.select();
    }
  }, [data]);

  return (
    <div className="remix__page">
      <main>
        <h2>Weather Forecast</h2>
        <p>
          Enter a Location below to get the current weather conditions for that
          area.
        </p>
        <Form method="post" className="remix__form">
          <label>
            <div>Location:</div>
            <input ref={cityRef} name="city" type="text" />
          </label>
          <div>
            <button>Search</button>
          </div>
        </Form>

        {data ? <Weather {...data} /> : null}
      </main>
    </div>
  );
}
