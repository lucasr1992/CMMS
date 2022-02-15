import { createGlobalStyle } from 'styled-components';
import LogoSoftware from '../assets/LogoSoftware.png';
import LogoDivisao from '../assets/LogoDivisao.png';


export default createGlobalStyle`
 
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        
    }
   

    body {
        height: 98vh;
        background-color: #fff ;
        
       
    }

    body, input, button, textarea {
        font-family: 'Bebas Neue', serif;
        font-size: 20px;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    


    button {
        cursor: pointer;
    }

`;