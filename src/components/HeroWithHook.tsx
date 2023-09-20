import useManyQueries from "../hooks/useManyQueries";
import * as api from "../api/api";
import { SliderWithHook, SlideWithHook } from "./SliderWithHook";
import useSliderHook from "../hooks/useSliderHook";

export const HeroWithHook = () => {
  const sliderOptions = {
    itemNumber: 4,
    totalNumber: 6,
    loop: true,
    // data: []
  };

  const { detailedQueriesMediaTypeData } = useManyQueries(
    api.getTrending,
    "trending-movie-details-fetcher",
    "",
    sliderOptions.totalNumber
  );

  const { useSliderObj } = useSliderHook(
   sliderOptions,
    detailedQueriesMediaTypeData
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
    <SliderWithHook {...useSliderObj} {...sliderOptions}>
      <>
        {useSliderObj.sliderExportData.map((item, index) => (
          <SlideWithHook index={index} handleClick={useSliderObj.handleClick} item={item}>
            <>
              <p>index: {index}</p>
              <p>key: {item.key} </p>
              <h5>{item.title} </h5>
              <h5>{item.name}</h5>
              {item.images?.backdrops.slice(0, 1).map((items) => (
                <img className="horizontal-slider-item-image" src={`${api.IMG_URL}${items.file_path}`} alt="" />
              ))}
            </>
          </SlideWithHook>
        ))}
        {/* <SlideWithHook>
          <h2>"1"</h2>
        </SlideWithHook>
        <SlideWithHook>
          <h2>"2"</h2>
        </SlideWithHook>
        <SlideWithHook>
          <h2>"3"</h2>
        </SlideWithHook>
        <SlideWithHook>
          <h2>"4"</h2>
        </SlideWithHook>
        <SlideWithHook>
          <h2>"5"</h2>
        </SlideWithHook>
        <SlideWithHook>
          <h2>"6"</h2>
        </SlideWithHook> */}
      </>
    </SliderWithHook>
  );
};
