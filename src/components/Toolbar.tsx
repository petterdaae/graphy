import styled from "@emotion/styled";

const StyledDiv = styled.div`
  height: 5vh;
  width: 100vw;
  background: lightblue;
`;

function Toolbar() {
  return (
    <StyledDiv>
      <select>
        <option>Normal mode (n)</option>
      </select>
      <button disabled>Delete</button>
    </StyledDiv>
  );
}

export default Toolbar;
