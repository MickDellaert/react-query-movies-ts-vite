import { Slider, Slide } from "./Slider";
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

  // const itemNumber = 4;
  // const totalNumber = 6;
  // const loop = true;

  // const testArr = ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5", "slide 6"];
  // const sliderImportData = [
  //   { name: "slide 1" },
  //   { name: "slide 2" },
  //   { name: "slide 3" },
  //   { name: "slide 4" },
  //   { name: "slide 5" },
  //   { name: "slide 6" },
  // ];

  return (
    <Slider {...sliderOptions}>
      <>
        {detailedQueriesMediaTypeData.map((item) => (
          <Slide>
            <>
              <p>key: {item.key} </p>
              <h5>{item.title} </h5>
              <h5>{item.name}</h5>
              {item.images?.backdrops.slice(0, 1).map((items) => (
                <img className="horizontal-slider-item-image" src={`${api.IMG_URL}${items.file_path}`} alt="" />
              ))}
            </>
          </Slide>
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
    </Slider>
  );
};
