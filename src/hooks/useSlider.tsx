import { SetStateAction, useEffect, useMemo, useState } from "react";
import { Details } from "../types/types";
import { UseQueryResult } from "@tanstack/react-query";
// import { Tester } from "../types/types";

const useSlider = (
  itemNumberVertical: number,
  totalNumber: number,
  loop: boolean,
  sliderImportData: UseQueryResult<Details, Error>[]
) => {
  const [currentIndex, setCurrentIndex] = useState(loop ? itemNumberVertical : 0);
  const [transition, setTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  const sliderDataDataMemo = useMemo(() => sliderImportData.map((e) => e.data) as Details[], [sliderImportData]);

  const trendingDataPrevMemo = useMemo(
    () => sliderDataDataMemo.slice(totalNumber - itemNumberVertical, totalNumber),
    [sliderDataDataMemo, totalNumber, itemNumberVertical]
  );

  const trendingDataNextMemo = useMemo(
    () => sliderDataDataMemo.slice(0, itemNumberVertical),
    [sliderDataDataMemo, itemNumberVertical]
  );

  const sliderExportData = useMemo(
    () => (loop ? [...trendingDataPrevMemo, ...sliderDataDataMemo, ...trendingDataNextMemo] : sliderDataDataMemo),
    [trendingDataPrevMemo, sliderDataDataMemo, trendingDataNextMemo, loop]
  );

  // const sliderDataData = sliderImportData.map((e) => e.data) as Details[];
  // const trendingDataNextNew = sliderDataData?.slice(0, itemNumberVertical);
  // const trendingDataPrevNew = sliderDataData?.slice(totalNumber - itemNumberVertical, totalNumber);
  // const sliderExportData = loop ? [...trendingDataPrevNew, ...sliderDataData, ...trendingDataNextNew] : sliderDataData;

  useEffect(() => {
    if (isSliding) {
      const intervalId = setInterval(() => {
        setTransition(true);
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isSliding]);

  const nextFunction = () => {
    console.log(currentIndex);
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex + 1);
    // setSliderIndex((prevIndex) => prevIndex + 1);
  };

  const previousFunction = () => {
    console.log(currentIndex);
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  const handleClick = (item: SetStateAction<number>) => {
    if (loop) {
      setTransition(true);
      // setClickedIndex(item);
      setCurrentIndex(item);
    }
  };

  const pauseSlider = () => {
    setIsSliding(!isSliding);
  };

  const handleTransition = () => {
    if (loop) {
      if (currentIndex === 0) {
        setTransition(false);
        setCurrentIndex(
          // trendingDataIndexed - itemNumberVertical * 2
          totalNumber
        );
      }
      if (
        currentIndex >
        // trendingDataIndexed - itemNumberVertical * 2
        totalNumber
      ) {
        setTransition(false);
        setCurrentIndex(
          currentIndex - totalNumber
          // (trendingDataIndexed - itemNumberVertical * 2 )
        );
      }
    }
  };


  const useSliderObj = {
    nextFunction,
    previousFunction,
    handleClick,
    handleTransition,
    pauseSlider,
    currentIndex,
    transition,
    isSliding,
    sliderExportData,
  };

  return {
    // nextFunction,
    // previousFunction,
    // handleClick,
    // handleTransition,
    // pauseSlider,
    // currentIndex,
    // transition,
    // isSliding,
    // sliderExportData,
    useSliderObj,
  };
};

export default useSlider;
