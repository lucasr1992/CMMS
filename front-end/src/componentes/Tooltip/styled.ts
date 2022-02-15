import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    span {
        width: 160px;
        background: red;
        padding: 8px;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.2s;
        visibility: hidden;  //isso esconde o elemento quando ele não esta com o mouse por cima, se não ele fica mostrando 
        text-align: center;        
        position: absolute;
        bottom: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%);

        color: #fff;

        &::before {
            content: '';
            border-style: solid;
            border-color: red transparent;
            border-width: 6px 6px 0 6px;
            top: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            
        }
    }

    &:hover span{
        opacity: 1;
        visibility: visible;
    }


`;