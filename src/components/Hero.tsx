import { SliderWithContext, SlideWithContext } from "./SliderWithContext";
import useManyQueries from "../hooks/useManyQueries";
import * as api from "../api/api";

export const Hero = () => {
  const sliderOptions = {
    itemNumber: 4,
    totalNumber: 6,
    loop: true,
  };

  const { detailedQueriesMediaTypeData } = useManyQueries(
    api.getTrending,
    "trending-movie-details-fetcher",
    "",
    sliderOptions.totalNumber
  );

  return (
    <SliderWithContext {...sliderOptions}>
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
        {/* <Slide>
          <h2>"1"</h2>
        </Slide>
        <Slide>
          <h2>"2"</h2>
        </Slide>
        <Slide>
          <h2>"3"</h2>
        </Slide>
        <Slide>
          <h2>"4"</h2>
        </Slide>
        <Slide>
          <h2>"5"</h2>
        </Slide>
        <Slide>
          <h2>"6"</h2>
        </Slide> */}
      </>
    </SliderWithContext>
  );
};
