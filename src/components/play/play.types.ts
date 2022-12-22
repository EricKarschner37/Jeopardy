export type PlayerData = {
  name: string;
  balance: number;
};

export type GameState = {
  state_type: string;
  category: string;
  clue: string;
  response: string;
  cost: number | string;
  buzzed_player: string;
  active_player: string;
  players: PlayerData[];
  double: boolean;
  // If the clue at row i, col j has been shown,
  // then the 2^(i*6+j) bit is 1
  clues_shown: number;
};

export type SocketGameState = Omit<GameState, "players"> & {
  round: "Double" | "Single" | "Final";
  players: Record<
    string,
    {
      name: string;
      balance: number;
    }
  >;
};

export type SocketMessage = {
  message: string;
};

export type SocketMessageWithGameState = SocketMessage & SocketGameState;

export type SocketMessageWithCategories = SocketMessage & {
  categories: string[];
};
