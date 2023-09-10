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
              transform: `translateX(-${currentIndex * (100 / itemNumber)}%)`,
              transition: transition ? `all 300ms ease-out` : "none",
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
