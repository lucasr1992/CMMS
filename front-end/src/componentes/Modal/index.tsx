import React, { useCallback } from "react";
import { Container } from './styles';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Button from './../Button/index';
import InputRefAlt from '../../componentes/InputRefAlt/index';

interface ModalProps {
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ className, children, ...rest}) => {  // preciso declarar que vou usar a interface ToolTipProps  o children ja faz parte do código do framework ele ja entender children
    function valorNullo(){

    }

    return(        
        <Container className={className} {...rest}>
            <Form className='formModal' onSubmit={valorNullo}  >
                {children}                
            </Form>                             
        </Container>
         
    ); 
};

export default Modal;