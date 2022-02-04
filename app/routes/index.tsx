import { Form, redirect, ActionFunction } from "remix";

export function meta() {
  return { title: "Remixed Weather App" };
}
export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let answer = formData.get("answer");

  return redirect(`/weather/?city=${answer}`);
};

export default function ActionsDemo() {
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
            <input name="answer" type="text" />
          </label>
          <div>
            <button>Search</button>
          </div>
        </Form>
      </main>
    </div>
  );
}
