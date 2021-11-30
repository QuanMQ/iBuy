import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-items: center;
  position: relative;

  &:hover button {
    transform: translateX(0);
  }

  &:hover img {
    transform: scale(1.1);
  }

  img {
    height: 300px;
    object-fit: contain;
    transition: transform 0.5s;
  }

  button {
    position: absolute;
    bottom: 10px;
    border-radius: 50px;
    font-size: 1rem;
    text-transform: capitalize;
    background-color: #fff;
    transition: all 0.5s ease-out;
    transform: translateY(100px);

    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
`;
