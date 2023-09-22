// import * as Interface from "../types/types";
// import { Children, cloneElement } from "react";
// import useSlider from "../hooks/useSlider";
// import { useContext } from "react";
import { useSliderData } from "../hooks/useSliderData";
import { SliderContext, useSliderContext } from "./SliderContext";

type SlideProps = {
  children: React.ReactElement;
  index: number;
};

type SliderProps = {
  children: React.ReactElement;
  itemNumber: number;
  totalNumber: number;
  loop: boolean;
  currentIndex: number;
  transition: boolean;
  showNumber: number;
  skipFirst: number;
  nextFunction: () => void;
  handleTransition: () => void;
  previousFunction: () => void;
  handleClick: (index: number) => void;
};

export const SlideWithContext: React.FC<SlideProps> = ({ children, index }: SlideProps) => {
  const { handleClick } = useSliderContext();

  return (
    <>
      <div
        onClick={() => handleClick(index)}
        className="horizontal-slider-item"
        style={{
          // width: `calc((100% / ${itemNumber})`,
          paddingBlock: 0,
        }}
      >
        <h2>{index}</h2>
        {children}
      </div>
    </>
  );
};

export const SliderWithContext = ({
  children,
  skipFirst,
  showNumber,
  itemNumber,
  totalNumber,
  loop,
  ...useSliderObj
}: SliderProps) => {
  const { nextFunction, previousFunction, handleClick, handleTransition, currentIndex, transition } = useSliderObj;

  const sliderChildrenData = useSliderData(children, totalNumber, itemNumber, loop);

  // const { itemNumber, totalNumber, loop } = sliderOptions;

  // const {
  //   // nextFunction,
  //   // previousFunction,
  //   // handleClick,
  //   // handleTransition,
  //   // currentIndex,
  //   // transition,
  //   sliderChildren,
  //   // pauseSlider,
  //   // isSliding,
  //   // sliderExportData,
  //   // sliderPrev,
  //   // sliderNext,
  // } = useSlider(itemNumber, totalNumber, loop, children);

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
              width: `calc((100%  / ${showNumber})`,
              transform: `translateX(-${(currentIndex + skipFirst) * 100}%)`,
            }}
            onTransitionEnd={() => handleTransition()}
          >
            <SliderContext.Provider value={{ handleClick }}>{sliderChildrenData}</SliderContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};
