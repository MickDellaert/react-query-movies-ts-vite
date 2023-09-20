import * as Interface from "../types/types";
// import { Children } from "react";
// import React, { useState } from "react";
// import React, { Children } from "react";

type SlideProps = {
  children: React.ReactElement;
  index: number;
  handleClick: (index: number) => void;
  item: Interface.Details;
  // singlePadding: number;
};

type SliderProps = {
  children: React.ReactElement;
  itemNumber: number;
  totalNumber: number;
  loop: boolean; // index: number;
  nextFunction: () => void;
  previousFunction: () => void;
  currentIndex: number;
  transition: boolean;
  handleTransition: () => void;
};

export const SlideWithHook = ({ children, handleClick, index }: SlideProps) => {
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
        {children}
      </div>
    </>
  );
};

export const SliderWithHook = (
  {
    children,
    nextFunction,
    previousFunction,
    currentIndex,
    transition,
    handleTransition,
    ...sliderOptions
  }: SliderProps 
) => {
  const { itemNumber, totalNumber, loop } = sliderOptions;

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
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
