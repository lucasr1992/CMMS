import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import LogoSoftware from '../../assets/LogoSoftware.png';
import LogoDivisao from '../../assets/LogoDivisao.png';

export const Container = styled.div`
    //border: 2px solid blue;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url(${LogoSoftware}), url(${LogoDivisao});
    background-repeat: no-repeat, no-repeat;
    background-size: 20%, 13%;
    background-position: right bottom, left bottom;  
`;

const barraMenuAnimacao = keyframes`
    from {
        //opacity: 0;
        transform: translatey(-100px);
    } to {
        //opacity: 1;
        transform: translatey(0px);
    }
`;

export const BarraMenu = styled.div`
  //animation: ${barraMenuAnimacao} 1s;
  //border: 2px solid blue;
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #292929;
  
  a{
    padding: 15px;
    text-decoration: none;
    color: white;
    
  }
  
    
`;



const menuAnimacao = keyframes`
  /*0%{opacity: 0;}
  70%{opacity: 0;}
  100%{opacity: 1;}*/
  from{
    opacity:0;
  }
  to{
    opacity: 1;
  }
`;

export const MenuContent = styled.div `
  animation-name: ${menuAnimacao};
  animation-duration: 1s;  
  flex-direction: column;
  //border: 3px solid red;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
 

  div.entrarDiv{  
    display: flex;
    flex-direction: column;
    //animation: ${menuAnimacao} 3s; 
    height: 350px;
    width: 650px;
    background-color: #292929;
    border-radius: 10px;
    box-shadow: 15px 16px 3px -4px rgba(1, 1, 1, 0.5);
    align-items: center;
    justify-content: center;
    div.inpShadow{
      margin-bottom: 30px;
      width: 230px;
      height: 35px;      
    }

    button{
      background-color: #fff;
      color: #000000;
      width: 50%;
      height: 50px;
      transition: background-color 0.2s;
      box-shadow: 1px 1px 4px 5px rgba(146, 146, 146, 0.6);   
      border: 2px solid black;

      &:hover{
          background: ${shade(0.3, '#fff')};
        }  
    }
  }
`;

                    
         
    
