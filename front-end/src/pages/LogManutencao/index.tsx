import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiUser, FiLock } from 'react-icons/fi';
import InputRef from '../../componentes/InputRef/index';
import Button from '../../componentes/Button/index';
import { Container, BarraMenu, MenuContent} from './styles';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/AuthContext';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { ToastContainer, toast } from 'react-toastify';

interface Entrar {
  col_registro: number;
  col_senha: string;  
}

const LogManutencao: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  

  const aoClicar = useCallback(async (data: Entrar) => {  
    try{
        
      const validacao = Yup.object().shape({
        col_registro: Yup.string().required('Necessario o Numero do Registro'),
        col_senha: Yup.string().required('Necessario Informar a Senha',)
      })
      await validacao.validate(data, {
        abortEarly: false,
      })

      
      
      
      const registroInpput = document.getElementById('registro') as HTMLInputElement; 
      
      const valRegistro = registroInpput.value
      localStorage.setItem('@Manutencao:registro', valRegistro);
      const login = await api.post('/logmanutencao', data).then((resposta) => {
        const dadosResposta = resposta.data
        const area = dadosResposta['col_area'];
        const nivel = dadosResposta['col_nivel_acesso'];
        const nome = dadosResposta['col_nome'];
        const subarea = dadosResposta['col_subarea'];


        localStorage.setItem('@Manutencao:area', area);
        localStorage.setItem('@Manutencao:nivel', nivel);
        localStorage.setItem('@Manutencao:nome', nome);
        localStorage.setItem('@Manutencao:subarea', subarea);

        
        if (area === 'MANUTENCAO PROFISSIONAL') {
          history.push('/menumanute');
        }else{
          toast.info('Você Não Tem Permissão Para Esta Area');
        }       

      })

    } catch(err: any) {
      
      if (err instanceof Yup.ValidationError){
        const erros = getValidationErrors(err);
        formRef.current?.setErrors(erros);
        return;
      }
      toast.error('Verifique os Dados de Login');
    }
      
  }, [history, toast]);
  
  
  useEffect(() => {
    document.getElementById('registro')?.focus();
  })


  return (
    <Container>
      <BarraMenu>
        <Link to='/'>HOME</Link>   
      </BarraMenu>
      <MenuContent><ToastContainer theme="dark" position="top-right" pauseOnHover={false} autoClose={2000} closeOnClick={true} closeButton={false}/>
        <h1>MANUTENÇÃO</h1>
        <Form onSubmit={aoClicar} ref={formRef} >
          <div className='entrarDiv'>
            <InputRef icon={FiUser} autoComplete='off' id='registro' name='col_registro' placeholder='REGISTRO'/>           
            <InputRef icon={FiLock} autoComplete='off' name='col_senha' type='password' placeholder='SENHA'/>
            <Button type="submit">ENTRAR</Button>
          </div>
          
        </Form>
      </MenuContent>
    </Container>
  );
}

export default LogManutencao;