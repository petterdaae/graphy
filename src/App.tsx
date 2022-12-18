function App() {
  return (
    <div>
      <svg height="100" width="100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill="red"
        />
      </svg>
      <svg height="210" width="500">
        <line x1="0" y1="0" x2="200" y2="200" stroke="black" stroke-width="2" />
      </svg>
      <svg height="30" width="200">
        <text x="0" y="15" fill="blue">
          I love SVG!
        </text>
      </svg>
    </div>
  );
}

export default App;
