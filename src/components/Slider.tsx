import * as api from "../api/api";

import useManyQueries from "../hooks/useManyQueries";
import { v4 as uuidv4 } from "uuid";

import useSlider from "../hooks/useSlider";
import { SliderHorizontal } from "./SliderHorizontal";
// import { SliderVertical } from "./SliderVertical";

export const Slider = () => {
  const totalNumber = 20;
  // const itemNumberHorizontal = 1;
  const itemNumberVertical = 6;
  const skipFirst = 0;
  const itemNumber = 6;
  const singlePadding = 0;
  const loop = true;

  const { detailedQueriesMediaTypeTest, detailedQueries } = useManyQueries(
    api.getTrending,
    "trending-movie-fetcher",
    "",
    totalNumber
  );

  const trendingDataNext = detailedQueriesMediaTypeTest?.slice(0, itemNumberVertical + skipFirst);
  const trendingDataPrev = detailedQueriesMediaTypeTest?.slice(totalNumber - itemNumberVertical, totalNumber);
  const trendingDataCombined = [...trendingDataPrev, ...detailedQueriesMediaTypeTest, ...trendingDataNext];

  const { nextFunction, previousFunction, handleClick, handleTransition, pauseSlider, currentIndex, transition, isSliding } =
    useSlider(itemNumberVertical, trendingDataCombined.length);

  console.log(currentIndex);

  if (detailedQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  if (detailedQueries.every((query) => query.isSuccess)) {
    console.log(detailedQueries);
  }

  // const data = {
  //   trendingDataCombined,
  //   currentIndex,
  //   transition,
  //   skipFirst,
  //   handleClick,
  //   handleTransition,
  // };

  return (
    <>
      {(!loop && currentIndex > itemNumberVertical) && <button onClick={previousFunction}>Previous</button>}
      {loop && <button onClick={previousFunction}>Previous</button>}
      {(currentIndex < detailedQueriesMediaTypeTest.length && !loop) && <button onClick={nextFunction}>Next</button>}
      {loop && <button onClick={nextFunction}>Next</button>}
      <button onClick={pauseSlider}>{isSliding ?  "Pause slideshow" : "Start slideshow"}</button>

      <SliderHorizontal
        // {...data}
        trendingDataCombined={trendingDataCombined}
        currentIndex={currentIndex}
        transition={transition}
        handleClick={handleClick}
        handleTransition={handleTransition}
        itemNumber={itemNumberVertical}
        divHeight={"auto"}
        containerPadding={10}
        singlePadding={0}
      >
        {" "}
        {trendingDataCombined.map((item, index) => (
          <div
            onClick={() => handleClick(index)}
            className="horizontal-slider-item"
            key={uuidv4()}
            style={{
              width: `calc((100%  / ${itemNumber})`,
              paddingBlock: `${singlePadding}px`,
            }}
          >
            <p>index: {index} </p>
            <p>key: {item?.key} </p>
            <h5>{item?.title} </h5>
            <h5>{item?.original_title}</h5>
            {/* <img
            className="horizontal-slider-item-image"
            src={`${api.IMG_URL}${item.backdrop_path}`}
            alt=""
          /> */}

            {item?.images?.backdrops.slice(0, 1).map((items) => (
              // <div>{items.width}</div>

              <img
                // className="logo-image"
                className="horizontal-slider-item-image"
                src={`${api.IMG_URL}${items.file_path}`}
                alt=""
              />
            ))}

            {/* <p className="horizontal-slider-item-description">
            {item.data.overview}
          </p> */}
          </div>
        ))}
      </SliderHorizontal>

      {/* <SliderVertical
        {...data}
        // trendingDataIndexed={trendingDataIndexed}
        // currentIndex={currentIndex}
        // transition={transition}
        // skipFirst={skipFirst}
        // handleClick={handleClick}
        // handleTransition={handleTransition}
        itemNumber={itemNumberVertical}
        divHeight={800}
        containerPadding={10}
        singlePadding={10}
        horizontal={false}
      /> */}

      {/* 
      <SliderContainer
        userQueriesIndexed={userQueriesIndexed}
        tripleIndexed={tripleIndexed}
      /> */}
    </>
  );
};
