import {
  SocketGameState,
  SocketMessage,
  SocketMessageWithCategories,
  SocketMessageWithGameState,
} from "components/play/play.types";

export const getGameStateFromSocketMessage = ({
  players,
  round,
  ...rest
}: SocketGameState) => {
  return {
    ...rest,
    double: round === "Double",
    players: Object.values(players),
  };
};

export const isSocketMessageState = (
  data: SocketMessage
): data is SocketMessageWithGameState => data.message === "state";

export const isSocketMessageCategories = (
  data: SocketMessage
): data is SocketMessageWithCategories => data.message === "categories";
