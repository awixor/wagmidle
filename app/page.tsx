import CharacterSearch from "@/components/CharacterSearch";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-2xl font-bold text-foreground">Character Search</h1>
        <CharacterSearch />
      </main>
    </div>
  );
}
