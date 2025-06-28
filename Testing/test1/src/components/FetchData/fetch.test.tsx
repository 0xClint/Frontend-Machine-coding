import { render, screen } from "@testing-library/react";
import FetchData from "./fetch";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";

describe("FetchData", () => {
  test("rendered correctly", () => {
    render(<FetchData />);

    const testElement = screen.getByText("Fetched Data");
    expect(testElement).toBeInTheDocument();
  });

  test("render list", async () => {
    render(<FetchData />);
    screen.debug();
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(5);
  });
});
