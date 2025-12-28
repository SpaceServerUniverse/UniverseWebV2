"use client"
import { PlayerDetailPage } from "@/components/PlayerDetailPage";

export default function PlayerPage({ params }: { params: { id: string } }) {
  const playerId = parseInt(params.id, 10);

  return (
    <PlayerDetailPage
      playerId={playerId}
      onBack={() => window.history.back()}
    />
  );
}