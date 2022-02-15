import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, BarraMenu, MenuContent, ContainerMap} from './styles';
import { ToastContainer, toast } from 'react-toastify';
import { FiPower } from 'react-icons/fi';
import { AiOutlineReload } from 'react-icons/ai'
import Button from '../../componentes/Button/index';
import api from '../../services/api';
import { BsExclamationTriangleFill } from 'react-icons/bs'
import { TiSpanner } from 'react-icons/ti'
import moment from 'moment';

interface inforUsuario{
  area: string;
  nome: string;
  nivel: string;
  registro: string;
  subarea: string;
}

interface tabelaOcorrencia{
  col_data_abertura: Date;
  col_descricao: string;
  col_linha: string;
  col_maquinaparada: string;
  col_mi: string;
  col_numos: string;
  col_seguranca: string;
  col_status: string;
}

interface filtroArea{
  areaID: string;
  subareaID: string;
}


const menuManutencao: React.FC = () => {
 
  const[tabela, setTabela] = useState<tabelaOcorrencia[]>([])
  


  


  const history = useHistory();
  const [ info, setInfo ]= useState<inforUsuario>({
    area: '',
    nome: '',
    nivel: '',
    registro: '',
    subarea: '',
  })
  
  async function inicioPagina() {
    const area = localStorage.getItem('@Manutencao:area');
    if(area === 'MANUTENCAO PROFISSIONAL'){
      const nome = localStorage.getItem('@Manutencao:nome')    
      const nivel = localStorage.getItem('@Manutencao:nivel');
      const registro = localStorage.getItem('@Manutencao:registro');
      const subarea = localStorage.getItem('@Manutencao:subarea');
      setInfo({
        area: area,
        nome: nome || '',
        nivel: nivel || '',
        registro: registro || '',
        subarea: subarea|| '',
      })


      const areaID = localStorage.getItem('@Manutencao:area');
      const subareaID= localStorage.getItem('@Manutencao:subarea');
      const response = await api.get(`/ocorrencias/${areaID}/${subareaID}`)
      setTabela(response.data); 

      /*localStorage.removeItem('@Manutencao:area')
      localStorage.removeItem('@Manutencao:nome')
      localStorage.removeItem('@Manutencao:nivel')
      localStorage.removeItem('@Manutencao:registro')
      localStorage.removeItem('@Manutencao:subarea')*/

      
    }else{
      localStorage.removeItem('@Manutencao:nome');
      localStorage.removeItem('@Manutencao:nivel');
      localStorage.removeItem('@Manutencao:registro');
      localStorage.removeItem('@Manutencao:area');
      localStorage.removeItem('@Manutencao:subarea')
      localStorage.setItem('@MenuManutencao', 'permissao')
      history.push('/');
    }
  }
 

  useEffect(() => {
    inicioPagina();  
    CarregarLista();
    
  }, [])

  

  function logOut(){
    localStorage.removeItem('@Manutencao:nome') 
    localStorage.removeItem('@Manutencao:area'); 
    localStorage.removeItem('@Manutencao:nivel');
    localStorage.removeItem('@Manutencao:registro'); 
    localStorage.removeItem('@Manutencao:subarea')
    history.push('/');
  }

  async function CarregarLista(){
    const area = document.getElementById('areaID') as HTMLInputElement; 
    const areaID= area.value; 
    const subarea = document.getElementById('subareaID') as HTMLInputElement; 
    const subareaID= subarea.value; 
    const response = await api.get(`/ocorrencias/${areaID}/${subareaID}`)
    setTabela(response.data);    
  }


  function atenderOcorrencia(num: string){
    const area = document.getElementById('areaID') as HTMLInputElement
    const valorArea = area.value
    localStorage.setItem('@Manutencao:area', valorArea);

    const nome = document.getElementById('nomeID') as HTMLInputElement
    const valorNome = nome.value
    localStorage.setItem('@Manutencao:nome', valorNome);

    const nivel = document.getElementById('nivelID') as HTMLInputElement
    const valNivel = nivel.value
    localStorage.setItem('@Manutencao:nivel', valNivel);

    const registro = document.getElementById('registroID') as HTMLInputElement
    const valRegistro = registro.value
    localStorage.setItem('@Manutencao:registro', valRegistro);

    const subarea = document.getElementById('subareaID') as HTMLInputElement
    const valSubarea = subarea.value
    localStorage.setItem('@Manutencao:subarea', valSubarea);

    history.push(`/atenderocorrencia/${num}`)
  }

  return (
    <Container>
      <BarraMenu>        
        <Link to='' onClick={logOut}><FiPower /></Link>          
        <label>{info.nome}  -  {info.registro}</label>
        <div className='infoUsuario'> 
          <input id='areaID' className='area' value={info.area} disabled />
          <input id='nomeID' className='nome' value={info.nome} disabled/>
          <input id='nivelID' className='nivel' value={info.nivel} disabled/>
          <input id='registroID' className='registro' value={info.registro} disabled/>
          <input id='subareaID' className='subarea' value={info.subarea} disabled/>
        </div>      
      </BarraMenu>
      <MenuContent><ToastContainer theme="dark" position="top-right" pauseOnHover={false} autoClose={2000} closeOnClick={true} closeButton={false}/>
        <div className='cabecalho'> 
          <h1>OCORRÊNCIAS</h1> 
          <AiOutlineReload onClick={CarregarLista}/> 
        </div>
        <div className='Titulo'>
            <h1 className='abertura'>ABERTURA</h1>
            <h1 className='ocorrencia'>OCORRÊNCIA</h1>
            <h1 className='maquina'>MAQUINA</h1>
            <h1 className='status'>STATUS</h1>
          </div>
          {tabela.map(registro => (
              <ContainerMap key={registro.col_numos} className='Conteudo' >
                <div className='abertura'>
                  <div>
                    <label>{moment(registro.col_data_abertura).format("DD/MM/YYYY")}-</label>
                    <label>{moment(registro.col_data_abertura).format("HH:mm:ss")}</label>
                  </div>              
                  <label className='parada'>PARADA</label>
                  <label>{registro.col_maquinaparada}</label>
                </div>
                <div className='ocorrencia'>
                  <label>{registro.col_numos}</label>
                  { registro.col_seguranca === 'SIM' && (<BsExclamationTriangleFill/> )}   
                              
                </div>
                <div className='maquina'>
                  <label>{registro.col_mi}</label>
                  <label className='descricao'>{registro.col_descricao}</label>
                  <label className='linha'>{registro.col_linha}</label>
                </div>
                <div className='status'>
                { registro.col_status === 'EM ANDAMENTO' ? ( 
                  <div style={{backgroundColor: 'yellow'}}>
                    <h1>{registro.col_status}</h1>
                  </div> 
                ): 
                <div style={{backgroundColor: 'orange'}}>
                  <h1>{registro.col_status}</h1>
                </div>
                }
                
                </div>
                <div className='icone'>
                  <TiSpanner onClick={() => atenderOcorrencia(registro.col_numos)}/>   
                </div>
              </ContainerMap>
            ))
          }
      </MenuContent>
    </Container>
  );
}

export default menuManutencao;