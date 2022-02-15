
import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;  //essa key no meio de [] quer dizer que ele vai vir qualquer nome de campo e quantos campos precisar, sem ter um numero ou nome fixo, mas que todos esses campos precisão ser string
}

export default function getValidationErrors(err: ValidationError): Errors {   // err: ValidationError esse ValidationError vem do Yup, para fazer com q ele memostre as propriedades do setError do formulario então estou atribuindo q err é igual a ValidationError e que a estrutura vai ser igual a interface Error
    const validationErrors: Errors = {};

   
        err.inner.forEach((error) => {   //o err. vai puxar uma propriedade do ValidationError que veio do Yup que é o inner que são os valores internos desse ValidationError, então ele pede para passar por cada um usando a propriedade tambem do ValidationError do Yup o .forEach e assim eu falor que esse err.inner.forEach vai estr em (erro) para não ter q escrever err.inner.forEach tudo de novo  
            if (error.path) {
                validationErrors[error.path] = error.message;  // a constante validationErrors vai pegar o caminho de cada erro como se pegasse o JSON dela "nomeErro:" usando [error.path] que é a mesma coisa de err.inner.forEach.path e vai atribuir o valor de cada um dos erros que veio usando o error.message que é igual a err.inner.forEach,message enão sera  error.path = error.message  ("nomeErro" : "Falta o Usuario")
            }
        });
    
    return validationErrors; //joga pra quem pegar o valor que foi criado!
}