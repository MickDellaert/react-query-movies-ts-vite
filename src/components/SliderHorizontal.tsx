import * as Interface from "../types/types";

export const SliderHorizontal = ({
  children,
  // divHeight,
  itemNumber,
  currentIndex,
  containerPadding,
  // handleClick,
  handleTransition,
  transition,
}: Interface.SliderType) => {
  // console.log(children.length)

  return (
    <>
      <div
        className="horizontal-slider-container"
        // onMouseEnter={() => setIsSliding(false)}
        // onMouseLeave={() => setIsSliding(true)}
        style={{ padding: `${containerPadding}px` }}
      >
        <div className="horizontal-slider-crop">
          <div
            className="horizontal-slider-content"
            style={{
              transition: transition ? `all 300ms ease-out` : "none",
              width: `calc((100%  / ${itemNumber})`,
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
            // onTransitionEnd={() => handleSliderTransition()}
            onTransitionEnd={() => handleTransition()}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
