import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledContainer = styled.section`
  border: 1px solid skyblue;
  border-radius: 15px;
  padding: 0.5rem;
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
`;

const H3Title = styled.h2`
  text-align: center;
  color: #0ab4fd;
`;

export default function DoneList() {
  // 완료 목록 불러오고
  let doneList = useSelector((state) => state.todo.list);

  doneList = doneList.filter((todo) => todo.done === true);
  return (
    <StyledContainer>
      <H3Title>Completed Lists</H3Title>
      <ul>
        {doneList.map((done) => {
          return (
            <li key={done.id}>
              <span>{done.text}</span>
            </li>
          );
        })}
      </ul>
    </StyledContainer>
  );
}
