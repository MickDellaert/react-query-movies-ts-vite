import { useEffect, useState } from "react";

const useSliderControls = (sliderOptions: { itemNumber: number; totalNumber: number; loop: boolean }) => {
  const { itemNumber, totalNumber, loop } = sliderOptions;

  const [currentIndex, setCurrentIndex] = useState(loop ? itemNumber : 0);
  const [transition, setTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

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
    useSliderObj,
  };
};

export default useSliderControls;
