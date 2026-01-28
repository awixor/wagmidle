import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AttributeBox from "@/components/game/AttributeBox";

describe("AttributeBox", () => {
  it("renders label and value correctly", () => {
    render(
      <AttributeBox label="Name" value="Vitalik Buterin" matchType="match" />,
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Vitalik Buterin")).toBeInTheDocument();
  });

  it("applies correct color class for match type", () => {
    const { container } = render(
      <AttributeBox label="Role" value="Founder" matchType="match" />,
    );

    const box = container.firstChild;
    expect(box).toHaveClass("bg-green-500");
  });

  it("applies correct color class for no-match type", () => {
    const { container } = render(
      <AttributeBox label="Chain" value="ETH" matchType="no-match" />,
    );

    const box = container.firstChild;
    expect(box).toHaveClass("bg-gray-500");
  });

  it("renders with isNew=false without animation wrapper", () => {
    const { container } = render(
      <AttributeBox
        label="Year"
        value="2015"
        matchType="match"
        isNew={false}
      />,
    );

    // When isNew is false, should render without perspective wrapper
    expect(container.querySelector('[style*="perspective"]')).toBeNull();
  });

  it("renders with isNew=true with animation wrapper", () => {
    const { container } = render(
      <AttributeBox label="Year" value="2015" matchType="match" isNew={true} />,
    );

    // When isNew is true, should render with perspective wrapper
    expect(
      container.querySelector('[style*="perspective"]'),
    ).toBeInTheDocument();
  });
});
