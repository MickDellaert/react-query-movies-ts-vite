import React from "react";
import { Children, SetStateAction, useEffect, useMemo, useState } from "react";
// import { Details } from "../types/types";
// import { UseQueryResult } from "@tanstack/react-query";
// import { Tester } from "../types/types";

const useSlider = (
  itemNumber: number,
  totalNumber: number,
  loop: boolean,
  // sliderImportData: Array<string> | Details[]
  sliderImportData: Array<string>,
  children: React.ReactElement
) => {
  const [currentIndex, setCurrentIndex] = useState(loop ? itemNumber : 0);
  const [transition, setTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  // const sliderDataDataMemo = useMemo(() => sliderImportData.map((e) => e.data) as Details[], [sliderImportData]);
  // const sliderDataDataMemo = sliderImportData;

  // const trendingDataPrevMemo = useMemo(
  //   () => sliderDataDataMemo.slice(totalNumber - itemNumber, totalNumber),
  //   [sliderDataDataMemo, totalNumber, itemNumber]
  // );

  // const trendingDataNextMemo = useMemo(
  //   () => sliderDataDataMemo.slice(0, itemNumber),
  //   [sliderDataDataMemo, itemNumber]
  // );

  // const sliderExportData = useMemo(
  //   () => (loop ? [...trendingDataPrevMemo, ...sliderDataDataMemo, ...trendingDataNextMemo] : sliderDataDataMemo),
  //   [trendingDataPrevMemo, sliderDataDataMemo, trendingDataNextMemo, loop]
  // );

  // sliderImportData = useMemo(() => {
  //   // const sliderLoopD = sliderImportData

  //   const sliderLoopDataPrev = sliderImportData.slice(totalNumber - itemNumber, totalNumber);
  //   const sliderLoopDataNext = sliderImportData.slice(0, itemNumber);
  //   const sliderLoopData = loop
  //     ? [...sliderLoopDataPrev, ...sliderImportData, ...sliderLoopDataNext]
  //     : sliderImportData;

  //   return sliderLoopData;
  // }, [itemNumber, loop, totalNumber, sliderImportData]);
  // console.log(children.props.children)
  // console.log(Children.toArray(children.props.children))

  const sliderPrev = useMemo(
    () =>
    
      children.props
        ? Children.toArray(children.props.children).slice(totalNumber - itemNumber, totalNumber)
        : Children.toArray(children).slice(totalNumber - itemNumber, totalNumber),
    [totalNumber, itemNumber, children]
  );
  const sliderNext = useMemo(
    () =>
      children.props
        ? Children.toArray(children.props.children).slice(0, itemNumber)
        : Children.toArray(children).slice(0, itemNumber),
    [children, itemNumber]
  );
  console.log(sliderPrev);
  console.log(sliderNext);

  // const sliderDataData = sliderImportData.map((e) => e.data) as Details[];
  // const trendingDataNextNew = sliderDataData?.slice(0, itemNumber);
  // const trendingDataPrevNew = sliderDataData?.slice(totalNumber - itemNumber, totalNumber);
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
          // trendingDataIndexed - itemNumber * 2
          totalNumber
        );
      }
      if (
        currentIndex >
        // trendingDataIndexed - itemNumber * 2
        totalNumber
      ) {
        setTransition(false);
        setCurrentIndex(
          currentIndex - totalNumber
          // (trendingDataIndexed - itemNumber * 2 )
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
    // sliderExportData,
  };

  return {
    nextFunction,
    previousFunction,
    handleClick,
    handleTransition,
    pauseSlider,
    currentIndex,
    transition,
    isSliding,
    // sliderExportData,
    useSliderObj,
    sliderImportData,
    sliderPrev,
    sliderNext,
    // trendingDataPrevMemo
  };
};

export default useSlider;
