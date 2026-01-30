/* eslint-disable @next/next/no-img-element */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CharacterGuessHistory from "@/components/game/CharacterGuessHistory";
import { GuessResult } from "@/types/GameState";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const createMockGuess = (name: string, timestamp: Date): GuessResult => ({
  character: {
    id: name.toLowerCase().replace(" ", "-"),
    name,
    role: "Founder & Entrepreneur",
    primaryChain: "ETH",
    yearJoined: 2015,
    imageUrl: `/images/${name}.png`,
  },
  comparison: {
    name: "no-match",
    role: "no-match",
    primaryChain: "match",
    yearJoined: { match: "no-match", direction: "higher" },
  },
  timestamp,
});

describe("CharacterGuessHistory", () => {
  it("renders empty state when no guesses", () => {
    render(<CharacterGuessHistory guesses={[]} />);

    expect(
      screen.getByText("No guesses yet. Start by searching for a character!"),
    ).toBeInTheDocument();
  });

  it("renders guess count in header", () => {
    const guesses = [createMockGuess("Vitalik", new Date())];
    render(<CharacterGuessHistory guesses={guesses} />);

    expect(screen.getByText("Your Guesses (1)")).toBeInTheDocument();
  });

  it("renders multiple guesses", () => {
    const guesses = [
      createMockGuess("Vitalik", new Date(Date.now() - 60000)),
      createMockGuess("Satoshi", new Date(Date.now() - 30000)),
    ];
    render(<CharacterGuessHistory guesses={guesses} />);

    expect(screen.getByText("Your Guesses (2)")).toBeInTheDocument();
    // Names appear multiple times (in card header and attribute box)
    expect(screen.getAllByText("Vitalik").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Satoshi").length).toBeGreaterThan(0);
  });

  it("shows newest guess first", () => {
    const guesses = [
      createMockGuess("First", new Date(Date.now() - 60000)),
      createMockGuess("Second", new Date()),
    ];
    render(<CharacterGuessHistory guesses={guesses} />);

    const cards = screen.getAllByText(/Guess #/);
    // Second guess should be #2 and appear first in the DOM (newest first)
    expect(cards[0]).toHaveTextContent("Guess #2");
    expect(cards[1]).toHaveTextContent("Guess #1");
  });
});
