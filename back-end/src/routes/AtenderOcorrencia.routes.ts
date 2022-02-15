import { EntityRepository, Repository, getCustomRepository, getRepository } from "typeorm";
import { Router, Request, Response } from 'express';
import tbCadastroColaborador from '../models/tb_Colaborador';
import tbCadastroOcorrencia  from '../models/tb_Ocorrencia';
import AppError from '../errors/AppError';




interface atualizarInterface{
    col_numos: number;
    col_tecnico: number;
    col_tipo: string;
    col_natureza: string;
    col_raiz: string;
    col_atuacao: string;
    col_obs: string;
    col_chegada: Date;
    col_diagnostico: Date;
    col_desmontagem: Date;
    col_peca: Date;
    col_montagem: Date;
    col_fim: Date;
    col_status: string;
    col_MBD: string;
}

const atenderOcorrencia = Router()

@EntityRepository(tbCadastroOcorrencia)
class repositorioOcorrencia extends Repository<tbCadastroOcorrencia> {
  public async findByDate(date: Date): Promise<tbCadastroOcorrencia | null> {
    const ocorrencia = await this.findOne({
      where: { date },
    });
    return  ocorrencia || null;
  }
}


atenderOcorrencia.get('/ocorrencia/:num', async (requisicao: Request, resposta: Response) => {
  const { num } = requisicao.params;
  const ocorrenciaAtender = await getRepository(tbCadastroOcorrencia)
    .createQueryBuilder('ocorrencia')
    .select('ocorrencia.*, colaborador.col_nome' )
    .leftJoin(tbCadastroColaborador, 'colaborador', 'colaborador.col_registro = ocorrencia.col_tecnico')
    .where('ocorrencia.col_numos = :num', {num})
    .getRawOne();


  return resposta.json(ocorrenciaAtender);
});


export class atualizacaoocorrencia{
  async execute({
    col_numos,
    col_tecnico,
    col_tipo,
    col_natureza,
    col_raiz,
    col_atuacao,
    col_obs,
    col_chegada,
    col_diagnostico,
    col_desmontagem,
    col_peca,
    col_montagem,
    col_fim,
    col_status,
    col_MBD,
  }: atualizarInterface) {
   const atualizarOcorrencia = getRepository(tbCadastroOcorrencia);

   const encontrarOcorrencia  = await atualizarOcorrencia.findOne(col_numos);

   if (!encontrarOcorrencia) {
     return new AppError("Não Existe");
   }

   encontrarOcorrencia.col_tecnico = col_tecnico ? col_tecnico : encontrarOcorrencia.col_tecnico;
   encontrarOcorrencia.col_tipo = col_tipo ? col_tipo : encontrarOcorrencia.col_tipo;
   encontrarOcorrencia.col_natureza = col_natureza ? col_natureza : encontrarOcorrencia.col_natureza;
   encontrarOcorrencia.col_raiz = col_raiz ? col_raiz : encontrarOcorrencia.col_raiz;
   encontrarOcorrencia.col_atuacao = col_atuacao ? col_atuacao : encontrarOcorrencia.col_atuacao;
   encontrarOcorrencia.col_obs = col_obs ? col_obs : encontrarOcorrencia.col_obs;
   encontrarOcorrencia.col_chegada = col_chegada ? col_chegada : encontrarOcorrencia.col_chegada;
   encontrarOcorrencia.col_diagnostico = col_diagnostico ? col_diagnostico : encontrarOcorrencia.col_diagnostico;
   encontrarOcorrencia.col_desmontagem = col_desmontagem ? col_desmontagem : encontrarOcorrencia.col_desmontagem;
   encontrarOcorrencia.col_peca = col_peca ? col_peca : encontrarOcorrencia.col_peca;
   encontrarOcorrencia.col_montagem = col_montagem ? col_montagem : encontrarOcorrencia.col_montagem;
   encontrarOcorrencia.col_fim = col_fim ? col_fim : encontrarOcorrencia.col_fim;
   encontrarOcorrencia.col_status = col_status ? col_status : encontrarOcorrencia.col_status;
   encontrarOcorrencia.col_MBD = col_MBD ? col_MBD : encontrarOcorrencia.col_MBD;

   await atualizarOcorrencia.save(encontrarOcorrencia);
   return encontrarOcorrencia;
  };
};

atenderOcorrencia.put('/ocorrencia/:num', async (requisicao: Request, resposta: Response) => {
  const { numOs } = requisicao.params;
  const {
    col_numos,
    col_tecnico,
    col_tipo,
    col_natureza,
    col_raiz,
    col_atuacao,
    col_obs,
    col_chegada,
    col_diagnostico,
    col_desmontagem,
    col_peca,
    col_montagem,
    col_fim,
    col_status,
    col_MBD,
  } = requisicao.body;

  const atualizarOcorrencia = new atualizacaoocorrencia();
  const Atualizar = await atualizarOcorrencia.execute({
    col_numos,
    col_tecnico,
    col_tipo,
    col_natureza,
    col_raiz,
    col_atuacao,
    col_obs,
    col_chegada,
    col_diagnostico,
    col_desmontagem,
    col_peca,
    col_montagem,
    col_fim,
    col_status,
    col_MBD,
  })
  return resposta.json(Atualizar);
});



export default atenderOcorrencia;
