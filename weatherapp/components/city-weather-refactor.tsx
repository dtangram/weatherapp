import React, { useState, useEffect } from "react";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  wtd: string;
  wicon: string;
  // wtr: number;
  // isLoading: boolean;
}

const CityWeatherRefactor = ({ city }: CityWeatherProps) => {
  const [wtd, setWDR] = useState<CityWeatherState[] | null>(null);
  const [wicon, setWICON] = useState<CityWeatherState[] | null>(null);
  const [wtr, setWTR] = useState<number | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted: boolean = true;

    const getWeather = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.name) {
            setWDR(null);
            setWICON(null);
            setWTR(null);
          } else if (isMounted) {
            // setIsLoading(true);
            setWDR(data.weather[0].description);
            setWICON(data.weather[0].icon);
            setWTR(data.main.temp);
            console.log("RESULTS: ", data);
            console.log('Icon', data.weather[0].icon);
          }
        });
    };

    getWeather();

    return () => {
      isMounted = false;
    };
  }, [city]);

  let degree : number;

  const KtoF = (tempKevlin: number) => {
    degree = ((tempKevlin - 273.15) * 9) / 5 + 32;

    return degree.toFixed(0);
  };

  return wtd ? (
    <article className="text-center bg-gray-400 rounded-md inline-block px-4 py-3 w-56">
      <h1 className="text-2xl text-white uppercase font-bold">{city}</h1>
      <figure className="m-0 p-0 w-full">
        <img
          src={`http://openweathermap.org/img/wn/${wicon}@2x.png`}
          className="m-auto"
          alt={`${wtd}`}
        />
      </figure>
      <h2 className="mb-1 text-xl text-white capitalize">{wtd}</h2>
      <p data-testid="weatherNewResult" className="text-lg text-white">
        {console.log("weatherResult", wtr)}
        Temperature:{" "}
        <span className="font-bold text-2xl text-white">
          {wtr ? (KtoF(wtr)) : null} &#8457;
        </span>
      </p>
    </article>
  ) : (
    <article className="text-center bg-gray-400 rounded-md inline-block px-4 py-3 w-56">
      <h2 className="mb-1 text-xl text-white capitalize">No City Found</h2>
    </article>
  );
};

export default CityWeatherRefactor;
