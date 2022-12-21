import styled from "@emotion/styled";

const StyledDiv = styled.div`
  height: calc(5vh - 2px);
  width: 100vw;
  background: lightgray;
  border-bottom: 2px solid gray;
  display: flex;
`;

const StyledButton = styled.button`
  margin: 4px;
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
      <StyledButton disabled={!deleteEnabled} onClick={onDeleteClick}>
        Delete
      </StyledButton>
      <StyledButton onClick={onConnectAllVerticesClick}>
        Connect all vertices
      </StyledButton>
    </StyledDiv>
  );
}

export default Toolbar;
