import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, BarraMenu, IndicadoresIndex} from './styles';
//import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';


const Home: React.FC = () => { 
  
  function statusPag(){
    const ComandToast = localStorage.getItem('@InfoPagOcorrencia:Valor');
    if(ComandToast === 'Cancelado'){
      localStorage.removeItem('@InfoPagOcorrencia:Valor');
      toast.info(`Ocorrência Cancelada`)
    } else if(ComandToast === 'Cadastrado'){
      localStorage.removeItem('@InfoPagOcorrencia:Valor');
      const valorOS = localStorage.getItem('@InfoPagOcorrencia:NumOs');
      localStorage.removeItem('@InfoPagOcorrencia:NumOs');
      toast.success(`Ocorrência Cadastrada Num: ${valorOS}`);
    } 
  };

  function menuManutencao(){
    const valor = localStorage.getItem('@MenuManutencao')
    if( valor === 'permissao'){
      localStorage.removeItem('@MenuManutencao');
      toast.error(`Você foi Desconectado, Faça o Log In Novamente`);
    }
  }

  useEffect(() => {
    statusPag();
    menuManutencao();
  }, [])

   

      return (
      <Container>
        <BarraMenu><ToastContainer theme="dark" position="top-right" pauseOnHover={false} autoClose={3000} closeOnClick={true} closeButton={false}/>
          <Link to='/abrirocorrencia'>Abrir ocorrência</Link>
          <Link to='/manutenc'>Manutenção</Link>     
          <Link to='/config'>Configuração</Link> 
          <Link to='/testess'>TESTE</Link>
          
            
        </BarraMenu>
        <IndicadoresIndex>
            
        </IndicadoresIndex>
      </Container>
    );
}

export default Home;