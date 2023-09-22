import { Children, cloneElement, useMemo } from "react";

export const useSliderData = (children: React.ReactElement, totalNumber: number, itemNumber: number, loop: boolean) => {

  const sliderChildrenData = useMemo(() => {

    const sliderPrev = children.props
      ? Children.toArray(children.props.children).slice(totalNumber - itemNumber, totalNumber)
      : Children.toArray(children).slice(totalNumber - itemNumber, totalNumber);

    const sliderNext = children.props
      ? Children.toArray(children.props.children).slice(0, itemNumber + 1)
      : Children.toArray(children).slice(0, itemNumber);

    const combinedChildren = loop
      ? [...sliderPrev, ...Children.toArray(children.props.children), ...sliderNext]
      : Children.toArray(children.props.children);

    const combinedChildrenWithKey = Children.map(combinedChildren, (child, index) =>
      cloneElement(child as React.ReactElement, { index: index, key: index })
    );

    return combinedChildrenWithKey;
  }, [children, itemNumber, totalNumber, loop]);

  return sliderChildrenData;
};
