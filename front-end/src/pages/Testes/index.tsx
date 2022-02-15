import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, BarraMenu, MenuContent} from './styles';
import moment from 'moment';
import InputRef from '../../componentes/InputRef/index';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationsErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import Modal from '../../componentes/Modal/index';
import Button from '../../componentes/Button';

interface interfaceRegistro{
  dataInput: string;
}

const testeVariado: React.FC = () => {
   
  const formRef = useRef<FormHandles>(null);
  const submitForm = useCallback(async(data: interfaceRegistro) => {
    try{       
    }catch (err: any){    
        return;              
    };
  }, []);


  const [modalVisible, setModalVisible] = useState({
    modal: false
  });

  const ModalVisible = useCallback(() => {
    setModalVisible({
      modal: true
    })
  }, []);


  const ModalHide = useCallback(() => {
    setModalVisible({
      modal: false
    })
  }, []);


  return (
    <Container>
      <BarraMenu>
        <Link to='/'>HOME</Link>   
      </BarraMenu>
      <MenuContent>
        <h1>CONFIGURAÇÃO</h1>
        <Form onSubmit={submitForm} ref={formRef}>          
          <button onClick={ModalVisible}>submit</button>


          {modalVisible.modal ? 
          <Modal>
            <Button onClick={ModalHide}>X</Button>
            <h1>TESTE MODAL</h1>            
          </Modal> : null}
        </Form>       
      </MenuContent>
    </Container>
  );
}

export default testeVariado;