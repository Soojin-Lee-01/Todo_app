import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { create, done } from "../store/modules/todo";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledContainer = styled.section`
  border: 1px solid #d6a6fb;
  border-radius: 15px;
  padding: 0.5rem;
  width: 600px;
  margin: 0 auto;
`;

const H3Title = styled.h2`
  text-align: center;
  color: #930afd;
`;

const InputDiv = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  width: 200px;
  height: 28px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  padding-left: 10px;
  background-color: rgb(249, 229, 252);
`;

const StyledButton = styled.button`
  background-color: #f39cf3;
`;

const Todo = styled.span`
  margin: 0 auto;
  text-align: center;
`;

export default function TodoList() {
  // useSelector()를 통해서 store의 state 가져오기
  let todoList = useSelector((state) => state.todo.list);

  // console.log(todoList);

  todoList = todoList.filter((todo) => todo.done === false);

  const nextId = useSelector((state) => state.todo.nextID);

  console.log("nextID", nextId);

  // useDispatch()를 통해서 dispatch 함수 생성
  const dispatch = useDispatch();

  const inputRef = useRef();

  const createTodo = () => {
    dispatch(create({ id: todoList.length + 1, text: inputRef.current.value }));
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  // Enter를 쳤을 때 추가
  const enterTodo = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") createTodo();
  };

  return (
    <StyledContainer>
      <H3Title>Daily Tasks</H3Title>
      <InputDiv>
        <StyledInput
          type="text"
          ref={inputRef}
          onKeyDown={enterTodo}
          placeholder="Enter a task"
        />{" "}
        <StyledButton onClick={createTodo}>
          <FontAwesomeIcon icon={faPlus} />
        </StyledButton>
      </InputDiv>
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <button onClick={() => dispatch(done(todo.id))}>
                {" "}
                <FontAwesomeIcon icon={faCheck} />
              </button>{" "}
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </StyledContainer>
  );
}
