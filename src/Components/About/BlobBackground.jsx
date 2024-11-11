const BlobBackground = ({ imgSrc }) => {
  const clipPathShape = "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)";

  return (
    <div className="relative flex w-full items-center justify-center md:w-1/2">
      <svg
        id="sw-js-blob-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute z-0 h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[450px] md:w-[450px]"
      >
        <defs>
          <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
            <stop
              id="stop1"
              stopColor="rgba(0, 114.333, 19.753, 0.2)"
              offset="0%"
            />
            <stop
              id="stop2"
              stopColor="rgba(0, 209.958, 31.119, 0.2)"
              offset="100%"
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#sw-gradient)"
          d="M20.1,-22.7C27.5,-17.7,35.9,-12.8,37.8,-6.1C39.7,0.6,34.9,9,30,17.1C25.1,25.2,19.9,32.9,12.3,37C4.7,41.2,-5.4,41.8,-12.1,37.5C-18.9,33.2,-22.4,24.1,-26.7,15.8C-30.9,7.6,-35.9,0.2,-36.9,-8.7C-37.9,-17.5,-35,-27.9,-28.2,-33C-21.4,-38.1,-10.7,-38,-2.2,-35.4C6.3,-32.9,12.7,-27.7,20.1,-22.7Z"
          transform="translate(50 50)"
          strokeWidth="0"
        />
      </svg>

      {/* Image with Pentagon Clipping */}
      <img
        src={imgSrc}
        alt="Description of the image"
        className="relative z-10 h-[170px] w-[170px] object-cover sm:h-[220px] sm:w-[220px] md:h-[310px] md:w-[310px]"
        style={{
          clipPath: clipPathShape,
        }}
      />
    </div>
  );
};

export default BlobBackground;
