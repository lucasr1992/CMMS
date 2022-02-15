import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import LogoSoftware from '../../assets/LogoSoftware.png'
import LogoDivisao from '../../assets/LogoDivisao.png'
//import LogoSoftware from '../../assets/LogoSoftware.png';
//import LogoDivisao from '../../assets/LogoDivisao.png';


export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url(${LogoSoftware}), url(${LogoDivisao});
    background-repeat: no-repeat, no-repeat;
    background-size: 20%, 13%;
    background-position: right bottom, left bottom;  

    div.conteudoModal{
      display: flex;
      flex-direction: column;
      width: 100%;
      div.tituloModal{
        display: flex;      
        width: 100%;
        h1{
          margin-left: 9px;
          margin-top: 8px;
        }
        button{
          margin-top: 8px;
          margin-left: 80%;
          width: 40px;
          height: 40px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.7);
        }
      }
      div.lancamento{        
        margin-top: 10px;
        input{
          margin-left: 4px;
          border: 2px solid black;
          border-radius: 5px;
        }
        input.a{
          width: 140px;
        }
        input.b{
          width: 150px;
        }
        label{
          margin-left: 15px;
        }
        button{
          margin-left: 10px;
          height: 40px;
          width: 100px;
          box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.7);
        }
        input.dataInicioModal{
          border: 0;
          background: transparent;
          color: #fff;
          height: 0;
          width: 0;
        }
        input.dataFimModal{
          border: 0;
          background: transparent;
          color: #fff;
          height: 0;
          width: 0;
        }
      }
      
      div.cadastrosDiv{
        display: flex;
        flex-direction: column;
        margin-top: 15px;       
        margin-left: 80px;
        margin-right: 80px;
        
        
       
        div.conteudoLista{
          margin-bottom: 10px;
          background-color: #F8F8F8;
          display: flex;
          width: 100%;
          align-items:center;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
          
          label.a{
            margin-left: 25px;
            margin-right: 4px;
          }
          label.b{          
            width: 85px;
            
          }
          label.c{
            width: 300px;
          }
          label.d{
            margin-right: 100px;
          }
          svg{
            margin-left: 7%;
            margin-right: 0px;
            height: 20px;
            width: 20px;
            cursor: pointer;
          }
        }
   

      }
    }
   
`;



export const BarraMenu = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #292929;
  align-items:center;

  svg{
    height: 50px;
    width: 30px;
    margin-left: 15px;
    color: white; 
    cursor: pointer;
  }

  label{
    margin-left: 15px;
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

  div.temposDiv{
    margin-right: 0;
    input{
      height:1px;
      background: transparent;
      border: 0;
      color: #292929;
      width: 160px;
    }
  }
`;


export const MenuContent = styled.div `
  display: flex;
  width: 100%;
  div.linha{
    margin-top: 10px;
    width: 100%;
    height: 0;
    border: 1px;
    border-style: solid;
    border-color: grey;
  }
    div.info{
      margin-top: 15px;
      display: flex;
      align-items:center;
      label{
        margin-left: 20px;
        margin-right: 7px;
      }

      input.numosdiv{
        width: 90px;
      }

      input.midiv{
        width: 140px;
      }

      input.tecnicoRegdiv{
        width: 90px
      }

      input.tecnicoNomediv{
        width: 220px
      }
      
    }

    div.infoProblem{
      margin-top: 15px;
      display: flex;
      width: 1340px;
      align-items:center;

      label{
        margin-left: 20px;
        margin-right: 30px; 
      }
      div{
        width: 100%;
      }
      textarea{
        width: 100%;
      }
    }
    
    div.infoManut{
      margin-top: 15px;
      display: flex;
      align-items:center;
      margin-left: 35px;
      text-align: right;
      label{
        margin-right: 2px;
      }

      input.dataInput{
        width: 145px;
      }

      input.timeInput{
        width: 75px;
      }

      select{
        font-family: 'Bebas Neue', serif;
        font-size: 20px;
      }
    }

    div.tempoDiv{
      margin-top: 15px;
      display: flex;
      align-items:center;
      label{
        margin-left: 33px;
        margin-right: 5px;  
        width: 105px;
        text-align: center
      }
      input{
        width: 40px;
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

      div.fimDiv{
        display: flex;
        align-items:center;
        label{
          width: 70px;
          margin-left: 15px;
          margin-right: 5px;
        }
        div.BordaInputRef{
          margin-left: 5px;
        }
        input.dataInput{
          width: 145px;
        }
      }

      div.horaFimDiv{
        display: flex;
        align-items:center;
        label{
          width: 70px;
          margin-left: 15px;
          margin-right: 5px;
        }
        div.BordaInputRef{
          margin-left: 5px;
        }
        input.timeInput{
          width: 80px;
        }
      }


      
    }

    div.fullTimeDiv{
      margin-top: 10px;
      display: flex;
      align-items:center;
      label{        
        margin-left: 32px;
        margin-right: 5px;
        text-align: center
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
        margin-right: 35px ;
        input{        
          width: 25px;
          height: 25px;        
        } 
      }

      div.ttrDiv{
        display: flex;
        align-items: center;
        label{
          margin-left: 699px
        }
        input{
          width: 83px;
        }
      }
    }

    div.descricaoDiv{
      margin-top: 15px;
      display: flex;
      label{
        margin-left: 20px;
        margin-right: 5px;
      }
      div.BordaInputRef{
        width: 80%;
        height: 90px;
      }
      textarea{
        height: 100%;
        width: 92%;
      }
    }

    div.botaoDiv{
      display: flex;
      margin-left: 50px;
      
      button{
        height: 40px;
        width: 150px;
        margin-top: 5px; ;
        margin-left: 50px;
      }
    }

    
  
`;

                    
         
    
