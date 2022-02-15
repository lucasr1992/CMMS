import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiUser, FiLock } from 'react-icons/fi';
import InputRef from '../../componentes/InputRef/index';
import Button from '../../componentes/Button/index';
import { Container, BarraMenu, MenuContent} from './styles';

interface Entrar {
  registro: number;
  senha: string;  
}

const Config: React.FC = () => {
  const handleSubmit = useCallback(async (data: Entrar) => {   
   
  }, []);  
  return (
    <Container>
      <BarraMenu>
        <Link to='/'>HOME</Link>   
      </BarraMenu>
      <MenuContent>
        <h1>CONFIGURAÇÃO</h1>
        <Form onSubmit={handleSubmit}>
          <div className='entrarDiv'>
            <InputRef icon={FiUser} name='registroInput' placeholder='REGISTRO'/>           
            <InputRef icon={FiLock} name='senhaInput' type='password' placeholder='SENHA'/>
            <Button>ENTRAR</Button>
          </div>
          
        </Form>
      </MenuContent>
    </Container>
  );
}

export default Config;