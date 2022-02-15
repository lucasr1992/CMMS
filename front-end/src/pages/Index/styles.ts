import styled, { keyframes } from 'styled-components';
import LogoSoftware from '../../assets/LogoSoftware.png';
import LogoDivisao from '../../assets/LogoDivisao.png';



export const Container = styled.div`
    //border: 2px solid blue;
    height: 100vh;
    display: flex;
    flex-direction: column;
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


export const IndicadoresIndex = styled.div `
  height: 100vh;
  background-image: url(${LogoSoftware}), url(${LogoDivisao});
  background-repeat: no-repeat, no-repeat;
  background-size: 20%, 13%;
  background-position: right bottom, left bottom;  
`;

                    
         
    
