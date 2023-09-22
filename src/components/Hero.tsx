import { SliderWithContext, SlideWithContext } from "./SliderWithContext";
import useManyQueries from "../hooks/useManyQueries";
import useSliderControls from "../hooks/useSliderControls";
import * as api from "../api/api";

export const Hero = () => {
  const sliderOptions = {
    itemNumber: 4,
    totalNumber: 6,
    loop: true,
  };

  const { detailedQueriesMediaTypeData } = useManyQueries(
    api.getTrending,  // queryFunction
    "trending-movie-details-fetcher", // queryKey
    "", // tv or movie
    sliderOptions.totalNumber  // slice number of items
  );

  const { useSliderObj } = useSliderControls(sliderOptions);

  return (
    <div>
      <SliderWithContext skipFirst={0} showNumber={1} itemNumber={4} totalNumber={6} loop={true} {...useSliderObj}>
        <>
          {detailedQueriesMediaTypeData.map((item, index) => (
            <SlideWithContext index={index}>
              <>
                <p>key: {item.key} </p>
                <h5>{item.title} </h5>
                <h5>{item.name}</h5>
                {item.images?.backdrops.slice(0, 1).map((items) => (
                  <img className="horizontal-slider-item-image" src={`${api.IMG_URL}${items.file_path}`} alt="" />
                ))}
              </>
            </SlideWithContext>
          ))}
        </>
      </SliderWithContext>

      <SliderWithContext skipFirst={1} showNumber={4} itemNumber={4} totalNumber={6} loop={true} {...useSliderObj}>
        <>
          {detailedQueriesMediaTypeData.map((item, index) => (
            <SlideWithContext index={index}>
              <>
                <p>key: {item.key} </p>
                <h5>{item.title} </h5>
                <h5>{item.name}</h5>
                {item.images?.backdrops.slice(0, 1).map((items) => (
                  <img className="horizontal-slider-item-image" src={`${api.IMG_URL}${items.file_path}`} alt="" />
                ))}
              </>
            </SlideWithContext>
          ))}
        </>
      </SliderWithContext>
    </div>
  );
};

{
  /* <SlideWithContext>
            <h2>"1"</h2>
          </SlideWithContext>
          <SlideWithContext>
            <h2>"2"</h2>
          </SlideWithContext>
          <SlideWithContext>
            <h2>"3"</h2>
          </SlideWithContext>
          <SlideWithContext>
            <h2>"4"</h2>
          </SlideWithContext>
          <SlideWithContext>
            <h2>"5"</h2>
          </SlideWithContext>
          <SlideWithContext>
            <h2>"6"</h2>
          </SlideWithContext> */
}
