import styled, { keyframes, css } from 'styled-components';
import LogoSoftware from '../../assets/LogoSoftware.png';
import LogoDivisao from '../../assets/LogoDivisao.png';






export const Container = styled.div`
    //border: 1px solid blue;
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

const formularioAnimacao = keyframes`
    from {
        opacity: 0;
        //transform: translatey(-100px);
    } to {
        opacity: 1;
        //transform: translatey(0px);
    }
`;



export const FormularioOcorrencia = styled.div`
  animation: ${formularioAnimacao} 1s;
  
  div.ocorrenciaDivClass{
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 10px;
    align-items:center;

    div.a{
      background: #FFF;
      border-radius: 5px;    
      padding: 12px;    
      color: #000000;
      display: flex;
      align-items: center;
      border: 2px solid #000000;
      box-shadow: 5px 4px 4px rgba(255, 122, 0, 0);
      margin-right: 8px;
      input{        
        flex: 1;
        background: transparent;
        border: 0;
        color: #000000;
        margin-right: 2px;
        &::placeholder{
            color: #666360;
        }         
      }
      svg {
        margin-right: 8px;
      }
    }

    div.b{
      background: #FFF;
      border-radius: 5px;    
      padding: 12px;    
      color: #000000;
      display: flex;
      align-items: center;
      border: 2px solid #000000;
      box-shadow: 5px 4px 4px rgba(255, 122, 0, 0);
      margin-right: 8px;
      input{        
        flex: 1;
        background: transparent;
        border: 0;
        color: #000000;
        margin-right: 2px;
        &::placeholder{
            color: #666360;
        }         
      }
      svg {
        margin-right: 8px;
      }
    }  
    label{
      margin-right: 5px;
    }    
    
    input{
      height: 20px;
      width: 170px;
      font-size: 20px;
    }   
  }

  div.maquinaDivClass{
    display: flex;
    margin: 0;
    padding: 5px 0px 0px 70px;
    align-items:center;
    div.a{
      .BordaInputRef{
        width: 200px;
        input{
          width: 130px;
        }
      }
    }    

    div.b{
      .BordaInputRef{
        width: 290px;
        input{
          width: 255px;
        }
      }
    }    

    div.c{
      .BordaInputRef{
        width: 500px;
        input{
          width: 450px;
        }
      }
    } 
      
  }
    
    label{
      margin-right: 5px;
    }
    .descricaoInput{
      width: 450px;
      
    }

    div.BordaInputRef{
      &:focus-within{
        border-color: orange;
        color: orange;
      }
    }

    
    
  }
  



  div.containerS{    
    position: absolute;
    border: 1px solid black;
    margin-left: 100px;
    border-radius: 8px;
    background-color: #fff ;
    div.sugestaoMi{      
      
      cursor: pointer;
      border: 1px solid black;
      margin-left: 5px;
      margin-top: 5px;
      margin-right: 5px;
      margin-bottom: 5px;
      width: 80vh;
      height: 35px;
      background-color: #fff;
      padding: 5px;
      &:hover{
          background-color: grey;
      }
    }
  }

  



  

  div.problemaDiv{
    margin-top: 15px;
    display: flex;
    label{
      margin-left: 12px;
      word-wrap: break-word;
      width: 75px;
    }
    .BordaInputRef{
      width: 83.3%; 
      textarea{
        width: 94%;
      } 
    }
  }
  

  div.EstadoDiv{
    margin-top: 10px;
    display: flex;
    align-items: center;
    label{
      margin-left: 90px;
      margin-right: 8px;      
    }
    div.a{
      background: #FFF;
      border-radius: 5px;      
      color: #000000;
      display: flex;
      align-items: center;
      border: 2px solid #000000;
      box-shadow: 5px 4px 4px rgba(255, 122, 0, 0);
      width: 50px;
      padding: 5px 5px 5px 10px;
      input{        
        width: 25px;
        height: 25px;        
      } 
    }
    div.b{
      background: #FFF;
      border-radius: 5px;      
      color: #000000;
      display: flex;
      align-items: center;
      border: 2px solid #000000;
      box-shadow: 0px 0px 10px 7px rgba(235, 255, 0, 0.7);
      width: 50px;
      padding: 5px 5px 5px 10px;      
      input{        
        width: 25px;
        height: 25px;        
      }
    }
  }

  div.operadorDiv{
    margin-top: 10px;
    display: flex;
    align-items: center;
    label{
      margin-left: 15px;
      width: 70px;
      margin-right: 5px;
    }
    div.b{
      .BordaInputRef{
        width: 100vh;
        input{
          width: 94%;
        }
      }  
    }
  }
  
  div.botaoDiv{
    display: flex;
    margin-top: 20px;
    //border: 2px solid blue;
    justify-content: space-between;
    margin-left: 90px;
    margin-right: 90px;

    button{
      height: 40px;
      width: 230px;
    }
 }

  height: 100vh;
  //background-image: url(${LogoSoftware}), url(${LogoDivisao});
  //background-repeat: no-repeat, no-repeat;
  //background-size: 20%, 13%;
  //background-position: right bottom, left bottom;  
`;