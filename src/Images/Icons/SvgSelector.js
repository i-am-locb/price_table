export const SvgSelector = (svgId) => {
  switch (svgId.svgId) {
    case "favorite":
      return (
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.38 12.803l-3.38-10.398-3.381 10.398h-11.013l8.925 6.397-3.427 10.395 8.896-6.448 8.895 6.448-3.426-10.395 8.925-6.397h-11.014z"></path>
        </svg>
      );
    case "arrow":
      return (
        <svg
          width="17px"
          height="17px"
          viewBox="0 0 17 17"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g></g>
          <path
            d="M16.354 5.075l-7.855 7.854-7.853-7.854 0.707-0.707 7.145 7.146 7.148-7.147 0.708 0.708z"
            fill="#000000"
          />
        </svg>
      );
    default:
      return <svg></svg>;
  }
};
