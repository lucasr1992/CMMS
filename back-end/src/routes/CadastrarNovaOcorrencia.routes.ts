import { getRepository, Repository, EntityRepository, createConnection, Connection, getConnection } from "typeorm";
import tbCadastroOcorrencia from '../models/tb_Ocorrencia';
import AppError from '../errors/AppError';
import { request, Request, Response, Router } from "express";

import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

@EntityRepository(tbCadastroOcorrencia)
class RepositorioOcorrencia extends Repository<tbCadastroOcorrencia> {
  public async findByDate(date: Date): Promise<tbCadastroOcorrencia | null> {
    const encontrarOcorrencia = await this.findOne({
      where: { date },
    });
    return  encontrarOcorrencia || null;
  }
}





interface camposOcorrencia{

  col_data_abertura: Date;
  col_mi: string;
  col_maquinaparada: string;
  col_seguranca: string;
  col_problema: string;
  col_registro_operador: number;
  col_status: string;
}

class CadastrarOcorrencia {
    public async execute({

      col_data_abertura,
      col_mi,
      col_maquinaparada,
      col_seguranca,
      col_problema,
      col_registro_operador,
      col_status,
    }: camposOcorrencia): Promise<tbCadastroOcorrencia>{
      const buscarNum = getRepository(tbCadastroOcorrencia);
      /*const verificacaoDuplicidade = await buscarNum.findOne({
        where: {col_numos},
      });
      if(verificacaoDuplicidade){
        throw new Error('Ja Existe esse Nome');
      }*/
      const salvarOcorrencia = buscarNum.create({

        col_data_abertura,
        col_mi,
        col_maquinaparada,
        col_seguranca,
        col_problema,
        col_registro_operador,
        col_status,


      });

      await buscarNum.save(salvarOcorrencia);
      return salvarOcorrencia;
    }
}

const abrirOcorrenciaRota = Router();

abrirOcorrenciaRota.post('/', async (requisicao: Request, resposta: Response) => {
  const{
    col_data_abertura,
    col_mi,
    col_maquinaparada,
    col_seguranca,
    col_problema,
    col_registro_operador,
    col_status,
  } = requisicao.body;

  const verificar = await getRepository(tbCadastroOcorrencia)
    .createQueryBuilder('listaOcorrencia')
    .select('listaOcorrencia.col_numos, listaOcorrencia.col_mi')
    .where('listaOcorrencia.col_status IN ("ABERTO", "EM ANDAMENTO") AND listaOcorrencia.col_mi = :col_mi', {col_mi})
    .getRawOne();


  if(verificar){
    const erro = JSON.parse(`{"Erro": "Maquina em Manutenção"}`)
    return resposta.json(erro);
    throw new AppError('Maquina Lancada', 400);
  }

  const cadastrarInter = new CadastrarOcorrencia();

  const cadastrar = await cadastrarInter.execute({
    col_data_abertura,
    col_mi,
    col_maquinaparada,
    col_seguranca,
    col_problema,
    col_registro_operador,
    col_status,
  });

  return resposta.json(cadastrar);
})



/*abrirOcorrenciaRota.post('/maximo', async(requisicao: Request, resposta: Response) => {
 const maximo  = await getRepository(tbCadastroOcorrencia)
                    .createQueryBuilder("user")
                    //.select("user.col_numos")
                    //.from(tbCadastroOcorrencia, "user")
                    .where("user.col_numos = :col_numos", { col_numos: 10005})
                    .getOne();

    console.log(maximo);
    return resposta.json(maximo);

    const maximo  = await getRepository(tbCadastroOcorrencia)
                    .createQueryBuilder("user")
                    .select('MAX(user.col_numos)', 'user_col_numos')
                    //.from(tbCadastroOcorrencia, "user")
                    //.where("user.col_numos = :col_numos", { col_numos: 10005})
                    .getRawOne();



    console.log(maximo);
    return resposta.json(maximo);
})*/

export default abrirOcorrenciaRota;

