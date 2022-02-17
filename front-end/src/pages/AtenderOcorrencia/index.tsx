import React, { useEffect, useState, useCallback, useRef, HTMLInputTypeAttribute } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, BarraMenu, MenuContent} from './styles';
import { ToastContainer, toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../services/api';
import InputRef from '../../componentes/InputRef/index';
import Button from '../../componentes/Button/index';
import TextRef from '../../componentes/TextAreaRef/index';
import moment from 'moment';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import getValidationsErrors from '../../utils/getValidationErrors';
import InputRefAlt from '../../componentes/InputRefAlt/index';
import SelectRefAlt from '../../componentes/SelectRefAlt/index';
import TextRefAlt from '../../componentes/TextAreaRefAlt/index'
import Modal from './../../componentes/Modal/index';




interface campoOcorrencia{
  col_numos: number;
  col_data_abertura: string;
  col_mi: string;
  col_problema: string;
  col_tecnico: string;
  col_nome: string;
  col_chegada: string;
  col_diagnostico: string;
  col_desmontagem: string;
  col_peca: string;
  col_montagem: string;
  col_fim: string;
  col_tipo: string;
  col_natureza: string;
  col_raiz: string;
  col_atuacao: string;
  col_obs: string;

};

interface inforUsuario{
  area: string;
  nome: string;
  nivel: string;
  registro: string;
  subarea: string;
};

interface interfaceRegistro{
  col_tecnico: number;
  col_tipo: string;
  col_natureza: string;
  col_raiz: string;
  col_atuacao: string;
  col_obs: string;
  col_chegada: string;
  col_diagnostico: string;
  col_desmontagem: string;
  col_peca: string;
  col_montagem: string;
  col_fim: string;
  col_status: string;
  col_MBD: string;
}

interface tabelaMOBD{
  col_registro: number;
  col_nome: string;
  col_inicio: Date;
  col_fim: Date;
  col_numos: number;
}

const atenderOcorrencia: React.FC = () => { 
  const { num } = useParams<{num: string}>();

  const [maoObra, setMaoObra] = useState({
    modal: false
  });

  const [pecas, setPecas] = useState({
    modal: false
  });

  const [campos, setCampos] = useState<campoOcorrencia>({
    col_numos: 0,
    col_data_abertura: '',
    col_mi: '',
    col_problema: '',
    col_tecnico: '',
    col_nome: '',
    col_chegada: '',
    col_diagnostico: '',
    col_desmontagem: '',
    col_peca: '',
    col_montagem: '',
    col_fim: '',
    col_tipo: '',
    col_natureza: '',
    col_raiz: '',
    col_atuacao: '',
    col_obs: '',
  });

  const [ chegada, setChegada] = useState({
    concat:''
  });

  const [ minDiagnostico, setMinDiagnostico] = useState({
    minuto: ''
  });

  const [ minDesmontagem, setMinDesmontagem] = useState({
    minuto: ''
  });

  const [ minPeca, setMinPeca] = useState({
    minuto: ''
  });

  const [ minMontagem, setMinMontagem] = useState({
    minuto: ''
  });

  const [ fim, setFim] = useState({
    concat: ''
  });

  const [ minTotal, setMinTotal] = useState({
    minuto: 0
  });

  const [horaFim, setHoraFim] = useState({
    minuto: '',
  });


  const modalMaoObraTrue = useCallback(() => {
    setMaoObra({
      modal: true
    });

    listaMaoObraBD();
  }, []);

  const modalMaoObraFalse = useCallback(() => {
    setMaoObra({
      modal: false
    })
  }, []);


  const[tabelaMO, setTabelaMO] = useState<tabelaMOBD[]>([])
  
  const listaMaoObraBD = useCallback(async() => {
    const numOS =  (document.getElementById('numOSID') as HTMLInputElement).value;
    const tabela = await api.get(`/maoobrabd/${numOS}`);
    setTabelaMO(tabela.data);  
  },[])
    
  

  const chegadaQuery = useCallback(() => {
    const data = document.getElementById('dataChegadaId') as HTMLInputElement;
    const hora = document.getElementById('horaChegadaId') as HTMLInputElement;
    const valData = moment(data.value).format("MM/DD/YYYY");
    const valHora = hora.value;
    const concatenar = valData + ' ' + valHora;
    setChegada({
      concat: concatenar,
    });

    const valInput = new Date(concatenar);
    const inputMin = document.getElementById('diagnosticoID') as HTMLInputElement;
    const valInputMin = parseInt(inputMin.value);
    const minutosAdd = 60000 * valInputMin;
    const dataDiagnostico = new Date(valInput.getTime() + minutosAdd);
    const diagnostico = moment(dataDiagnostico).format("MM/DD/YYYY HH:mm:ss");
    setMinDiagnostico({
      minuto: diagnostico,
    });

    const DiagnosticoFim = new Date(diagnostico);
    const inputDesmontagem = document.getElementById('desmontagemID') as HTMLInputElement;
    const valDesmontagem = parseInt(inputDesmontagem.value);
    const minutosDesmontagem = 60000 * valDesmontagem;
    const calculoDesmontagem = new Date(DiagnosticoFim.getTime() + minutosDesmontagem);
    const desmontagem = moment(calculoDesmontagem).format("MM/DD/YYYY HH:mm:ss");
    setMinDesmontagem({
      minuto: desmontagem,
    });

    const DesmontagemFim = new Date(desmontagem);
    const inputPeca = document.getElementById('pecaID') as HTMLInputElement;
    const valPeca = parseInt(inputPeca.value);
    const minutosPeca = 60000 * valPeca;
    const calculoPeca = new Date(DesmontagemFim.getTime() + minutosPeca);
    const peca = moment(calculoPeca).format("MM/DD/YYYY HH:mm:ss");
    setMinPeca({
      minuto: peca,
    });

    const PecaFim = new Date(peca);
    const inputMontagem = document.getElementById('montagemID') as HTMLInputElement;
    const valMontagem = parseInt(inputMontagem.value);
    const minutosMontagem = 60000 * valMontagem;
    const calculoMontagem = new Date(PecaFim.getTime() + minutosMontagem);
    const montagem = moment(calculoMontagem).format("MM/DD/YYYY HH:mm:ss");
    setMinMontagem({
      minuto: montagem,
    });

    const dataFim = document.getElementById('dataFimID') as HTMLInputElement;
    const horaFim = document.getElementById('horaFimID') as HTMLInputElement;
    const valDataFim = moment(dataFim.value).format("MM/DD/YYYY");
    const valHoraFim = horaFim.value;
    const concatenarFim = valDataFim + ' ' + valHoraFim;
    setFim({
      concat: concatenarFim,
    });


    const resetarHoraFim = document.getElementById('horaFimID') as HTMLInputElement
    const val = resetarHoraFim.value=''

    const resetarTTR = document.getElementById('ttrID') as HTMLInputElement
    const valT = resetarTTR.value=''

  }, []);

  

  async function calcular(){
    const dataFim = document.getElementById('dataFimID') as HTMLInputElement;
    const horaFim = document.getElementById('horaFimID') as HTMLInputElement;
    const valDataFim = moment(dataFim.value).format("MM/DD/YYYY");
    const valHoraFim = horaFim.value;
    const concatenarFim = valDataFim + ' ' + valHoraFim;
    setFim({
      concat: concatenarFim,
    });
    const inicio = await document.getElementById('aberturaID') as HTMLInputElement;
    const fim = document.getElementById('fimID') as HTMLInputElement;
    const valInicio = new Date(inicio.value);
    const valFim = new Date(fim.value);
    const diferenca = moment(valFim, "MM/DD/YYYY HH:mm:ss").diff(moment(valInicio, "MM/DD/YYYY HH:mm:ss"));
    const minutos = moment.duration(diferenca).asMinutes();
    setMinTotal({
      minuto: minutos,
    })
    
    
  }


  async function buscaOcorrencia(num: string) {
    const registro = localStorage.getItem('@Manutencao:registro') || '';
    const nome = localStorage.getItem('@Manutencao:nome') || '';
    
    const informacoes = await api.get(`/atenderocorrencia/ocorrencia/${num}`);
    if(informacoes.data.col_tecnico === null || informacoes.data.col_tecnico === ''){
      setCampos({
        col_numos: informacoes.data.col_numos,
        col_data_abertura: informacoes.data.col_data_abertura,
        col_mi: informacoes.data.col_mi,
        col_problema: informacoes.data.col_problema,  
        col_tecnico: registro,    
        col_nome: nome,
        col_chegada: informacoes.data.col_chegada,
        col_diagnostico: informacoes.data.col_diagnostico,
        col_desmontagem: informacoes.data.col_desmontagem,
        col_peca: informacoes.data.col_peca,
        col_montagem: informacoes.data.col_montagem,
        col_fim: informacoes.data.col_fim,
        col_tipo: informacoes.data.col_tipo,
        col_natureza: informacoes.data.col_natureza,
        col_raiz: informacoes.data.col_raiz,
        col_atuacao: informacoes.data.col_atuacao,
        col_obs: informacoes.data.col_obs,
      });

      const chegada = moment(informacoes.data.col_chegada).format("MM/DD/YYYY HH:mm:ss");
      if(chegada === 'Invalid date'){
        setChegada({
          concat: ''
        });
      }else{
        setChegada({
          concat: chegada,
        });        
      }

      const diagnostico = moment(informacoes.data.col_diagnostico).format("MM/DD/YYYY HH:mm:ss");
      if (diagnostico === 'Invalid date'){
        setMinDiagnostico({
          minuto: ''
        });
      }else{
        setMinDiagnostico({
          minuto: diagnostico
        });
      }

      const desmontagem = moment(informacoes.data.col_desmontagem).format("MM/DD/YYYY HH:mm:ss");
      if(desmontagem === 'Invalid date'){
        setMinDesmontagem({
          minuto: ''
        });
      }else{
        setMinDesmontagem({
          minuto: desmontagem
        });
      }

      const peca = moment(informacoes.data.col_peca).format("MM/DD/YYYY HH:mm:ss");
      if(peca === 'Invalid date'){
        setMinPeca({
          minuto: ''
        });
      }else {
        setMinPeca({
          minuto: peca
        });    
      }

      const montagem = moment(informacoes.data.col_montagem).format("MM/DD/YYYY HH:mm:ss");
      if(montagem === 'Invalid date'){
        setMinMontagem({
          minuto: ''
        });
      }else {
        setMinMontagem({
          minuto: montagem
        });
      }

      const fimManute = moment(informacoes.data.col_fim).format("MM/DD/YYYY HH:mm:ss");
      if(montagem === 'Invalid date'){
        setFim({
          concat: ''
        });
      }else {
        setFim({
          concat: fimManute
        });
      }

      const dataChegada = document.getElementById('dataChegadaId') as HTMLInputElement;
      const chegadaInput = new Date(informacoes.data.col_chegada)
      if(chegada === 'Invalid date'){
      }else{
        dataChegada.value = chegadaInput.getFullYear() + '-' + ('0' + (chegadaInput.getMonth() + 1)).slice(-2) + '-' + ('0' + chegadaInput.getDate()).slice(-2);
      }

      const horaChegada = document.getElementById('horaChegadaId') as HTMLInputElement;
      const val = horaChegada.value= moment(informacoes.data.col_chegada).format("HH:mm");

      const dataFim = document.getElementById('dataFimID') as HTMLInputElement;
      const fimInput = new Date(informacoes.data.col_fim);
      if(montagem === 'Invalid date'){
      }else {
        dataFim.value = fimInput.getFullYear() + '-' + ('0' + (fimInput.getMonth() + 1)).slice(-2) + '-' + ('0' + fimInput.getDate()).slice(-2);
      }
      
      
      const horaFim = document.getElementById('horaFimID') as HTMLInputElement;
      horaFim.value = moment(informacoes.data.col_fim).format("HH:mm");

 //----------------------------------------- CAMPOS --------------------------------------------------
      const tipoInput = document.getElementById('tipoID') as HTMLInputElement;
      const naturezaInput = document.getElementById('naturezaID') as HTMLInputElement;
      const causaInput = document.getElementById('causaID') as HTMLInputElement;
      const trabalhoInput = document.getElementById('trabalhoID') as HTMLInputElement;
      const obsInput = document.getElementById('obsID') as HTMLInputElement;
      
      tipoInput.value = informacoes.data.col_tipo;
      naturezaInput.value = informacoes.data.col_natureza;
      causaInput.value = informacoes.data.col_raiz;
      trabalhoInput.value = informacoes.data.col_atuacao;
      obsInput.value = informacoes.data.col_obs;

//--------------------------------------------------------- CALCULOS ------------------------------
      const chegadaData = moment(informacoes.data.col_chegada).format("MM/DD/YYYY HH:mm:ss");
      const fimData= moment(informacoes.data.col_fim).format("MM/DD/YYYY HH:mm:ss");
      const valChegada = new Date(chegadaData);
      const valFim = new Date(fimData);
      const diffTTR = moment(valFim, "MM/DD/YYYY HH:mm:ss").diff(moment(valChegada, "MM/DD/YYYY HH:mm:ss"));
      const minTTR = moment.duration(diffTTR).asMinutes() + 10;
      setMinTotal({
        minuto: minTTR,
      })  
      
      const Diag = new Date(moment(informacoes.data.col_diagnostico).format("MM/DD/YYYY HH:mm:ss"));
      const diffDiag = moment(Diag, "MM/DD/YYYY HH:mm:ss").diff(moment(valChegada, "MM/DD/YYYY HH:mm:ss"));
      const minDiag = moment.duration(diffDiag).asMinutes();
      const diagInput = document.getElementById('diagnosticoID') as HTMLInputElement
      diagInput.value= minDiag+'';

      const desmont = new Date(moment(informacoes.data.col_desmontagem).format("MM/DD/YYYY HH:mm:ss"));
      const diffDesmont = moment(desmont, "MM/DD/YYYY HH:mm:ss").diff(moment(Diag, "MM/DD/YYYY HH:mm:ss"));
      const minDesmont = moment.duration(diffDesmont).asMinutes();
      const desmontInput = document.getElementById('desmontagemID') as HTMLInputElement;
      desmontInput.value = minDesmont+'';

      const pecas = new Date(moment(informacoes.data.col_peca).format("MM/DD/YYYY HH:mm:ss"));
      const diffPeca = moment(pecas, "MM/DD/YYYY HH:mm:ss").diff(moment(desmont, "MM/DD/YYYY HH:mm:ss"));
      const minPecas = moment.duration(diffPeca).asMinutes();
      const pecaInput = document.getElementById('pecaID') as HTMLInputElement;
      pecaInput.value = minPecas+'';
     
      const montag = new Date(moment(informacoes.data.col_montagem).format("MM/DD/YYYY HH:mm:ss"));
      const diffMontag = moment(montag, "MM/DD/YYYY HH:mm:ss").diff(moment(pecas, "MM/DD/YYYY HH:mm:ss"));
      const minMontag = moment.duration(diffMontag).asMinutes();
      const montagInput = document.getElementById('montagemID') as HTMLInputElement
      montagInput.value = minMontag+'';

    }else{
      setCampos({
        col_numos: informacoes.data.col_numos,
        col_data_abertura: informacoes.data.col_data_abertura,
        col_mi: informacoes.data.col_mi,
        col_problema: informacoes.data.col_problema,  
        col_tecnico: informacoes.data.col_tecnico,    
        col_nome: informacoes.data.col_nome,
        col_chegada: informacoes.data.col_chegada,
        col_diagnostico: informacoes.data.col_diagnostico,
        col_desmontagem: informacoes.data.col_desmontagem,
        col_peca: informacoes.data.col_peca,
        col_montagem: informacoes.data.col_montagem,
        col_fim: informacoes.data.col_fim,
        col_tipo: informacoes.data.col_tipo,
        col_natureza: informacoes.data.col_natureza,
        col_raiz: informacoes.data.col_raiz,
        col_atuacao: informacoes.data.col_atuacao,
        col_obs: informacoes.data.col_obs,
      });

      const chegada = moment(informacoes.data.col_chegada).format("MM/DD/YYYY HH:mm:ss");
      if(chegada === 'Invalid date'){
        setChegada({
          concat: ''
        });        
      }else{
        setChegada({
          concat: chegada,
        });        
      }

      const diagnostico = moment(informacoes.data.col_diagnostico).format("MM/DD/YYYY HH:mm:ss");
      if (diagnostico === 'Invalid date'){
        setMinDiagnostico({
          minuto: ''
        });
      }else{
        setMinDiagnostico({
          minuto: diagnostico
        });
      }
      
      const desmontagem = moment(informacoes.data.col_desmontagem).format("MM/DD/YYYY HH:mm:ss");
      if(desmontagem === 'Invalid date'){
        setMinDesmontagem({
          minuto: ''
        });
      }else{
        setMinDesmontagem({
          minuto: desmontagem
        });
      }

      const peca = moment(informacoes.data.col_peca).format("MM/DD/YYYY HH:mm:ss");
      if(peca === 'Invalid date'){
        setMinPeca({
          minuto: ''
        });
      }else {
        setMinPeca({
          minuto: peca
        });    
      }

      const montagem = moment(informacoes.data.col_montagem).format("MM/DD/YYYY HH:mm:ss");
      if(montagem === 'Invalid date'){
        setMinMontagem({
          minuto: ''
        });
      }else {
        setMinMontagem({
          minuto: montagem
        });
      }

      const fimManute = moment(informacoes.data.col_fim).format("MM/DD/YYYY HH:mm:ss");
      if(montagem === 'Invalid date'){
        setFim({
          concat: ''
        });
      }else {
        setFim({
          concat: fimManute
        });
      }

      const dataChegada = document.getElementById('dataChegadaId') as HTMLInputElement;
      const chegadaInput = new Date(informacoes.data.col_chegada);
      if(chegada === 'Invalid date'){
        
      }else{
        dataChegada.value = chegadaInput.getFullYear() + '-' + ('0' + (chegadaInput.getMonth() + 1)).slice(-2) + '-' + ('0' + chegadaInput.getDate()).slice(-2);
      }
      
      const horaChegada = document.getElementById('horaChegadaId') as HTMLInputElement;
      horaChegada.value= moment(informacoes.data.col_chegada).format("HH:mm");

      const dataFim = document.getElementById('dataFimID') as HTMLInputElement;
      const fimInput = new Date(informacoes.data.col_fim);
      if(montagem === 'Invalid date'){
      }else {
        dataFim.value = fimInput.getFullYear() + '-' + ('0' + (fimInput.getMonth() + 1)).slice(-2) + '-' + ('0' + fimInput.getDate()).slice(-2);
      }

      const horaFim = document.getElementById('horaFimID') as HTMLInputElement;
      horaFim.value = moment(informacoes.data.col_fim).format("HH:mm");
//----------------------------------------- CAMPOS --------------------------------------------------
      const tipoInput = document.getElementById('tipoID') as HTMLInputElement;
      const naturezaInput = document.getElementById('naturezaID') as HTMLInputElement;
      const causaInput = document.getElementById('causaID') as HTMLInputElement;
      const trabalhoInput = document.getElementById('trabalhoID') as HTMLInputElement;
      const obsInput = document.getElementById('obsID') as HTMLInputElement;

      tipoInput.value = informacoes.data.col_tipo;
      naturezaInput.value = informacoes.data.col_natureza;
      causaInput.value = informacoes.data.col_raiz;
      trabalhoInput.value = informacoes.data.col_atuacao;
      obsInput.value = informacoes.data.col_obs;
//--------------------------------------------------------- CALCULOS ------------------------------
      const chegadaData = moment(informacoes.data.col_chegada).format("MM/DD/YYYY HH:mm:ss");
      const fimData= moment(informacoes.data.col_fim).format("MM/DD/YYYY HH:mm:ss");
      const valChegada = new Date(chegadaData);
      const valFim = new Date(fimData);
      const diffTTR = moment(valFim, "MM/DD/YYYY HH:mm:ss").diff(moment(valChegada, "MM/DD/YYYY HH:mm:ss"));
      const minTTR = moment.duration(diffTTR).asMinutes() + 10;
      setMinTotal({
        minuto: minTTR,
      })  

      const Diag = new Date(moment(informacoes.data.col_diagnostico).format("MM/DD/YYYY HH:mm:ss"));
      const diffDiag = moment(Diag, "MM/DD/YYYY HH:mm:ss").diff(moment(valChegada, "MM/DD/YYYY HH:mm:ss"));
      const minDiag = moment.duration(diffDiag).asMinutes();
      const diagInput = document.getElementById('diagnosticoID') as HTMLInputElement
      diagInput.value= minDiag+'';

      const desmont = new Date(moment(informacoes.data.col_desmontagem).format("MM/DD/YYYY HH:mm:ss"));
      const diffDesmont = moment(desmont, "MM/DD/YYYY HH:mm:ss").diff(moment(Diag, "MM/DD/YYYY HH:mm:ss"));
      const minDesmont = moment.duration(diffDesmont).asMinutes();
      const desmontInput = document.getElementById('desmontagemID') as HTMLInputElement;
      desmontInput.value = minDesmont+'';

      const pecas = new Date(moment(informacoes.data.col_peca).format("MM/DD/YYYY HH:mm:ss"));
      const diffPeca = moment(pecas, "MM/DD/YYYY HH:mm:ss").diff(moment(desmont, "MM/DD/YYYY HH:mm:ss"));
      const minPecas = moment.duration(diffPeca).asMinutes();
      const pecaInput = document.getElementById('pecaID') as HTMLInputElement;
      pecaInput.value = minPecas+'';

      const montag = new Date(moment(informacoes.data.col_montagem).format("MM/DD/YYYY HH:mm:ss"));
      const diffMontag = moment(montag, "MM/DD/YYYY HH:mm:ss").diff(moment(pecas, "MM/DD/YYYY HH:mm:ss"));
      const minMontag = moment.duration(diffMontag).asMinutes();
      const montagInput = document.getElementById('montagemID') as HTMLInputElement
      montagInput.value = minMontag+'';
      
    };
 };

//autenticação ------------------------------------------------------------------------------------------------------------------------
  const [ info, setInfo ]= useState<inforUsuario>({
    area: '',
    nome: '',
    nivel: '',
    registro: '',
    subarea: '',
  });

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
      });
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
    };
  };

  const history = useHistory();
  function logOut(){
    localStorage.removeItem('@Manutencao:nome') ;
    localStorage.removeItem('@Manutencao:area'); 
    localStorage.removeItem('@Manutencao:nivel');
    localStorage.removeItem('@Manutencao:registro'); 
    localStorage.removeItem('@Manutencao:subarea');
    history.push('/');
  };
