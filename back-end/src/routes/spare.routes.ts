import { Request, Response, Router } from "express";
import { EntityRepository, Repository, getCustomRepository, getRepository } from "typeorm";
import tbSpare from '../models/tb_Spare';
import AppError from '../errors/AppError';
import tbSpareBom from '../models/tb_SpareBOM';
import tbSpareKanBan from '../models/tb_SpareKanBan';


interface RequestInter{
  col_cod: string;
  col_base: string;
  col_descricao: string;
  col_grupo: string;
  col_registro: Date;
  col_revisao: Date;
  col_min: number;
  col_leadtime: number;
  col_preco: number;
  col_unidade: string;
  col_raridade: string;
  col_obsolecencia: string;
  col_estoque: number;
  col_max: number;
  col_ehs: string;
  col_qc: string;
  col_proxima_rev: Date;
  col_status: string;
}


@EntityRepository(tbSpare)
class SpareRepository extends Repository<tbSpare> {
  public async findByDate(date: Date): Promise<tbSpare | null>{
    const findMaquina = await this.findOne({
      where: { date },
    });

    return findMaquina || null;
  }
}


const spareRoute = Router();

spareRoute.get('/', async (request, response) => {
  const spareRepository = getCustomRepository(SpareRepository);
  const spare = await spareRepository.find();
  return response.json(spare);
});



spareRoute.get('/one/:spare', async (request, response) => {
  const { spare } = request.params
  const EncontrarSpare = getCustomRepository(SpareRepository);
  const Encontrar = await EncontrarSpare.findOne(spare);

  return response.json(Encontrar);
})

class CreateSpareService{
  public async execute({
    col_cod,
    col_base,
    col_descricao,
    col_grupo,
    col_registro,
    col_revisao,
    col_min,
    col_leadtime,
    col_preco,
    col_unidade,
    col_raridade,
    col_obsolecencia,
    col_estoque,
    col_max,
    col_ehs,
    col_qc,
    col_proxima_rev,
    col_status,
   }: RequestInter): Promise <tbSpare> {
    const MaqRepository = getRepository(tbSpare);

    const checkUserExists = await MaqRepository.findOne({
      where: { col_cod },
    });

    if (checkUserExists) {

      throw new Error();

    } else {
      const criar = MaqRepository.create({
        col_cod,
        col_base,
        col_descricao,
        col_grupo,
        col_registro,
        col_revisao,
        col_min,
        col_leadtime,
        col_preco,
        col_unidade,
        col_raridade,
        col_obsolecencia,
        col_estoque,
        col_max,
        col_ehs,
        col_qc,
        col_proxima_rev,
        col_status,
      });
      await MaqRepository.save(criar);

      return criar;
    }

  }
}


spareRoute.post('/', async (request, response) => {
  try{
  const {
    col_mi,
    col_cod,
    col_base,
    col_descricao,
    col_grupo,
    col_registro,
    col_revisao,
    col_min,
    col_leadtime,
    col_preco,
    col_unidade,
    col_raridade,
    col_obsolecencia,
    col_estoque,
    col_max,
    col_ehs,
    col_qc,
    col_proxima_rev,
    col_status,
  } = request.body;

  const criarSpare = new CreateSpareService();

  const spare = await criarSpare.execute({
    col_cod,
    col_base,
    col_descricao,
    col_grupo,
    col_registro,
    col_revisao,
    col_min,
    col_leadtime,
    col_preco,
    col_unidade,
    col_raridade,
    col_obsolecencia,
    col_estoque,
    col_max,
    col_ehs,
    col_qc,
    col_proxima_rev,
    col_status,
  });

  return response.json(spare);
} catch(err) {
  return response.status(400).json({  error: 'Erro no Cadastro'});
}
});




