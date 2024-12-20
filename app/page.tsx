// app/page.tsx (Server Component)
import { getTopPlayers } from "@/lib/queries";
import Link from "next/link";

export default async function Home() {
  const players = await getTopPlayers();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-main-gradient antialiased">
      <section className="w-full flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-pressstart">LEADERBOARD</h2>
        <table className="border-collapse border border-black w-2/3 mb-8 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black p-4 font-pressstart">RANK</th>
              <th className="border border-black p-4 font-pressstart">PLAYER</th>
              <th className="border border-black p-4 font-pressstart">SCORE</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.rank} className="even:bg-gray-100">
                <td className="border border-black p-4 text-center font-poppins">{player.rank}</td>
                <td className="border border-black p-4 text-center font-poppins">{player.name}</td>
                <td className="border border-black p-4 text-center font-poppins">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="text-center">
        <p className="text-lg font-poppins">
          Think you can <span className="italic">ace</span> it?{" "}
          <Link href="/questions" className="text-blue-600 hover:underline">
            Start the quiz now!
          </Link>
        </p>
      </section>
    </div>
  );
}
