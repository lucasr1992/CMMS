import { request, response, Router } from "express";
import { EntityRepository, Repository, getCustomRepository,EntitySchema, getRepository } from "typeorm";
import cadastroMaquinastb from '../models/tb_Maquinas';

interface RequestInter{
  col_mi: string,
  col_descricao: string,
  col_linha: string,
  col_area: number,
  col_subarea: number,
  col_classificacao: string,
  col_fabricante: string,
  col_modelo: string,
  col_numserie: string,
  col_numativo: string,
  col_tipo: string,
  col_familia: string,
  col_valor: number,
  col_datacompra: Date,
  col_datasop: Date,
  col_dataregistro: Date,
  col_datarevisao: Date,
  col_dataproxrev: Date,
  col_datainstal: Date,
  col_datafabricacao: Date,
  col_datagarantia: Date,
  col_datarelatorio: Date,
  col_dataagendatreinamento: Date,
  col_datamanuais: Date,
  col_datadiagramaeletrico: Date,
  col_datadesenhos: Date,
  col_datacomponentes: Date,
  col_dataspareparts: Date,
  col_datasoftware: Date,
  col_datacalendariopm: Date,
  col_datacalendarioam: Date,
  col_datasmp: Date,
  col_status: string,
}


@EntityRepository(cadastroMaquinastb)
class MaquinasRepository extends Repository<cadastroMaquinastb> {
  public async findByDate(date: Date): Promise<cadastroMaquinastb | null>{
    const findMaquina = await this.findOne({
      where: { date },
    });

    return findMaquina || null;
  }
}


const maquinaRouter = Router();

maquinaRouter.get('/', async (request, response) => {
  const maquinasRepositoryy = getCustomRepository(MaquinasRepository);
  const maquina = await maquinasRepositoryy.find();
  return response.json(maquina);
});

maquinaRouter.get('/:mi', async (request, response) => {
  const { mi } = request.params
  const EncontrarMI = getCustomRepository(MaquinasRepository);
  const Encontrar = await EncontrarMI.findOne(mi);

  return response.json(Encontrar);
})

class CreateMaqService{
  public async execute({
    col_mi,
    col_descricao,
    col_linha,
    col_area,
    col_subarea,
    col_classificacao,
    col_fabricante,
    col_modelo,
    col_numserie,
    col_numativo,
    col_tipo,
    col_familia,
    col_valor,
    col_datacompra,
    col_datasop,
    col_dataregistro,
    col_datarevisao,
    col_dataproxrev,
    col_datainstal,
    col_datafabricacao,
    col_datagarantia,
    col_datarelatorio,
    col_dataagendatreinamento,
    col_datamanuais,
    col_datadiagramaeletrico,
    col_datadesenhos,
    col_datacomponentes,
    col_dataspareparts,
    col_datasoftware,
    col_datacalendariopm,
    col_datacalendarioam,
    col_datasmp,
    col_status,
   }: RequestInter): Promise <cadastroMaquinastb> {
    const MaqRepository = getRepository(cadastroMaquinastb);

    const checkUserExists = await MaqRepository.findOne({
      where: { col_mi },
    });

    if (checkUserExists) {

      throw new Error();

    } else {
      const user = MaqRepository.create({
        col_mi,
        col_descricao,
        col_linha,
        col_area,
        col_subarea,
        col_classificacao,
        col_fabricante,
        col_modelo,
        col_numserie,
        col_numativo,
        col_tipo,
        col_familia,
        col_valor,
        col_datacompra,
        col_datasop,
        col_dataregistro,
        col_datarevisao,
        col_dataproxrev,
        col_datainstal,
        col_datafabricacao,
        col_datagarantia,
        col_datarelatorio,
        col_dataagendatreinamento,
        col_datamanuais,
        col_datadiagramaeletrico,
        col_datadesenhos,
        col_datacomponentes,
        col_dataspareparts,
        col_datasoftware,
        col_datacalendariopm,
        col_datacalendarioam,
        col_datasmp,
        col_status,
      });
      await MaqRepository.save(user);

      return user;
    }

  }
}


maquinaRouter.post('/', async (request, response) => {
  try{
  const { col_mi,
    col_descricao,
  col_linha,
  col_area,
  col_subarea,
  col_classificacao,
  col_fabricante,
  col_modelo,
  col_numserie,
  col_numativo,
  col_tipo,
  col_familia,
  col_valor,
  col_datacompra,
  col_datasop,
  col_dataregistro,
  col_datarevisao,
  col_dataproxrev,
  col_datainstal,
  col_datafabricacao,
  col_datagarantia,
  col_datarelatorio,
  col_dataagendatreinamento,
  col_datamanuais,
  col_datadiagramaeletrico,
  col_datadesenhos,
  col_datacomponentes,
  col_dataspareparts,
  col_datasoftware,
  col_datacalendariopm,
  col_datacalendarioam,
  col_datasmp,
  col_status,
  } = request.body;

  const criarMaquina = new CreateMaqService();

  const maquina = await criarMaquina.execute({
    col_mi,
    col_descricao,
    col_linha,
    col_area,
    col_subarea,
    col_classificacao,
    col_fabricante,
    col_modelo,
    col_numserie,
    col_numativo,
    col_tipo,
    col_familia,
    col_valor,
    col_datacompra,
    col_datasop,
    col_dataregistro,
    col_datarevisao,
    col_dataproxrev,
    col_datainstal,
    col_datafabricacao,
    col_datagarantia,
    col_datarelatorio,
    col_dataagendatreinamento,
    col_datamanuais,
    col_datadiagramaeletrico,
    col_datadesenhos,
    col_datacomponentes,
    col_dataspareparts,
    col_datasoftware,
    col_datacalendariopm,
    col_datacalendarioam,
    col_datasmp,
    col_status,
  });

  return response.json(maquina);
} catch(err) {
  return response.status(400).json({  error: 'Erro no Cadastro'});
}
});

export default maquinaRouter;
