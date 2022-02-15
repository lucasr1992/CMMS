import { Router } from "express";
import maquinaRouter from "./cadastroMaquinas.routes";
import CadastroColaboradorRouter from './CadastroColaborador.routes';
import abrirOcorrenciaRota from './CadastrarNovaOcorrencia.routes';
import autenticacaoDeUsuario from './Autenticacao.routes';
import RotasOcorrencia from './ListaStatusMaquina.routes';
import atenderOcorrencia from './AtenderOcorrencia.routes';
import maoObraBD from './MaoObraBD.routes';



const routes = Router();


routes.use('/cadastromaquinas', maquinaRouter);
routes.use('/cadastrocolaborador', CadastroColaboradorRouter);
routes.use('/novaocorrencia', abrirOcorrenciaRota);
routes.use('/logmanutencao', autenticacaoDeUsuario);
routes.use('/ocorrencias', RotasOcorrencia);
routes.use('/atenderocorrencia', atenderOcorrencia);
routes.use('/maoobrabd', maoObraBD);


export default routes;
