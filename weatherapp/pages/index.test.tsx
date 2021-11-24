import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import "isomorphic-unfetch";
// import App from "./_app";
import IndexPage from "./index";
import CityWeatherRefactor from "../components/city-weather-refactor";

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(
      ctx.json({
        weather: { description: "Few Clouds" },
        main: { temp: 295.372 }
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("showing label, input and button", () => {
  render(<IndexPage />);

  userEvent.click(screen.getByText(/submit/i));

  expect(screen.getByRole("main")).toBeTruthy();
  expect(screen.getByText("Weather Search:")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeTruthy();
});

test("it shows weather results", async () => {
  const city = jest.fn(() => Promise.resolve);
  render(<CityWeatherRefactor city={`${city}`} />);

  await waitFor(() => {
    screen.findByRole(/article/i);
    screen.queryByRole(/figure/i);
    screen.queryByText("Few Clouds");
  });
});

// todo: add more tests, maybe error handling?
