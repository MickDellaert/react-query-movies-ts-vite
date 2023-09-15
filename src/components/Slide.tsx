type Slideprops = {
  children: React.ReactNode;
  index: number;
  handleClick: (index: number) => void;
  singlePadding: number;
};

export const Slide = ({ children, index, handleClick, singlePadding }: Slideprops) => {
  return (
    <>
      <div
        onClick={() => handleClick(index)}
        className="horizontal-slider-item"
        // // key={uuidv4()}
        style={{
          // width: `calc((100%  / ${itemNumber})`,
          paddingBlock: `${singlePadding}px`,
        }}
      >
        {children}
      </div>
    </>
  );
};
