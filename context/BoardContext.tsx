import { createContext } from "react";

interface BoardContextType {
  allboard: any;
  setAllBoard: React.Dispatch<React.SetStateAction<any>>;
}

export const BoardContext = createContext<BoardContextType>({
  allboard: null,
  setAllBoard: () => {},
});
