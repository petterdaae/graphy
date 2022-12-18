import styled from "@emotion/styled";

const Wrapper = styled.div`
  margin: 20px;
  width: 1000px;
  height: 700px;
  overflow-x: scroll;
  overflow-y: scroll;

  border: 10px solid lightgray;
`;

const StyledWorkboard = styled.div`
  height: 3000px;
  width: 3000px;

  background-size: 20px 20px;
  background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);
`;

function Workboard() {
  return (
    <Wrapper>
      <StyledWorkboard>
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
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="200"
            stroke="black"
            stroke-width="2"
          />
        </svg>
        <svg height="30" width="200">
          <text x="0" y="15" fill="blue">
            I love SVG!
          </text>
        </svg>
      </StyledWorkboard>
    </Wrapper>
  );
}

export default Workboard;
