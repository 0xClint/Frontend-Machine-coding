import { render, screen } from "@testing-library/react";
import Greet from "./Greet";
import { act } from "react";

describe.skip("Greet", () => {
  test("Greet render correctly", () => {
    act(() => render(<Greet />));

    const testElement = screen.getByText("Hello");

    expect(testElement).toBeInTheDocument();
  });

  describe("Nested", () => {
    it("Greet render with name", () => {
      render(<Greet name="Rajesh" />);
      const testElement = screen.getByText("Hello Rajesh");
      expect(testElement).toBeInTheDocument();
    });
  });
});
