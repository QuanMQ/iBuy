import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  border-bottom: 1px solid lightblue;
  margin: 20px auto;
  padding-bottom: 20px;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  #right-panel {
    margin-left: 20px;
    max-width: 80px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover::before {
      content: "Remove";
      font-weight: bold;
      position: absolute;
      color: #fff;
      z-index: 10;
    }

    &:hover::after {
      content: "";
      position: absolute;
      background-color: rgba(0, 0, 0, 0.4);
      height: 100%;
      width: 100%;
    }
  }

  img {
    width: 100%;
    object-fit: contain;
  }
`;
