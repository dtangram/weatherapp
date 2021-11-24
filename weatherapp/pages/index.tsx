import { useState } from "react";
import CityWeatherRefactor from "../components/city-weather-refactor";
// import { CityWeather } from "../components/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string | null>(null);
  return (
    <main className="flex flex-col items-center text-center justify-center w-screen h-screen bg-blue-50">
      <section className="py-2">
        <form
          className="mt-0 mb-10 flex items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            const formdata = new FormData(e.currentTarget);
            setCity(formdata.get("city")!.toString());
          }}
        >
          <label htmlFor="city" className="font-bold">
            Weather Search:{" "}
            <input
              id="city"
              className="bg-white ml-2 border px-2 py-2 rounded-l-md rounded-r-none shadow-inner"
              type="text"
              name="city"
            />
          </label>

          <button
            className="text-sm text-white uppercase font-bold border rounded-r-md p-2.5 bg-blue-500"
            type="submit"
          >
            Submit
          </button>
        </form>

        {city && (
          <section className="mt-4">
            <CityWeatherRefactor city={city} />
          </section>
        )}
      </section>
    </main>
  );
}
