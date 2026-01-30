/* eslint-disable @next/next/no-img-element */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CharacterGuessCard from "@/components/game/CharacterGuessCard";
import { GuessResult } from "@/types/GameState";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const mockGuess: GuessResult = {
  character: {
    id: "1",
    name: "Vitalik Buterin",
    role: "Founder & Entrepreneur",
    primaryChain: "ETH",
    yearJoined: 2013,
    imageUrl: "/images/vitalik.png",
  },
  comparison: {
    name: "no-match",
    role: "match",
    primaryChain: "match",
    yearJoined: {
      match: "no-match",
      direction: "higher",
    },
  },
  timestamp: new Date(),
};

describe("CharacterGuessCard", () => {
  it("renders character name and image", () => {
    render(<CharacterGuessCard guess={mockGuess} guessNumber={1} />);

    const heading = screen.getByRole("heading", { name: /vitalik buterin/i });
    expect(heading).toBeInTheDocument();

    const image = screen.getByAltText(/vitalik buterin/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockGuess.character.imageUrl);
  });

  it("renders guess number", () => {
    render(<CharacterGuessCard guess={mockGuess} guessNumber={3} />);

    expect(screen.getByText("Guess #3")).toBeInTheDocument();
  });

  it("renders all four attribute boxes", () => {
    render(<CharacterGuessCard guess={mockGuess} guessNumber={1} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Chain")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
  });

  it("renders attribute values correctly", () => {
    render(<CharacterGuessCard guess={mockGuess} guessNumber={1} />);

    expect(screen.getByText("Founder & Entrepreneur")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
  });

  it("renders year with direction arrow when applicable", () => {
    render(<CharacterGuessCard guess={mockGuess} guessNumber={1} />);

    expect(screen.getByText("2013")).toBeInTheDocument();
    expect(screen.getByText("↑")).toBeInTheDocument();
  });
});
