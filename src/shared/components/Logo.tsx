export const Logo = ({
  width = 50,
  height = 50,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="#98C1D9"
        stroke="#000000"
        strokeWidth="5"
      />

      <path
        d="M100,10 A90,90 0 0,1 190,100 L100,100 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="5"
      />

      <line
        x1="40"
        y1="40"
        x2="160"
        y2="160"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="160"
        x2="160"
        y2="40"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="10"
        x2="100"
        y2="190"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="10"
        y1="100"
        x2="190"
        y2="100"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
