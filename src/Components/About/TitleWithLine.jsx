const TitleWithLine = ({ title }) => {
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-center text-sm font-bold sm:text-lg md:text-xl lg:text-2xl">
        {title}
      </h2>
      <svg
        className="relative w-40 -translate-y-5 sm:w-64 md:w-80 md:-translate-y-8 lg:w-96"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 248 82"
        enableBackground="new 0 0 248 82"
        xmlSpace="preserve"
      >
        <path
          fill="none"
          opacity="1"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M217.5,39.5 C176.167,39.82 134.834,39.435 93.498,39.737 C74.829,39.873 56.166,40.285 37.5,40.462 C35.846,40.478 34.077,41.059 32.5,40"
        />
        <path
          fill="none"
          opacity="1"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M82.5,25.5 C81.833,24.333 80.863,23.24 80.559,21.986 C79.77,18.728 77.778,19.137 75.5,20 C65.647,23.734 55.959,27.837 46.481,32.461 C40.584,35.338 34.5,37.833 28.5,40.5"
        />
        <path
          fill="none"
          opacity="1"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M93,40.5 C100.04,47.91 107.437,54.785 117.487,58.041 C120.463,59.005 123.735,58.822 126.5,60.5"
        />
        <path
          fill="none"
          opacity="1"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M89.5,35.5 C90.333,36.667 91.167,37.833 92,39"
        />
      </svg>
    </div>
  );
};

export default TitleWithLine;
