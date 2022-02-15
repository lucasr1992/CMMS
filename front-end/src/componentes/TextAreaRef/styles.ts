import styled, { css } from 'styled-components';  //pega as propriedades do campo q recebeu esse estilo
import Tooltip from '../Tooltip/index';

interface propriedadesInput{
  focoinputEstilo: boolean; //se o input esiver setado com foco vai entrar nessa propriedade
  //preenchidoinput: boolean; //se o input esiver preenchido vai entrar nessa propriedade
  campoErradoEstilo: boolean; //se o input esiver com erro vai entrar nessa propriedade
}

export const Container = styled.div<propriedadesInput>`   //o container usa a interfa propriedadesInput e toda esses campos são obrigatorios no Container do input que importou esse estilo, no caso o inputRef
  border: 2px solid black;
  display: flex;
  height: 90px;
  align-items: center;
  border-radius: 5px;
  margin-right: 10px;

  textarea{
    
    height: 80px;
    background: transparent;
    border: 0;
    margin-left: 5px;
    resize: none;
    margin-left: 5px;
    
  }

  ${ propriedades => propriedades.campoErradoEstilo && css `
    border-color: red;
    color: red;
  `}

  ${ propriedades => propriedades.focoinputEstilo && css `
    border-color: orange;
    color: orange;
  `}

  svg{
    margin-left: 3px;    
  }
  
`;


export const Errodiv = styled(Tooltip)`
  height: 20px;
  margin-left: 10px;
  svg{
    height: 20px;
    margin: 0;
  }
`;
