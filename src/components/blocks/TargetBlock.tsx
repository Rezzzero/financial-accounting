import { Link } from "react-router-dom";

function TargetBlock({ percent }: any) {
  const size = 200; 
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (percent / 100) * circumference;
  const transform = `rotate(-90 ${size / 2} ${size / 2})`;

  return (
    <div className="card max-w-max block center  rounded-md shadow-md p-5 text-center mt-10 mr-10">
      <h3>Текущая цель</h3>
      <Link to="/target">
      <svg width="200" height="200">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0074d9"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={transform}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
        >
          {percent}%
        </text>
      </svg>
      </Link>

      <p>55 000 из 100 000</p>
    </div>
  );
}

export default TargetBlock;
