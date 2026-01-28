import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import KeyboardHints from "@/components/ui/KeyboardHints";

describe("KeyboardHints", () => {
  it("renders navigation keys", () => {
    render(<KeyboardHints />);

    expect(screen.getByText("↑")).toBeInTheDocument();
    expect(screen.getByText("↓")).toBeInTheDocument();
    expect(screen.getByText("Navigate")).toBeInTheDocument();
  });

  it("renders select key", () => {
    render(<KeyboardHints />);

    expect(screen.getByText("Enter")).toBeInTheDocument();
    expect(screen.getByText("Select")).toBeInTheDocument();
  });

  it("renders close key", () => {
    render(<KeyboardHints />);

    expect(screen.getByText("Esc")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
});
