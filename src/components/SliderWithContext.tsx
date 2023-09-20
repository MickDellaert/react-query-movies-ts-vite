// import * as Interface from "../types/types";
// import { Children, cloneElement } from "react";
import useSlider from "../hooks/useSlider";
import React from "react";
import { SliderContext } from "./SliderContext";
// import { useContext } from "react";
import { useContextTypeTest } from "./SliderContext";

type SlideProps = {
  children: React.ReactElement;
  index: number;
};

type SliderProps = {
  children: React.ReactElement;
  itemNumber: number;
  totalNumber: number;
  loop: boolean; 
};

export const SlideWithContext: React.FC<SlideProps> = ({ children, index }: SlideProps) => {
  const { handleClick } = useContextTypeTest();

  return (
    <>
      <div
        onClick={() => handleClick(index)}
        className="horizontal-slider-item"
        style={{
          // width: `calc((100%  / ${itemNumber})`,
          paddingBlock: 0,
        }}
      >
        <h2>{index}</h2>
        {children}
      </div>
    </>
  );
};

export const SliderWithContext = ({ children, ...sliderOptions }: SliderProps) => {
  
  const { itemNumber, totalNumber, loop } = sliderOptions;

  const {
    nextFunction,
    previousFunction,
    handleClick,
    handleTransition,
    currentIndex,
    transition,
    sliderChildren,
    // pauseSlider,
    // isSliding,
    // sliderExportData,
    // sliderPrev,
    // sliderNext,
  } = useSlider(itemNumber, totalNumber, loop, children);

  return (
    <>
      {!loop && currentIndex > 0 && <button onClick={previousFunction}>Previous</button>}
      {loop && <button onClick={previousFunction}>Previous</button>}

      {currentIndex < totalNumber - itemNumber && !loop && <button onClick={nextFunction}>Next</button>}
      {loop && <button onClick={nextFunction}>Next</button>}

      <div className="horizontal-slider-container" style={{ padding: 10 }}>
        <div className="horizontal-slider-crop">
          <div
            className="horizontal-slider-content"
            style={{
              transition: transition ? `all 300ms ease-out` : "none",
              width: `calc((100%  / ${itemNumber})`,
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
            onTransitionEnd={() => handleTransition()}
          >
            <SliderContext.Provider value={{ handleClick }}>{sliderChildren}</SliderContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};
