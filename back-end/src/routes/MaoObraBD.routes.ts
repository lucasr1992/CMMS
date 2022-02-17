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
    .select('listaMaoObra.col_id, listaMaoObra.col_registro, colaboradorTB.col_nome, listaMaoObra.col_inicio, listaMaoObra.col_fim')
    .innerJoin(tbCadastroColaborador, 'colaboradorTB', 'colaboradorTB.col_registro = listaMaoObra.col_registro')
    .where('listaMaoObra.col_numos = :osnum', {osnum})
    .getRawMany();
  return resposta.json(listaMaoObra)
});


maoObraBD.get('/colaborador/:registro', async (requisicao: Request, resposta: Response) => {
  const { registro } = requisicao.params;
  const colaborador = await getRepository(tbCadastroColaborador)
  const Encontrar = await colaborador.findOne(registro);

  return resposta.json(Encontrar)
});



interface registroMOINter{
  col_registro: number;
  col_inicio: Date;
  col_fim: Date;
  col_numos: number;
}
export class CadastroMOService{
  public async execute({
    col_registro,
    col_inicio,
    col_fim,
    col_numos,
   }: registroMOINter): Promise <tbMaoObraBD> {
    const CadastroMORepository = getRepository(tbMaoObraBD);

    const Cadastrar = CadastroMORepository.create({
      col_registro,
      col_inicio,
      col_fim,
      col_numos,
    });
    await CadastroMORepository.save(Cadastrar);
    return Cadastrar;
  }
}
maoObraBD.post('/', async (request, response) => {
  const {
    col_registro,
    col_inicio,
    col_fim,
    col_numos,
  } = request.body;
  const cadastrarColaborador = new CadastroMOService();
  const Cadastrar = await cadastrarColaborador.execute({
    col_registro,
    col_inicio,
    col_fim,
    col_numos,
  });
  //delete Cadastrar.col_senha;
  return response.json(Cadastrar);
});


export class DeleteMOService{
  async execute(num: string){
   const DeletarMO = getRepository(tbMaoObraBD);
   if(!(await DeletarMO.findOne(num))){
      throw new AppError('Não existe', 400);
   }
   await DeletarMO.delete(num);
  }
}

maoObraBD.delete('/excluirmo/:num', async (request: Request, response:Response) => {
  const { num } = request.params
  const DeletarMO = new DeleteMOService();
  const Deletar = await DeletarMO.execute(num);
  return response.status(204).end();
});

export default maoObraBD;
