export type PlayerData = {
  name: string;
  balance: number;
};

export type GameState = {
  name: string;
  category: string;
  clue: string;
  response: string;
  cost: number | string;
  selected_player: string;
  players: PlayerData[];
  double: boolean;
  // If the clue at row i, col j has been shown,
  // then the 2^(i*6+j) bit is 1
  hasClueBeenShownBitset: number;
};

export type SocketGameState = Omit<GameState, "players"> & {
  players: Record<
    string,
    {
      Points: number;
      Name: string;
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
