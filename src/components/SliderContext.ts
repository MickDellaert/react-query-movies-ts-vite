// import createContext from 'react'

import { createContext, useContext } from "react";

interface sliderContextType {
  handleClick: (index: number) => void;
}

export const SliderContext = createContext<sliderContextType | undefined>(undefined);

export const useSliderContext = () => {
  const sliderContext = useContext(SliderContext);
  if (sliderContext === undefined) {
    throw new Error("there was an error");
  }

  return sliderContext;
};
