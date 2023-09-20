// import createContext from 'react'

import { createContext, useContext } from "react";

interface contextTypeTest {
  handleClick: (item: number) => void;
}

// export const SliderContext = createContext((_item: SetStateAction<number>) => {});
// export const SliderContext = createContext<contextTypeTest>({ handleClick: () => {} });
export const SliderContext = createContext<contextTypeTest | undefined>(undefined);

export const useContextTypeTest = () => {
  const sliderContext = useContext(SliderContext);
  if (sliderContext === undefined) {
    throw new Error("there was an error");
  }

  return sliderContext;
};
