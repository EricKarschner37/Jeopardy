export type PlayerData = {
  name: string;
  balance: number;
};

export type GameState = {
  name: string;
  category: string;
  clue: string;
  response: string;
  cost: number;
  selected_player: string;
  players: PlayerData[];
  double: boolean;
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