export class atualizaSpare{
  async execute({
    col_cod,
    col_base,
    col_descricao,
    col_grupo,
    col_registro,
    col_revisao,
    col_min,
    col_leadtime,
    col_preco,
    col_unidade,
    col_raridade,
    col_obsolecencia,
    col_estoque,
    col_max,
    col_ehs,
    col_qc,
    col_proxima_rev,
    col_status,
  }: RequestInter) {
   const atualizarSpare = getRepository(tbSpare);

   const encontrarSpare  = await atualizarSpare.findOne(col_cod);

   if (!encontrarSpare) {
     return new AppError("Não Existe");
   }

   encontrarSpare.col_cod = col_cod ? col_cod : encontrarSpare.col_cod;
   encontrarSpare.col_base = col_base ? col_base : encontrarSpare.col_base;
   encontrarSpare.col_descricao = col_descricao ? col_descricao : encontrarSpare.col_descricao;
   encontrarSpare.col_grupo = col_grupo ? col_grupo : encontrarSpare.col_grupo;
   encontrarSpare.col_registro = col_registro ? col_registro : encontrarSpare.col_registro;
   encontrarSpare.col_revisao = col_revisao ? col_revisao : encontrarSpare.col_revisao;
   encontrarSpare.col_min = col_min ? col_min : encontrarSpare.col_min;
   encontrarSpare.col_leadtime = col_leadtime ? col_leadtime : encontrarSpare.col_leadtime;
   encontrarSpare.col_preco = col_preco ? col_preco : encontrarSpare.col_preco;
   encontrarSpare.col_unidade = col_unidade ? col_unidade : encontrarSpare.col_unidade;
   encontrarSpare.col_raridade = col_raridade ? col_raridade : encontrarSpare.col_raridade;
   encontrarSpare.col_obsolecencia = col_obsolecencia ? col_obsolecencia : encontrarSpare.col_obsolecencia;
   encontrarSpare.col_estoque = col_estoque ? col_estoque : encontrarSpare.col_estoque;
   encontrarSpare.col_max = col_max ? col_max : encontrarSpare.col_max;
   encontrarSpare.col_ehs = col_ehs ? col_ehs : encontrarSpare.col_ehs;
   encontrarSpare.col_qc = col_qc ? col_qc : encontrarSpare.col_qc;
   encontrarSpare.col_proxima_rev = col_proxima_rev ? col_proxima_rev : encontrarSpare.col_proxima_rev;
   encontrarSpare.col_status = col_status ? col_status : encontrarSpare.col_status;


   await atualizarSpare.save(encontrarSpare);
   return encontrarSpare;
  };
};

spareRoute.put('/edit/:cod', async (requisicao: Request, resposta: Response) => {
  const { cod_spare } = requisicao.params;
  const {
    col_cod,
    col_base,
    col_descricao,
    col_grupo,
    col_registro,
    col_revisao,
    col_min,
    col_leadtime,
    col_preco,
    col_unidade,
    col_raridade,
    col_obsolecencia,
    col_estoque,
    col_max,
    col_ehs,
    col_qc,
    col_proxima_rev,
    col_status,
  } = requisicao.body;

  const atualizarSpare = new atualizaSpare();
  const Atualizar = await atualizarSpare.execute({
    col_cod,
    col_base,
    col_descricao,
    col_grupo,
    col_registro,
    col_revisao,
    col_min,
    col_leadtime,
    col_preco,
    col_unidade,
    col_raridade,
    col_obsolecencia,
    col_estoque,
    col_max,
    col_ehs,
    col_qc,
    col_proxima_rev,
    col_status,
  })
  return resposta.json(Atualizar);
});





spareRoute.post('/bom/:mi', async (requisicao: Request, resposta: Response) => {
  const { mi } = requisicao.params;
  const spareBOM = await getRepository(tbSpareBom)
    .createQueryBuilder('sparebom')
    .select('sparebom.*' )
    .where('sparebom.col_maquina = :mi', {mi})
    .getRawMany();


  return resposta.json(spareBOM);
})

spareRoute.get('/kaban/:cod', async (requisicao: Request, resposta: Response) => {
  const { cod } = requisicao.params;
  const spareKaban = await getRepository(tbSpareKanBan)
    .createQueryBuilder('spareKaban')
    .select('spareKaban.*' )
    .where('spareKaban.col_maquina = :mi', {cod})
    .getRawMany();


  return resposta.json(spareKaban);
})

export default spareRoute;
