// import * as Interface from "../types/types";
// import { Children } from "react";
import useSlider from "../hooks/useSlider";
import React from "react";
// import React, { Children } from "react";

type SlideProps = {
  children: React.ReactElement;
  index: number;
  // handleClick: (index: number) => void;
  // singlePadding: number;
};

type SliderProps = {
  children: React.ReactElement;
  itemNumber: number;
  totalNumber: number;
  loop: boolean; // index: number;

  // handleClick: (index: number) => void;
  // singlePadding: number;
};

export const Slide = ({ children }: SlideProps) => {
  // const handleClick = () => (console.log("I was clicked"))

  // console.log(children.props.handleClick)
  // const testArr = ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5", "slide 6"];

  // console.log(children)

  // const { currentIndex, handleClick } = useSlider(4, 6, true, testArr, children);

  // console.log(currentIndex);

  return (
    <>
      <div
        // onClick={() => handleClick(index)}
        // onClick={handleClick}
        className="horizontal-slider-item"
        style={{
          // width: `calc((100%  / ${itemNumber})`,
          paddingBlock: 0,
        }}
      >
        {React.cloneElement(children, { test: "testprop" })}
      </div>
    </>
  );
};

export const Slider = (
  { children, ...sliderOptions }: SliderProps // sliderDataFromHero,
) =>
  // loop,
  // itemNumber,
  // totalNumber
  // divHeight,
  // itemNumber,
  // currentIndex,
  // handleClick,
  // handleTransition,
  // transition,
  {
    const testArr = ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5", "slide 6"];

    const { itemNumber, totalNumber, loop } = sliderOptions;

    console.log(children);

    const {
      nextFunction,
      previousFunction,
      // handleClick,
      handleTransition,
      // pauseSlider,
      currentIndex,
      transition,
      // isSliding,
      // sliderExportData,
      // sliderImportData,
      sliderPrev,
      sliderNext,
      // trendingDataPrevMemo
    } = useSlider(itemNumber, totalNumber, loop, testArr, children);

    // console.log(React.Children.toArray(children))
    // console.log(sliderNext)

    // const renderChildren = (item) => {
    //   return <h2 className="horizontal-slider-item">{item.name}</h2>;
    // };

    // const renderChildrenMap = (passedArray): Array<string> => {
    //   return passedArray.map((item) => <h3 className="horizontal-slider-item">{item.name}</h3>);
    // };

    // console.log(children);
    // console.log(React.Children.toArray(children));
    // console.log(sliderExportData)

    // const sliderLoopData = sliderLoopDataFunction();
    // console.log(sliderLoopDataMemo);
    // console.log(useSlider);

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
              {/* {sliderData.map((item) => item
              // <div className="horizontal-slider-item">{item.name}</div>
            )} */}

              {/* {sliderLoopDataMemo.map((item) => item.name)} */}
              {/* {renderChildrenMap(sliderImportData)} */}

              {loop && sliderPrev}
              {children}
              {/* {React.cloneElement(children, { handleClick: handleClick })} */}
              {loop && sliderNext}
            </div>
          </div>
        </div>
      </>
    );
  };
