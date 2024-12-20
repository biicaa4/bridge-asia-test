import { supabase } from './supabaseClient';

const mockPlayers = [
  { name: "Alice", score: 6 },
  { name: "Bob", score: 5 },
  { name: "Charlie", score: 4 },
  { name: "Diana", score: 3 },
  { name: "Ethan", score: 2 },
  { name: "Fiona", score: 1 },
  { name: "George", score: 1 },
  { name: "Hannah", score: 1 },
  { name: "Ian", score: 0 },
  { name: "Jasmine", score: 0 },
];

export async function addScore(name: string, score: number) {
  const { data, error } = await supabase
    .from('leaderboard')
    .insert([{ name, score }]);

  if (error) throw error;
  return data;
}

export async function getTopPlayers() {
  // Fetch top 10 players
  let { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(10);

  if (error) throw error;

  // If no data, insert mock players and refetch
  if (!data || data.length === 0) {
    const { error: insertError } = await supabase
      .from('leaderboard')
      .insert(mockPlayers);

    if (insertError) throw insertError;

    // Refetch after inserting mock players
    const { data: refetchData, error: refetchError } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    if (refetchError) throw refetchError;
    data = refetchData;
  }

  return data?.map((player, index) => ({
    rank: index + 1,
    name: player.name,
    score: player.score
  })) || [];
}
