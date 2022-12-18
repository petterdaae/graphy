import styled from "@emotion/styled";
import React from "react";

const Wrapper = styled.div`
  margin: 20px;
  width: 1000px;
  height: 700px;
  overflow-x: scroll;
  overflow-y: scroll;

  border: 10px solid lightgray;
`;

const StyledWorkboard = styled.div`
  position: relative;
  height: 3000px;
  width: 3000px;

  background-size: 20px 20px;
  background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);
`;

interface Props {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  nodes: number[][];
}

function Workboard(props: Props) {
  return (
    <Wrapper>
      <StyledWorkboard onClick={props.onClick}>
        <svg height="3000" width="3000">
          {props.nodes.map((node) => (
            <circle
              key={node[2]}
              cx={node[0]}
              cy={node[1]}
              r="40"
              stroke="black"
              strokeWidth="3"
              fill="red"
            />
          ))}
        </svg>
      </StyledWorkboard>
    </Wrapper>
  );
}

export default Workboard;
