import CharacterOfTheDay from "@/components/CharacterOfTheDay";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Wagmidle</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Daily crypto guessing games
          </p>
        </div>

        <CharacterOfTheDay />
      </main>
    </div>
  );
}
