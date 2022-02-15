import styled, { css } from 'styled-components';  

export const Container = styled.div`

  background-color: red;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0,0,0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  
  div.formModal{
    box-shadow: 0px 0px 60px rgba(255, 255, 255, 0.65);
    border-radius: 10px;
    background-color: #fff;
    width: 88%;
    height: 88%;
    color: black;
    display: flex;   
  }
`;