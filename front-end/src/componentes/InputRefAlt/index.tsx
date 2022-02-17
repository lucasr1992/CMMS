import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from "react"; // useRef vai buscar o valor de referencia dentro de um input ou de uma textarea
import {  useField } from "@unform/core";  // useField Conecta o input com o unform
import { Container, Errodiv } from './styles';
import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';
import { ToastContainer, toast } from 'react-toastify';


interface PropriedadesInput extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

// a interface é por causa do typescript para dizer q o name é string e que ele usa os atibutos de um HTMLInputElement



const InputRefAlt: React.FC<PropriedadesInput> = ({ name, icon: Icon, ...rest}) => {  //o useField precisa de uma referencia dentro do input para saber qual o campo ele vai tratar, etou usando o "name", e o ...rest é para pegar qualquer tipo de informação que vem do input tipo password, email, etc
  const inputValue = useRef<HTMLInputElement>(null); // por causa do Typescript preciso informar q o useRef vai usar as propriedades do <HTMLInputElement>
  const { fieldName, registerField, defaultValue, error } = useField(name); // mostrar que o "name" vai ser usado, o useField eu desestruturei e os campos { } são os que vai ser necessario preencher esse name vem la do input como um id para referenciar o campo
  const [ focoinput, setFocoinput] = useState(false); // o valor do foco começa como (false)
  const [ preenchidoinput, setPreenchidoinput ] = useState(false);

  useEffect(() => {
    registerField({ //o registerFiel precisa de alguns campos obrigatorios para ele registrar os valores dos input ou textarea
      name: fieldName,   //nome do input
      ref: inputValue.current, //o input referencia que vai usar o useRef para pegar essa referencia
      path: 'value' // o que eu quero tirar da referencia, o 'value'
    })
  }, [fieldName, registerField]); 

 
  const perderFoco = useCallback(() => {
    setFocoinput(false);
    
    

    /*if (inputValue.current?.value){
      setPreenchidoinput(true);
    }else {
      setPreenchidoinput(false);
    }*/

    //o if a cima é igual a setPreenchidoinput(!!inputValue.current?.value)  vai setar o setPreenchido com true ou false q é o valor que vem do .value  que é possivel pq o inputValue esta tipado com HTMLInputElement

    //setPreenchidoinput(!!inputValue.current?.value)   o sinal !! transforma o valor em true ou false então se tem valor = true se n tem valor = false
  }, [])

  const comFoco = useCallback(() => {
    setFocoinput(true)
  }, [])


  return(
  <Container className="BordaInputRef" campoErradoEstilo={!!error} focoinputEstilo={focoinput} > {/*preenchidoinput={preenchidoinput}*/}  {/* focoinput precisa ser declarado no style na interface e falar que o Container usa a interface*/}
   
   {Icon && <Icon size={20} />} 
    <input     
    onFocus={comFoco}  /* quando o input tiver com foco onFocus ele chama a função {}*/
    onBlur={perderFoco} /* quando o input perder o foco onBlur chama a função {}*/
    ref={inputValue} 
    defaultValue={defaultValue} 
    {...rest}/>  {/*//o defaultValue vai servir para se eu quiser setar um falor padrão de inicio para o input, exemplo quero que quando abra a pagina aparece a data value={dateNow}.*/}
     
    
  </Container>
  );
}

export default InputRefAlt;