import * as api from "../api/api";
import { v4 as uuidv4 } from "uuid";
// import * as Interface from "../types/types";

import useManyQueries from "../hooks/useManyQueries";
import useSlider from "../hooks/useSlider";
import { SliderHorizontal } from "./SliderHorizontal";
import { Slide } from "./Slide";
// import { SliderVertical } from "./SliderVertical";

export const Slider = () => {
  const totalNumber = 8;
  // const itemNumberHorizontal = 1;
  const itemNumberVertical = 4;
  // const skipFirst = 0;
  // const itemNumber = 6;
  const singlePadding = 0;
  const loop = true;

  const { detailedQueries } = useManyQueries(api.getTrending, "trending-movie-details-fetcher", "", totalNumber);
  // const sliderImportData = detailedQueriesProp.map((e) => e.data) as Interface.Details[];

  const {
    // nextFunction,
    // previousFunction,
    // handleClick,
    // handleTransition,
    // pauseSlider,
    // currentIndex,
    // transition,
    // isSliding,
    // sliderExportData
    useSliderObj,
  } = useSlider(itemNumberVertical, totalNumber, loop, detailedQueries);

  // if (detailedQueries.some((query) => query.isLoading)) {
  //   return <h2>"Multi Loading"</h2>;
  // }

  // if (detailedQueries.some((query) => query.isError)) {
  //   return <h2>"Multi Error"</h2>;
  // }

  // const detailedQueriesNew = detailedQueriesProp.map((e) => e.data) as Interface.Details[];

  // const trendingDataNextNew = detailedQueriesNew?.slice(0, itemNumberVertical + skipFirst);
  // const trendingDataPrevNew = detailedQueriesNew?.slice(totalNumber - itemNumberVertical, totalNumber);
  // const trendingDataCombinedNew = loop
  //   ? [...trendingDataPrevNew, ...detailedQueriesNew, ...trendingDataNextNew]
  //   : detailedQueriesNew;

  // const data = {
  //   trendingDataCombined,
  //   currentIndex,
  //   transition,
  //   skipFirst,
  //   handleClick,
  //   handleTransition,
  // };

  if (detailedQueries.some((query) => query.isLoading)) {
    return <h2>"Multi Loading"</h2>;
  }

  if (detailedQueries.some((query) => query.isError)) {
    return <h2>"Multi Error"</h2>;
  }

  return (
    <>
      {!loop && useSliderObj.currentIndex > 0 && <button onClick={useSliderObj.previousFunction}>Previous</button>}
      {loop && <button onClick={useSliderObj.previousFunction}>Previous</button>}
      {useSliderObj.currentIndex < totalNumber - itemNumberVertical && !loop && (
        <button onClick={useSliderObj.nextFunction}>Next</button>
      )}
      {loop && <button onClick={useSliderObj.nextFunction}>Next</button>}
      {loop && (
        <button onClick={useSliderObj.pauseSlider}>
          {useSliderObj.isSliding ? "Pause slideshow" : "Start slideshow"}
        </button>
      )}

      <SliderHorizontal
        // {...data}
        // trendingDataCombined={trendingDataCombined}
        // currentIndex={useSliderObj.currentIndex}
        // transition={useSliderObj.transition}
        // handleClick={useSliderObj.handleClick}
        // handleTransition={useSliderObj.handleTransition}
        {...useSliderObj}
        itemNumber={itemNumberVertical}
        divHeight={"auto"}
        containerPadding={10}
        singlePadding={0}
      >
        {useSliderObj.sliderExportData.map((item, index) => (
          <Slide index={index} handleClick={useSliderObj.handleClick} singlePadding={singlePadding} key={uuidv4()}>
            {/* <div
              // onClick={() => handleClick(index)}
              // className="horizontal-slider-item"
              key={uuidv4()}
              style={{
                // width: `calc((100%  / ${itemNumber})`,
                // paddingBlock: `${singlePadding}px`,
              }}
            > */}
            <p>index: {index} </p>
            {/* <p>key: {item?.key} </p> */}
            <h5>{item.title} </h5>
            <h5>{item.name}</h5>

            {item.images?.backdrops.slice(0, 1).map((items) => (
              <img className="horizontal-slider-item-image" src={`${api.IMG_URL}${items.file_path}`} alt="" />
            ))}
          </Slide>
        ))}
      </SliderHorizontal>
    </>
  );
};
