import styled, { keyframes, css } from 'styled-components';
import LogoSoftware from '../../assets/LogoSoftware.png';
import LogoDivisao from '../../assets/LogoDivisao.png';




export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url(${LogoSoftware}), url(${LogoDivisao});
    background-repeat: no-repeat, no-repeat;
    background-size: 20%, 13%;
    background-position: right bottom, left bottom;  
`;



export const BarraMenu = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #292929;
  svg{
    height: 50px;
    width: 30px;
    margin-left: 15px;
    color: white; 
    cursor: pointer;
  }
  
  a{
    
    text-decoration: none;
    color: white; 
  }    
  label{
    padding: 15px;
    text-decoration: none;
    color: white; 
  }
  div.infoUsuario{
    margin-right: 0;
    input{
      height:1;
      width: 1px;
      background: transparent;
      border: 0;
      color: #292929;

    }
  }
`;





export const MenuContent = styled.div `
  
  display: flex;
  flex: 1;
  flex-direction: column;
  div.cabecalho{
    display: flex;
    align-items: center;
    svg{
      margin-left: 5px;
      height: 40px;
      width: 40px;
      cursor: pointer;
    }
  }

  div.Titulo{
    display:flex;
    h1{
      font-size: 25px;
    }

    h1.abertura{
      margin-left: 30px;
    }

    h1.ocorrencia{
      margin-left: 120px;
    }

    h1.maquina{
      margin-left: 130px;
    }

    h1.status{
      margin-left: 445px;
      margin-bottom: 5px;
    }
  }

  
  
`;

export const ContainerMap = styled.div`
  
    margin-bottom: 17px;
    height: 100px;
    margin-right: 20px;
    margin-left: 20px;
    box-shadow: 0px 0px 4px 6px rgba(0, 0, 0, 0.55);
    display: flex;
    div.abertura{
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      //border: 1px solid red;
      width: 14%;
      
      label{
        font-size: 18px;  
      }
      label.parada{
        margin-top: 4px;
        color: #7A7A7A;
      }
      label.parada ~ label{
        font-size: 25px;
      }
    }
    
    div.ocorrencia{
      display: flex;
      flex-direction: column;
      width: 16%;
      //align-items: center;
      label{
        margin-left: 10px;
        font-size: 40px;
      }
      svg{
        width: 50px;
        height: 50px;
        color: red;
        margin-left: 13%
      }
    }

    div.maquina{
      width: 37%;
      display: flex;
      flex-direction: column;
      label{
        font-size: 23px;
      }

      label.descricao{
        margin-top: 8px;
        font-size: 21px;
        color: #7A7A7A;
      }

      label.linha{
        margin-top: 8px;
        font-size: 21px;
        color: #7A7A7A;
      }
    }

    div.status{
      width: 12%;
      align-items: center;
      div{
        background: yellow;
        border-radius: 7px;
        text-align: center;
        margin-top: 12%;
        padding: 10px 5px;
        h1{
          word-wrap: break-word;
          font-size: 30px;          
        }        
      }
    }

    div.icone{
      width: 20%;
      svg{
        margin-top: 5%;
        margin-left: 70%;
        height: 80px;
        width: 80px;
        cursor: pointer;
      }
    }

    
  
`;