//autenticação ------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if( num !== undefined){
      buscaOcorrencia(num);
      inicioPagina(); 
    }    
  }, [num]);

  const formRef = useRef<FormHandles>(null);
  const { numOcorrencia } = useParams<{numOcorrencia: string}>();

  const submitForm = useCallback(async(data: interfaceRegistro) => {
    try{
      const inputOrdem = document.getElementById('aberturaID') as HTMLInputElement
      const valOrdem = moment(inputOrdem.value).format("MM/DD/YYYY");
      formRef.current?.setErrors({});
      
     /* const validacao = Yup.object().shape({
        col_chegadaInput: Yup.date().default(new Date(valOrdem)).min(valOrdem, `Necessario Data Maior que Data de Abertura`),
        horacol_chegada: Yup.string().required('Necessario Hora de Chegada'),
        col_tipo: Yup.string().required('Necessario Informar o Tipo da Manutenção'),
        col_natureza: Yup.string().required('Necessario Informar a Natureza da Manutenção'),
        col_raiz: Yup.string().required('Necessario Inormar o Tipo da Manutenção'),
        col_diagnostico: Yup.number().required('Insira os Minutos de Diagnostico'),
        col_desmontagem: Yup.number().required('Insira os Minutos de Desmontagem'),
        col_peca: Yup.number().required('Insira os Minutos de Captação de Peça'),
        col_montagem: Yup.number().required('Insira os Minutos de Montagem'),
        horacol_fim: Yup.string().required('Necessario Hora Fim'),
        col_atuacao: Yup.string().required('Necessario trabalho'),
      });
      
      await validacao.validate(data, {  
        abortEarly: false, 
      });*/
               
      const diag = (document.getElementById('diagnosticoID') as HTMLInputElement).value;
      const desm = (document.getElementById('desmontagemID') as HTMLInputElement).value;
      const peca = (document.getElementById('pecaID') as HTMLInputElement).value;
      const mont = (document.getElementById('montagemID') as HTMLInputElement).value;
      const aber = (document.getElementById('aberturaID') as HTMLInputElement).value;
      const cheg = (document.getElementById('chegadaHide') as HTMLInputElement).value;
      const fim = (document.getElementById('fimID') as HTMLInputElement).value;
      const monta = (document.getElementById('montID') as HTMLInputElement).value;
      const diffChegada = moment(cheg, "MM/DD/YYYY HH:mm:ss").diff(moment(aber, "MM/DD/YYYY HH:mm:ss"));
      const minChegada = moment.duration(diffChegada).asMinutes();
      const diffFim = moment(fim, "MM/DD/YYYY HH:mm:ss").diff(moment(monta, "MM/DD/YYYY HH:mm:ss"));
      const minFim = moment.duration(diffFim).asMinutes();

      if (minChegada < 0 ) {
        toast.error("Tempo de Chegada Inferior a Abertura da Ocorrência")
        return;
      }

      if (minFim < 0){
        toast.error("Tempo Fim Inferior ao Tempo das Ações")
        return;
      }

      const buffer = document.getElementById('bufferCheck') as HTMLInputElement;
      const checkBuffer = buffer.checked;
      
      const mbd = document.getElementById('MBDCheck') as HTMLInputElement;
      const checkMbd = mbd.checked

      var MBDReport = 'NAO';
      if(checkBuffer === true){
        MBDReport = 'SIM';
      }
      if(checkMbd === true){
        MBDReport = 'SIM';
      }
      const objMBDReport = JSON.parse(`{"col_MBD":"${MBDReport}"}`);
      const objStatus = JSON.parse(`{"col_status":"EM ANDAMENTO"}`);
       
      const chegadaData = moment((document.getElementById('chegadaHide') as HTMLInputElement).value).format("YYYY-MM-DD HH:mm");
      const diagnosticoData = moment((document.getElementById('diagnosticoHide') as HTMLInputElement).value).format("YYYY-MM-DD HH:mm");
      const desmontagemData = moment((document.getElementById('desmontagemHide') as HTMLInputElement).value).format("YYYY-MM-DD HH:mm");
      const pecaData = moment((document.getElementById('pecaHide') as HTMLInputElement).value).format("YYYY-MM-DD HH:mm");
      const montagemData = moment((document.getElementById('montID') as HTMLInputElement).value).format("YYYY-MM-DD HH:mm");
      const fimData = moment((document.getElementById('fimID') as HTMLInputElement).value).format("YYYY-MM-DD HH:mm");
      

      var varChegada = null;
      var varDiagnostico = null;
      var varDesmontagem = null;
      var varPeca = null;
      var varMontagem = null;
      var varFim = null;

      if (chegadaData === 'Invalid date'){
        varChegada = null;
      }else{
        varChegada = chegadaData;
      }

      if (diagnosticoData === 'Invalid date'){
        varDiagnostico = null;
      }else{
        varDiagnostico = diagnosticoData;
      }

      if (desmontagemData === 'Invalid date'){
        varDesmontagem = null;
      }else{
        varDesmontagem = desmontagemData;
      }

      if (pecaData === 'Invalid date'){
        varPeca = null;
      }else{
        varPeca = pecaData;
      }

      if (montagemData === 'Invalid date'){
        varMontagem = null;
      }else{
        varMontagem = montagemData;
      }

      if (fimData === 'Invalid date'){
        varFim = null;
      }else{
        varFim = fimData;
      }





      const chegadaBD = JSON.parse(`{"col_chegada":"${varChegada}"}`);
      const diagnosticoBD = JSON.parse(`{"col_diagnostico":"${varDiagnostico}"}`);
      const desmontagemBD = JSON.parse(`{"col_desmontagem":"${varDesmontagem}"}`);
      const pecaBD = JSON.parse(`{"col_peca":"${varPeca}"}`);
      const montagemBD = JSON.parse(`{"col_montagem":"${varMontagem}"}`);
      const fimBD = JSON.parse(`{"col_fim":"${varFim}"}`);


      const tecnicoVal = (document.getElementById('tecnicoID') as HTMLInputElement).value;
      const tecnicoBD = JSON.parse(`{"col_tecnico":"${tecnicoVal}"}`)
      const tipoVal = (document.getElementById('tipoID') as HTMLInputElement).value;
      const tipoBD = JSON.parse(`{"col_tipo":"${tipoVal}"}`)
      const naturezaVal = (document.getElementById('naturezaID') as HTMLInputElement).value;
      const naturezaBD = JSON.parse(`{"col_natureza":"${naturezaVal}"}`)
      const causaVal = (document.getElementById('causaID') as HTMLInputElement).value;
      const causaBD = JSON.parse(`{"col_raiz":"${causaVal}"}`)
      const atuacaoVal = (document.getElementById('trabalhoID') as HTMLInputElement).value;
      const atuacaoBD = JSON.parse(`{"col_atuacao":"${atuacaoVal}"}`)
      const obsVal = (document.getElementById('obsID') as HTMLInputElement).value;
      const obsBD = JSON.parse(`{"col_obs":"${obsVal}"}`)
      
      const upBD = {...chegadaBD, ...diagnosticoBD, ...desmontagemBD, ...pecaBD, ...montagemBD, ...fimBD, ...objMBDReport, ...objStatus, ...tecnicoBD, ...tipoBD, ...naturezaBD, ...causaBD, ...atuacaoBD, ...obsBD};

      const queryPUT = await api.put(`/atenderocorrencia/ocorrencia/${numOcorrencia}`, upBD).then((resposta) => {
        const respostaData = resposta.data;
        const osNum = respostaData['col_numos'];
        toast.info(`Ocorrência ${osNum} Salva!`);
      })

    }catch (err: any){
      if(err instanceof Yup.ValidationError){
        const erros = getValidationsErrors(err);
        formRef.current?.setErrors(erros);
        toast.error('Verifique os Campos Contornados em Vermelho')
        return;
      };
    };
  }, []);



  const [corInputReg, setCorInputReg] = useState({
    cor: '#000000',
  })

  const [corInputNome, setCorInputNome] = useState({
    cor: '#000000',
  })

  const [corTempo, setCorTempo] = useState({
    cor: '#000000',
  })

  



  const regMaoObra = useCallback(async() => {
    const registro = (document.getElementById('registroIDModal') as HTMLInputElement).value
    const nome = (document.getElementById('nomeIDModal') as HTMLInputElement).value

    const dataInicio = (document.getElementById('dataInicioModal') as HTMLInputElement).value
    const horaInicio = (document.getElementById('horaInicioModal') as HTMLInputElement).value
    const inicio = document.getElementById('inicioModal') as HTMLInputElement

    const dataFim = (document.getElementById('dataFimModal') as HTMLInputElement).value
    const horaFim = (document.getElementById('horaFimModal') as HTMLInputElement).value
    const fim = document.getElementById('fimModal') as HTMLInputElement
    const os = (document.getElementById('numOSID') as HTMLInputElement).value

    inicio.value = moment(dataInicio).format("MM/DD/YYYY") + ' ' + horaInicio;
    fim.value = moment(dataFim).format("MM/DD/YYYY") + ' ' + horaFim;
    
    const valInicio = new Date(inicio.value);
    const valFim = new Date(fim.value);
    const diferenca = moment(valFim, "MM/DD/YYYY HH:mm:ss").diff(moment(valInicio, "MM/DD/YYYY HH:mm:ss"));
    const minutos = moment.duration(diferenca).asMinutes();
    if(minutos >= 0 ){      
      setCorTempo({
        cor: '#000000',
      })
    }else{
      setCorTempo({
        cor: '#ff0000',
      })
      toast.error('Verifique Data e Hora');
      return;
    }  

    if(registro === ''){
      setCorInputReg({
        cor: '#ff0000',
      })
      toast.error('Informe um Registro');
      return;
    }else{
      setCorInputReg({
        cor: '#000000',
      })      
    }

    if(nome === ''){
      setCorInputNome({
        cor: '#ff0000',
      })
      toast.error('Registro Não Encontrado');
      return;
    }else{
      setCorInputNome({
        cor: '#000000',
      })
    }

    const dataInicioBD = moment(inicio.value).format("YYYY-MM-DD HH:mm");
    const dataFimBD = moment(fim.value).format("YYYY-MM-DD HH:mm");

    const regBD = JSON.parse(`{"col_registro":"${registro}"}`)
    const inicioBD = JSON.parse(`{"col_inicio":"${dataInicioBD}"}`)
    const fimBD = JSON.parse(`{"col_fim":"${dataFimBD}"}`)
    const osBD = JSON.parse(`{"col_numos":"${os}"}`)

    const object = {...regBD, ...inicioBD, ...fimBD, ...osBD};
    const valoresInput = await api.post('/maoobrabd', object);

    const numOS =  (document.getElementById('numOSID') as HTMLInputElement).value;
    const tabela = await api.get(`/maoobrabd/${numOS}`);
    setTabelaMO(tabela.data);  

    (document.getElementById('registroIDModal') as HTMLInputElement).value = '';
    (document.getElementById('nomeIDModal') as HTMLInputElement).value = '';
    (document.getElementById('dataInicioModal') as HTMLInputElement).value='';
    (document.getElementById('horaInicioModal') as HTMLInputElement).value='';
    (document.getElementById('dataFimModal') as HTMLInputElement).value='';
    (document.getElementById('horaFimModal') as HTMLInputElement).value='';
    (document.getElementById('inicioModal') as HTMLInputElement).value = '';    
    (document.getElementById('fimModal') as HTMLInputElement).value = '';
   
    


  },[])

  

  const focoInputReg = useCallback(() => {
    setCorInputReg({
      cor: '#ffa500',
    })
  }, [])
  const blurInputReg = useCallback(() => {
    setCorInputReg({
      cor: '#000000',
    })
    setCorInputNome({
      cor: '#000000',
    })
  }, [])


  const focoInputTempo = useCallback(() => {
    setCorTempo({
      cor: '#ffa500',
    })
  }, [])
  const blurInputTempo = useCallback(() => {
    setCorTempo({
      cor: '#000000',
    })
  }, [])

  

  const colaboradorMO = useCallback(async() => {
    const registro =  (document.getElementById('registroIDModal') as HTMLInputElement).value;
    const buscaColaborador = await api.get(`/maoobrabd/colaborador/${registro}`).then((response) => {
      const resposta = response.data;
      if(resposta != ''){
        const nomeResponse = resposta['col_nome']; 
        const nome = document.getElementById('nomeIDModal') as HTMLInputElement
        nome.value = nomeResponse;
      }  
    });
  }, [])

  

  



  

  return (  
    <Container>
      <BarraMenu>
        <a  onClick={logOut}><FiPower /></a>   
        <label>{info.nome}  -  {info.registro}</label>  
        <div className='infoUsuario'> 
          <input id='areaID' className='area' value={info.area} disabled />
          <input id='nomeID' className='nome' value={info.nome} disabled/>
          <input id='nivelID' className='nivel' value={info.nivel} disabled/>
          <input id='registroID' className='registro' value={info.registro} disabled/>
          <input id='subareaID' className='subarea' value={info.subarea} disabled/>
        </div>          
        <div className='temposDiv'>
          <input value={moment(campos.col_data_abertura).format("MM/DD/YYYY HH:mm:ss")} id='aberturaID' name='aberturaOcorrencia' className='a' type='text' disabled/>
          <input value={chegada.concat}  id='chegadaHide' name='col_chegada' className='a' type='text' disabled/>
          <input value={minDiagnostico.minuto} id='diagnosticoHide' name='col_diagnostico' className='b' type='text' disabled/>          
          <input value={minDesmontagem.minuto} id='desmontagemHide' name='col_desmontagem' className='c'type='text' disabled/>            
          <input value={minPeca.minuto} id='pecaHide' name='col_peca' className='d'type='text' disabled/>            
          <input value={minMontagem.minuto} id='montID' name='col_montagem' className='e'type='text' disabled/>
          <input value={fim.concat} id='fimID' name='col_fim' className='f'type='text' disabled/>
        </div>
      </BarraMenu>
      <MenuContent><ToastContainer theme="dark" position="top-right" pauseOnHover={false} autoClose={3500} closeOnClick={true} closeButton={false}/>
        <Form onSubmit={submitForm} ref={formRef} id='formA'>
          <div className='info'>
            <label>NUM OCORRÊNCIA:</label>
            <InputRef id='numOSID' className='numosdiv' name='numName'type='text' value={campos.col_numos} disabled/>
            <label>MI:</label>
            <InputRef  className='midiv' name='miName'type='text' defaultValue={campos.col_mi} disabled/>
            <label>DATA/HORA OCORRÊNCIA:</label>
            <InputRef id='aberturaIDInput' name='inicioName'type='text' value={moment(campos.col_data_abertura).format("DD/MM/YYYY HH:mm:ss")} disabled />
            <label>TECNICO RESPONSAVEL:</label>
            <InputRef className='tecnicoRegdiv' id='tecnicoID' value={campos.col_tecnico} name='col_tecnico'type='text' disabled />
            <InputRef className='tecnicoNomediv' value={campos.col_nome} name='tecnicoName'type='text' disabled/>
          </div>

          <div className='linha'/>

          <div className='infoProblem'>
            <label>INFO PROBLEMA:</label>
            <TextRefAlt name='problemaName'type='text' defaultValue={campos.col_problema} disabled/>
          </div>

          <div className='linha'/>

          <div className='infoManut'>
            <label>DATA CHEGADA:</label>
            <InputRefAlt onChange={chegadaQuery}  id='dataChegadaId' className='dataInput' name='col_chegadaInput' type='date'/>
            <label>HORA CHEGADA:</label>
            <InputRefAlt onChange={chegadaQuery} id='horaChegadaId' className='timeInput' name='horacol_chegada'type='time'/>
            <label>TIPO MANUTENÇÃO:</label>
            <SelectRefAlt id='tipoID' name='col_tipo'> 
              <option value=''></option>
              <option value='OPORTUNIDADE'>OPORTUNIDADE</option>
              <option value='NÃO MANUTENÇÃO'>NÃO MANUTENÇÃO</option>
              <option value='QUEBRA DE MAQUINA'>QUEBRA</option>
              <option value='MICRO PARADA'>MICRO PARADA</option>
              <option value='TAXA DE REFUGO'>TAXA DE REFUGO</option>
            </SelectRefAlt>
            <label>NATUREZA QUEBRA:</label>
            <SelectRefAlt id='naturezaID' name='col_natureza'>
              <option value=''></option>
              <option value='MECÂNICA'>MECÂNICA</option>
              <option value='ELETRÔNICA'>ELETRÔNICA</option>
              <option value='ELÉTRICA'>ELÉTRICA</option>
              <option value='HIDRÁULICA'>HIDRÁULICA</option>
              <option value='PNEUMÁTICA'>PNEUMÁTICA</option>
              <option value='INFORMÁTICA'>INFORMÁTICA</option>
            </SelectRefAlt>
            <label>POSSIVEL CAUSA:</label>
            <SelectRefAlt id='causaID' name='col_raiz'>
              <option value=''></option>
              <option value='CONDIÇÃO BÁSICA(PRODUÇÃO)'>CONDIÇÃO BÁSICA(PRODUÇÃO)</option>
              <option value='CONDIÇÃO BÁSICA(MANUTENÇÃO)'>CONDIÇÃO BÁSICA(MANUTENÇÃO)</option>
              <option value='DEFICIÊNCIA PROJETO'>DEFICIÊNCIA PROJETO</option>
              <option value='INFLUÊNCIA EXTERNA'>INFLUÊNCIA EXTERNA</option>
              <option value='COMPETÊNCIA OPERADOR'>COMPETÊNCIA OPERADOR</option>
              <option value='COMPETÊNCIA TÉCNICO'>COMPETÊNCIA TÉCNICO</option>
              <option value='OPERAÇÃO NÃO RESPEITADA'>OPERAÇÃO NÃO RESPEITADA</option>
              <option value='DEFICIENCIA DE PROJETO'>DEFICIENCIA DE PROJETO</option>
              <option value='FALTA DE MANUTENÇÃO'>FALTA DE MANUTENÇÃO</option>
            </SelectRefAlt>
          </div>

          <div className='linha'/>
          
          <div className='tempoDiv'>
            <label>TEMPO DE DIAGNOSTICO:</label>
            <InputRefAlt id='diagnosticoID' onChange={chegadaQuery} name='col_diagnostico'type='number' autoComplete='off'/>
            <label>TEMPO DE DESMONTAGEM:</label>
            <InputRefAlt id='desmontagemID' onChange={chegadaQuery} name='col_desmontagem'type='number' autoComplete='off'/>
            <label>TEMPO DE PEÇA:</label>
            <InputRefAlt id='pecaID' name='col_peca'type='number'onChange={chegadaQuery}  autoComplete='off'/>
            <label>TEMPO DE MONTAGEM:</label>
            <InputRefAlt id='montagemID' name='col_montagem'type='number' onChange={chegadaQuery} autoComplete='off'/>
           
            <div className='fimDiv'>
              <label>DATA FIM:</label>
              <InputRefAlt id='dataFimID' className='dataInput' name='fimDataName'type='date'/>
            </div>   
            <div className='horaFimDiv'>
              <label>HORA FIM:</label>
              <InputRefAlt  id='horaFimID' className='timeInput' onChange={calcular} name='horacol_fim'type='time'/>
            </div>         
          </div>
          
          <div className='fullTimeDiv'> 
            <label>IMPACTO BUFFER:</label>
            <div className='a'><input id='bufferCheck' name='col_maquinaparada'  type='checkbox'/></div>
            <label>REPORT MBD:</label>
            <div className='a'><input id='MBDCheck' name='col_maquinaparada'  type='checkbox'/></div>
            <div className='ttrDiv'>
              <label>TTR:</label>
              <InputRef id='ttrID' className='ttrInput' value={minTotal.minuto+'min'} name='ttr'type='text' disabled/> 
            </div>
          </div>

          <div className='linha'/>
          
          <div className='descricaoDiv'>
            <label>DESCRIÇÃO DO TRABALHO:</label>
            <TextRefAlt id='trabalhoID' name='col_atuacao'type='text' autoComplete='off'/>
            <label>OBSERVAÇÃO:</label>
            <TextRefAlt id='obsID' name='col_obs'type='text' autoComplete='off'/>
          </div>
          
          <div className='botaoDiv'>
            <Button>CANCELAR</Button>
            <Button type="submit">SALVAR</Button>
            <Button onClick={modalMaoObraTrue}>MÃO DE OBRA</Button>
            <Button>PEÇAS</Button>
            <Button>MFR</Button>
            <Button>FINALIZAR</Button>
          
          </div>          
        </Form>
      </MenuContent>
      {maoObra.modal ? 
          <Modal> 
            <div className='conteudoModal'>
              <div className='tituloModal'>
                <h1>MÃO DE OBRA</h1>
                <Button onClick={modalMaoObraFalse}>X</Button>
              </div> 
              <div className='lancamento'>
                <label>REGISTRO:</label>
                <input id='registroIDModal' onChange={colaboradorMO} autoComplete='off' onFocus={focoInputReg} onBlur={blurInputReg} style={{borderColor: corInputReg.cor}} className='a' type='text' />
                <input id='nomeIDModal' style={{borderColor: corInputNome.cor}} className='a'  type='text' disabled/>
                <label>INICIO:</label>
                <input id='dataInicioModal' onFocus={focoInputTempo} onBlur={blurInputTempo} style={{borderColor: corTempo.cor}} className='b' type='date'/>
                <input id='horaInicioModal' onFocus={focoInputTempo} onBlur={blurInputTempo} style={{borderColor: corTempo.cor}} className='c' type='time'/>
                <input id='inicioModal' className='dataInicioModal' disabled/>
                <label>FIM:</label>
                <input id='dataFimModal' onFocus={focoInputTempo} onBlur={blurInputTempo} style={{borderColor: corTempo.cor}} className='b' type='date'/>
                <input id='horaFimModal' onFocus={focoInputTempo} onBlur={blurInputTempo} style={{borderColor: corTempo.cor}} className='c' type='time'/> 
                <input id='fimModal' className='dataFimModal' disabled/>   
                <Button onClick={regMaoObra}>REGISTRAR</Button>            
              </div> 
              <div className='cadastrosDiv'>
              {tabelaMO.map(registro => (
                  <div className='listaDiv' key={registro.col_numos}>
                    <div className='conteudoLista'>
                      <label className='a'>TÉCNICO:</label>
                      <label className='b'>{registro.col_registro}</label>
                      <label className='c'>{registro.col_nome}</label>
                      <label className='a'>INICIO:</label>
                      <label>{moment(registro.col_inicio).format("DD/MM/YYYY")}-</label>
                      <label className='d'>{moment(registro.col_inicio).format("HH:mm")}</label>
                      <label className='a'>FIM:</label>
                      <label>{moment(registro.col_fim).format("DD/MM/YYYY")}-</label>
                      <label>{moment(registro.col_fim).format("HH:mm")}</label>
                      <FiTrash2 />
                    </div>
                    <div className='separacaoDiv'></div>
                  </div>
                  
                ))
              }
              </div>
            </div>
          </Modal> : null}
    </Container>
  );
}


//tabelaMO
export default atenderOcorrencia;