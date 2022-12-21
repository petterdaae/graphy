import styled from "@emotion/styled";

const StyledDiv = styled.div`
  height: 5vh;
  width: 100vw;
  background: lightblue;
`;

interface Props {
  onDeleteClick: () => void;
  deleteEnabled: boolean;
  onConnectAllVerticesClick: () => void;
}

function Toolbar({
  onDeleteClick,
  deleteEnabled,
  onConnectAllVerticesClick,
}: Props) {
  return (
    <StyledDiv>
      <button disabled={!deleteEnabled} onClick={onDeleteClick}>
        Delete
      </button>
      <button onClick={onConnectAllVerticesClick}>Connect all vertices</button>
    </StyledDiv>
  );
}

export default Toolbar;
