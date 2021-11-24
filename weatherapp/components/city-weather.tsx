import { Component } from "react";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherTempResult: number;
  weatherDescriptResult: string;
}

export class CityWeather extends Component<CityWeatherProps, CityWeatherState> {
  constructor(props: any) {
    super(props);
    this.state = {
      weatherTempResult: 0,
      weatherDescriptResult: ""
    };
  }

  componentDidMount() {
    const { city } = this.props;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => {
        this.setState({
          weatherTempResult: result.main.temp,
          weatherDescriptResult: result.weather[0].description
        });
        console.log("RESULTS: ", result);
      });
  }

  render() {
    const { city } = this.props;
    const { weatherTempResult, weatherDescriptResult } = this.state;

    function KtoF(tempKevlin: number) {
      return ((tempKevlin - 273.15) * 9) / 5 + 32;
    }

    return (
      <div>
        <h1>{city}</h1>
        <div>
          {console.log("weatherResult", weatherTempResult)}
          Temperature: {KtoF(weatherTempResult).toFixed(0)} &#8457;
        </div>
        <div>Descripiton: {weatherDescriptResult}</div>
      </div>
    );
  }
}
