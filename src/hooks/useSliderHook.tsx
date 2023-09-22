import { useEffect, useMemo, useState } from "react";
import { Details } from "../types/types";
// import { UseQueryResult } from "@tanstack/react-query";
// import { Tester } from "../types/types";

const useSliderHook = (
  sliderOptions: { itemNumber: number; totalNumber: number; loop: boolean; data?: never[] },
  // itemNumber: number,
  // totalNumber: number,
  // loop: boolean,
  sliderImportData: Details[]
  // sliderImportData: Array<string>
) => {
  const { itemNumber, totalNumber, loop } = sliderOptions;

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

  const sliderExportData = useMemo(() => {
    // const sliderLoopD = sliderImportData

    const sliderLoopDataPrev = sliderImportData.slice(totalNumber - itemNumber, totalNumber);
    const sliderLoopDataNext = sliderImportData.slice(0, itemNumber);
    const sliderLoopData = loop
      ? [...sliderLoopDataPrev, ...sliderImportData, ...sliderLoopDataNext]
      : sliderImportData;

    return sliderLoopData;
  }, [itemNumber, loop, totalNumber, sliderImportData]);

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
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

  const previousFunction = () => {
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  useEffect(() => {}, []);

  const handleClick = (item: number) => {
    if (loop) {
      setTransition(true);
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
        setCurrentIndex(totalNumber);
      }
      if (currentIndex > totalNumber) {
        setTransition(false);
        setCurrentIndex(currentIndex - totalNumber);
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
    sliderImportData,
    sliderExportData,
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
    useSliderObj,
    sliderImportData,
    sliderExportData,
  };
};

export default useSliderHook;
