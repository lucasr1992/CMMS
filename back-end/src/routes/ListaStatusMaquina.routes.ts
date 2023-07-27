import { getRepository } from 'typeorm';
import tbCadastroOcorrencia  from '../models/tb_Ocorrencia';
import { Router, Request, Response } from 'express';
import tbArea from '../models/tb_area';
import cadastroMaquinastb from '../models/tb_Maquinas';
import tbSubarea from '../models/tb_subarea';


const RotasOcorrencia = Router();

RotasOcorrencia.get('/:areaID/:subareaID', async (requisicao: Request, resposta: Response) => {

  const { areaID, subareaID } = requisicao.params;

  
  const listaOcorrencia = await getRepository(tbCadastroOcorrencia)
    .createQueryBuilder('listaOcorrencia')
    .select('listaOcorrencia.col_numos, listaOcorrencia.col_mi, maquina.col_descricao,listaOcorrencia.col_data_abertura, listaOcorrencia.col_status, listaOcorrencia.col_maquinaparada, listaOcorrencia.col_seguranca, maquina.col_linha')
    .innerJoin(cadastroMaquinastb, 'maquina', 'maquina.col_mi = listaOcorrencia.col_mi')
    .innerJoin(tbSubarea, 'subarea', 'subarea.col_id_subarea = maquina.col_subarea')
    .innerJoin(tbArea, 'area', 'area.col_id_area = maquina.col_area')
    .where('listaOcorrencia.col_status IN ("ABERTO", "EM ANDAMENTO")')
    .getRawMany();


  return resposta.json(listaOcorrencia)


})


export default RotasOcorrencia;
