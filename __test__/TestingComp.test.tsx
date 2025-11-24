import TestingComp from "@/components/TestingComp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe("testing comp", () => {
  test("render image", () => {
    render(<TestingComp />);

    const image = screen.getByAltText("rain-img");

    expect(image).toBeInTheDocument();
  });

  test("render link", () => {
    render(<TestingComp />);

    const link = screen.getByRole("link", { name: /Click This Link/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.google.com");
  });
});
