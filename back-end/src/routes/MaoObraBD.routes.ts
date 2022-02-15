import { EntityRepository, Repository, getCustomRepository, getRepository } from "typeorm";
import { Router, Request, Response } from 'express';
import tbCadastroColaborador from '../models/tb_Colaborador';
import tbCadastroOcorrencia  from '../models/tb_Ocorrencia';
import tbMaoObraBD from './../models/tb_MObraBD';
import AppError from '../errors/AppError';

const maoObraBD = Router();

@EntityRepository(tbMaoObraBD)
class repositorioMaoObraBD extends Repository<tbMaoObraBD> {
  public async findByDate(date: Date): Promise<tbMaoObraBD | null> {
    const maoObra = await this.findOne({
      where: { date },
    });
    return  maoObra || null;
  }
}



maoObraBD.get('/:osnum', async (requisicao: Request, resposta: Response) => {
  const { osnum } = requisicao.params;
  const listaMaoObra = await getRepository(tbMaoObraBD)
    .createQueryBuilder('listaMaoObra')
    .select('listaMaoObra.col_registro, colaboradorTB.col_nome, listaMaoObra.col_inicio, listaMaoObra.col_fim')
    .innerJoin(tbCadastroColaborador, 'colaboradorTB', 'colaboradorTB.col_registro = listaMaoObra.col_registro')
    .where('listaMaoObra.col_numos = :osnum', {osnum})
    .getRawMany();
  return resposta.json(listaMaoObra)
});

export default maoObraBD;
