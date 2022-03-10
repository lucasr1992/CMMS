import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../componentes/Button/index';
import { Container, FormularioOcorrencia, BarraMenu } from './styles';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiArrowRight } from 'react-icons/fi';
import InputRef from '../../componentes/InputRef/index';
import TextRef from '../../componentes/TextAreaRef/index';
import getValidationsErrors from '../../utils/getValidationErrors';



interface cadastroInter{
  col_mi: string;
  col_problema: string;
  col_descricao: string;
}

interface maquinaInterface{
  col_linha: string;
  col_descricao: string;
}
interface operadorInterface{
  col_nome: string;
}

interface tipeItens{
  col_mi: string;
}





const Ocorrencia: React.FC = () => {  
//-------------------------------------------------------------------------------------------------------------------------------------------------
  const history = useHistory();
  function formatarDataBD(){
    const hoje = new Date();
    return moment(hoje).format("YYYY-MM-DD HH:mm");
  }

  function formatarData(){
    const hoje = new Date();
    return moment(hoje).format("DD/MM/YYYY");
  }

  function formatarHora(){
    const agora = new Date();
    return moment(agora).format("HH:mm");
  }

  function goBack() {
      history.push('/')   
      localStorage.setItem('@InfoPagOcorrencia:Valor', 'Cancelado')  
  }

  const [mibd, setMibd] = useState([] as Array<tipeItens>);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([] as Array<tipeItens>);
  
  useEffect(() => {
    const loadUsers = async() => {
      const response = await api.get('/cadastromaquinas');
      setMibd(response.data);      
    }
    
    loadUsers();
    formatarData();
    formatarHora();
    formatarDataBD();
  }, [])
//-------------------------------------------------------------------------------------------------------------------------------------------------



const [modelo, setModelo] = useState<maquinaInterface>({
  col_linha: '',
  col_descricao: '',
});






async function encontrarRegistro(text: string) {
  const resposta = await api.get(`/cadastromaquinas/${text}`);
  setModelo({
    col_linha: resposta.data.col_linha,
    col_descricao: resposta.data.col_descricao
  })  
  
}

async function blurEncontrar(text: string) {
  setModelo({
    col_linha: '',
    col_descricao: '',
  })
}

const [operador, setOperador] = useState<operadorInterface>({
  col_nome: '',
});


async function blurRegistro(text: string) {
  setOperador({
    col_nome: '',
  })
}

async function encontrarOperador(reg: any) {
  if(reg === ''){
    
  }else{
    blurRegistro(reg);
    const resposta = await api.get(`/cadastrocolaborador/one/${reg}`);
    setOperador({
      col_nome: resposta.data.col_nome,
    }) 
  }
}

const onSuggestHandler = (text: any) => {
  setText(text);
  setSuggestions([]);
  encontrarRegistro(text);
}

const onChangeHandler = (text: any) => {
  if (text.length>0){ 
    const matches = mibd.filter( user  => {
      const regex = new RegExp(`${text}`, 'ig');         
      return user.col_mi.match(regex);
    })
    setSuggestions(matches)   
  }  
  setText(text)
  blurEncontrar(text);
}

function resetarForm(){
  const resetForm = document.getElementById('formA') as HTMLFormElement;
  resetForm.reset();
}



const formRef = useRef<FormHandles>(null); // por causa do typescript preciso falar q o useRef vai usar a propriedades do FormHandles

const aoClicar = useCallback(async (data: cadastroInter, { reset }) => { // o data precisa dos campos que foi informado na interface, e o reset é para deixar enabled o resete de todos os campos do form
  try{
    formRef.current?.setErrors({});  // a propriedade do formRef vai dar setError vazio e vai mandar para o error do Input se ele ver que n ta preenchido o error ele apaga todos os erros da tela
    const registroInpput = document.getElementById('registroiD') as HTMLInputElement; 
    const valInput = registroInpput.value
    
    const validacao = Yup.object().shape({    // vou criar validação com o Yup ele vai ser um objeto pq vai ter varios campos e os campos que vão ser verificados são os shape
      col_mi: Yup.string().required('Necessario Identificar a Máquina'),  // nome do campo q vai ser verificado, e as necessidades
      col_problema: Yup.string().required('Necessario informar o Motivo da Ocorrência'),
      col_descricao: Yup.string().required('Maquina Não Encontrada'),
    })
    await validacao.validate(data, {   //aguardar a validação do yup, 
      abortEarly: false, // se tiver 4 campos verificados o abortEarly=false faz com que ele veja todos e não pare apenas no primeiro
    });
    
    const checkMaq = document.getElementById('maqCheck') as HTMLInputElement; // coletar valor do elemento com ID maqCheck e informar que vai ser usado como HTMLInputElement
    const isCheckedMaq = checkMaq.checked; // gravar em uma variavel do valor que estou procurando, no caso o valor se esta checked
    var valMaqCheck = 'NAO'; //tenho q setar uma nova variavel como var pq ela vai mudar de acordo com o valor do checked
    if(isCheckedMaq === true){ //faz a veridicação de esta true ou false 
      valMaqCheck = 'SIM'; // se estiver true vira sim
    }else{
      valMaqCheck = 'NAO'; // se estiver false vira não
    }   

    const objCheckMaq = JSON.parse(`{"col_maquinaparada":"${valMaqCheck}"}`) // transforma em JSON e guarda em uma constante
    const checkSeg = document.getElementById('segCheck') as HTMLInputElement; 
    const isCheckeSeg= checkSeg.checked; 
    var valSegCheck = 'NAO';
    if(isCheckeSeg === true){ 
      valSegCheck = 'SIM'; 
    }else{
      valSegCheck = 'NAO'; 
    }   
    const objCheckSeg = JSON.parse(`{"col_seguranca":"${valSegCheck}"}`)
    const hoje = new Date();
    const dataBD = moment(hoje).format("YYYY-MM-DD HH:mm");
    const objData = JSON.parse(`{"col_data_abertura":"${dataBD}"}`)
    const statusobj = JSON.parse(`{"col_status":"ABERTO"}`)
    var registro = '';
    if(valInput === "") {
      registro = '0';      
    }else {
      registro = valInput;
    }


    var object = ''
    if(valInput===''){
      object = {...objCheckMaq, ...data, ...objCheckSeg, ...objData, ...statusobj};
    }
    else{
      const registroBD = JSON.parse(`{"col_registro_operador": ${registro}}`)
      object = {...objCheckMaq, ...data, ...objCheckSeg, ...objData, ...statusobj, ...registroBD};
    }
     // cria um obijeto JSON concatenando dois objetos
   
    const valoresInput = await api.post('/novaocorrencia', object).then((response) => {
      const dadosResposta = response.data    
      const ValorOS = dadosResposta['col_numos']; 
      const valErr = dadosResposta['Erro'];      
      localStorage.setItem('@ErroOcorrencia', valErr)    
      localStorage.setItem('@InfoPagOcorrencia:NumOs', ValorOS)   ;
    });
    
    const ERRO = localStorage.getItem('@ErroOcorrencia')

    if (ERRO === 'Maquina em Manutenção' ){
      localStorage.removeItem('@ErroOcorrencia')
      toast.warning(`Maquina em Ocorrencia`)
      
    } else{
      localStorage.setItem('@InfoPagOcorrencia:Valor', 'Cadastrado') 
      history.push('/');
      localStorage.removeItem('@ErroOcorrencia')
    }
    

    
    //reset();  //resetar os inputs

  } catch (qualquer: any) { //posso dar o nome de qualquer coisa no parenteses
    if(qualquer instanceof Yup.ValidationError){
      const erros = getValidationsErrors(qualquer);
      formRef.current?.setErrors(erros);
      return;
    }
    
    
   toast.error(`Erro ao Registrar Ocorrência`)
    
    /*if (qualquer instanceof Yup.ValidationError) { //se qualquer for um erro validado pelo yup
      const mensagensErro: ErrosInterface = {}; // eu uso o interface para falar q eu tenho a key que é uma string essa key vem do nome do campo que foi validado pelo yup
      qualquer.inner.forEach((qualquer) => { // o valor do qualquer dentro do inner que é uma propriedade do formReference, vai passar por cada qualquer que foi validado como erro pelo yup
        if(qualquer.path) {  //se tiver o path ou seja o 'value' que vem do yup exemplo: campo Obrigatorio
          mensagensErro[qualquer.path] = qualquer.message; // mostrar a mensagem que vem do campo qualquer.path = qualquer.value ('campo obrigatorio')
        }
      });
      formRef.current?.setErrors(mensagensErro); // a propriedade do formRef vai dar setError no valor que veio do qualquer.path e vai mandar para o error do Input e mostra na tela
    }*/

    /*
    Posso trocar o código a cima do if até o formRef.current?.setErrors(mensagensErro);     }
    pela função que veio do utils: getValidationsErrors
    ficaria assim:
    const errosInput = getValidationsErrors(qualquer);  esse qualquer foi declarado no catch e estou falando que toda a funcionalidade desse erro vai do getValidationsErrors que vem do utils que eu criei
    formRef.current?.setErros(errosInput)  estou pegando a propriedade do formualrio .campo corrente = .current  a interrogação quer dizer q pode ou não ter um valor utiliso a propriedade do formRef que foi setado como useRef a propriedade setErrors e ele vai me setar o valor que veio do getValidationErros la do utils
    */
  }
}, [history, toast]);




const [ focoinput, setFocoinput] = useState(false); 

function perderFoco(){
  setSuggestions([])
  setFocoinput(false)
}

function codorna(){
  toast.info("OI Mayara")
}


const focoInput =useCallback(() => {
  setFocoinput(true)

}, [])






//console.log(status);


  return(
    <Container>
      <BarraMenu>
        <Link to='/'>HOME</Link>
      </BarraMenu>
      <FormularioOcorrencia><ToastContainer theme="dark" position="top-right" pauseOnHover={false} autoClose={2000} closeOnClick={true} closeButton={false}/>
        <Form onSubmit={aoClicar} ref={formRef} id='formA' >
          <div className='ocorrenciaDivClass'>
            <label>OCORRÊNCIA:</label>
            <div className='a'><input value={formatarData()}   placeholder='Data BD' disabled /></div>
            <div className='b'><input value={formatarHora()} placeholder='maquina parada sim' disabled/></div>
          </div>
          <div className='maquinaDivClass'>
            <label className='miLabel'>MI:</label>            
            <div className='a'><InputRef icon={FiArrowRight}  onFocus={() => {focoInput()}} onBlur={() => {setTimeout(() => {perderFoco()}, 100)}} autoComplete='off' name='col_mi' id='app' className='miInput'  placeholder='MI' onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e.target.value)}   value={text}  /></div>
            <label>LINHA:</label>
            <div className='b'><InputRef name='col_linha' value={modelo.col_linha} className='linhaInput' placeholder='LINHA' disabled /></div>
            <label>DESCRIÇÃO:</label>
            <div className='c'><InputRef name='col_descricao' value={modelo.col_descricao} className='descricaoInput' placeholder='DESCRICAO' disabled /></div>
          </div>
          <div className='containerS'>            
            {suggestions && suggestions.map((suggestion, i) =>                 
              <div key={i} className='sugestaoMi' onClick={() => onSuggestHandler(suggestion.col_mi)}  >
                {suggestion.col_mi}
              </div>                             
            )}
          </div>      
          <div className='problemaDiv'>
            <label>INF PROBLEMA:</label>
            <TextRef icon={FiArrowRight} name='col_problema' className='classTextArea'  placeholder='INFORMAÇÕES DA OCORRÊNCIA' />
          </div>
          <div className='EstadoDiv'>
            <label className='la'>MÁQUINA PARADA:</label>            
            <div className='a'><input id='maqCheck' name='col_maquinaparada'  type='checkbox'/></div>
            <label>RISCO SEGURANÇA:</label>
            <div className='b'><input id='segCheck' name='col_seguranca' type='checkbox'/></div>
          </div>
          <div className='operadorDiv'>
            <label>REGISTRO:</label>
            <div className='a'><InputRef autoComplete='off' id='registroiD' name='col_registro' onChange={(e: ChangeEvent<HTMLInputElement>) => encontrarOperador(e.target.value)} placeholder='Registro do Operador' /></div>
            <div className='b'><InputRef name='col_nome' value={operador.col_nome}  placeholder='Nome do Operador' disabled /></div>
          </div>
          <div className='botaoDiv'>
            <Button type="submit">CADASTRAR</Button>
            <Button onClick={goBack}>CANCELAR</Button>
            <Button onClick={resetarForm}>LIMPAR</Button>
          </div>
         <input onChange={codorna}></input>
        </Form>
      </FormularioOcorrencia>
    </Container>
  )
}; 
export default Ocorrencia;
