import {
  SocketGameState,
  SocketMessage,
  SocketMessageWithCategories,
  SocketMessageWithGameState,
} from "components/play/play.types";

export const getGameStateFromSocketMessage = ({
  players,
  ...rest
}: SocketGameState) => {
  console.log(JSON.stringify(players));
  return {
    ...rest,
    players: Object.values(players).map(({ Name, Points }) => ({
      name: Name,
      balance: Points,
    })),
  };
};

export const isSocketMessageState = (
  data: SocketMessage
): data is SocketMessageWithGameState => data.message === "state";

export const isSocketMessageCategories = (
  data: SocketMessage
): data is SocketMessageWithCategories => data.message === "categories";