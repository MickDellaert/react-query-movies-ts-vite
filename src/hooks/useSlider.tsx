import React, { cloneElement } from "react";
import { Children, useEffect, useMemo, useState } from "react";

const useSlider = (itemNumber: number, totalNumber: number, loop: boolean, children: React.ReactElement) => {
  const [currentIndex, setCurrentIndex] = useState(loop ? itemNumber : 0);
  const [transition, setTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  const sliderChildren = useMemo(() => {
    const sliderPrev = children.props
      ? Children.toArray(children.props.children).slice(totalNumber - itemNumber, totalNumber)
      : Children.toArray(children).slice(totalNumber - itemNumber, totalNumber);

    const sliderNext = children.props
      ? Children.toArray(children.props.children).slice(0, itemNumber)
      : Children.toArray(children).slice(0, itemNumber);

    const combinedChildren = loop
      ? [...sliderPrev, ...Children.toArray(children.props.children), ...sliderNext]
      : Children.toArray(children.props.children);

    const combinedChildrenWithKey = Children.map(combinedChildren, (child, index) =>
      cloneElement(child as React.ReactElement, { index: index, key: index })
    );

    return combinedChildrenWithKey;
  }, [children, itemNumber, totalNumber, loop]);

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
    nextFunction,
    previousFunction,
    handleClick,
    handleTransition,
    pauseSlider,
    currentIndex,
    transition,
    isSliding,
    useSliderObj,
    sliderChildren,
  };
};

export default useSlider;
