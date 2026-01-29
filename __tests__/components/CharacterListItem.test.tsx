/* eslint-disable @next/next/no-img-element */
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterListItem from "@/components/CharacterListItem";
import { CryptoFigure } from "@/types/CryptoFigure";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const mockCharacter: CryptoFigure = {
  id: "vitalik",
  name: "Vitalik Buterin",
  role: "Founder & Entrepreneur",
  primaryChain: "ETH",
  yearJoined: 2013,
  imageUrl: "/images/vitalik.png",
};

describe("CharacterListItem", () => {
  it("renders character name", () => {
    render(
      <CharacterListItem
        character={mockCharacter}
        isSelected={false}
        onSelect={() => {}}
        onMouseEnter={() => {}}
      />,
    );

    expect(screen.getByText("Vitalik Buterin")).toBeInTheDocument();
  });

  it("renders character image", () => {
    render(
      <CharacterListItem
        character={mockCharacter}
        isSelected={false}
        onSelect={() => {}}
        onMouseEnter={() => {}}
      />,
    );

    expect(screen.getByAltText("Vitalik Buterin")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(
      <CharacterListItem
        character={mockCharacter}
        isSelected={false}
        onSelect={onSelect}
        onMouseEnter={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("calls onMouseEnter when hovered", () => {
    const onMouseEnter = vi.fn();
    render(
      <CharacterListItem
        character={mockCharacter}
        isSelected={false}
        onSelect={() => {}}
        onMouseEnter={onMouseEnter}
      />,
    );

    fireEvent.mouseEnter(screen.getByRole("button"));
    expect(onMouseEnter).toHaveBeenCalledOnce();
  });

  it("applies selected styles when isSelected is true", () => {
    render(
      <CharacterListItem
        character={mockCharacter}
        isSelected={true}
        onSelect={() => {}}
        onMouseEnter={() => {}}
      />,
    );

    const button = screen.getByRole("button");
    expect(button.className).toContain("from-purple-500");
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <CharacterListItem
        character={mockCharacter}
        isSelected={false}
        onSelect={() => {}}
        onMouseEnter={() => {}}
        disabled={true}
      />,
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
