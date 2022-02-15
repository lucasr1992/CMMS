import { Request, Response, Router } from "express";
import { EntityRepository, Repository, getCustomRepository, getRepository } from "typeorm";
import tbCadastroColaborador from "../models/tb_Colaborador";
import uploadConfig from '../config/upload';
import multer from "multer";
import AppError from '../errors/AppError';
import { hash } from 'bcryptjs';
import path from 'path';
import fs from 'fs';


interface RequestInter{
  col_registro: number,
  col_nome: string,
  col_senha: string,
  col_turno: string,
  col_area: number,
  col_nivel_acesso: number,
  col_cargo: string,
  col_data_registro: Date,
  col_revisao: Date,
  col_status: string,
  col_foto: string,
  col_email: string;
  col_contato: string;
}


interface RequestUp{
  registro: string,
  col_nome: string,
  col_senha: string,
  col_turno: string,
  col_area: number,
  col_nivel_acesso: number,
  col_cargo: string,
  col_data_registro: Date,
  col_revisao: Date,
  col_status: string,
  col_foto: string,
  col_email: string;
  col_contato: string;
}

interface ResquestFoto{
  registro: string;
  nomeFoto: string;
}


@EntityRepository(tbCadastroColaborador)
class CadastroColaboradorRepositorio extends Repository<tbCadastroColaborador> {
  public async findByDate(date: Date): Promise<tbCadastroColaborador | null>{
    const findColaborador = await this.findOne({
      where: { date } ,
    });

    return findColaborador || null;
  }
}

const CadastroColaboradorRouter = Router();
const upload = multer(uploadConfig);

/*
export class EncontrarColaboradorService{
  async execute(registro: string){
   const EncontrarColaborador = getRepository(tbCadastroColaborador);

   if(!(await EncontrarColaborador.findOne(registro))){
      throw new AppError('Não existe', 400);
   }

   return EncontrarColaborador;
  }
}
*/


CadastroColaboradorRouter.get('/List', async (request, response) => {
  const CadastroColaboradorRepository = getCustomRepository(CadastroColaboradorRepositorio);
  const CadastroColaborador = await CadastroColaboradorRepository.find();
  return response.json(CadastroColaborador);
});

export class DeleteColaboradorService{
  async execute(registro: string){
   const DeletarColaborador = getRepository(tbCadastroColaborador);

   if(!(await DeletarColaborador.findOne(registro))){
      throw new AppError('Não existe', 400);
   }

   await DeletarColaborador.delete(registro);
  }
}

CadastroColaboradorRouter.delete('/:registro', async (request: Request, response:Response) => {
  const { registro } = request.params
  const DeletarColaborador = new DeleteColaboradorService();
  const Deletar = await DeletarColaborador.execute(registro);
  return response.status(204).end();
});

export class CadastroColaboradorService{
  public async execute({
    col_registro,
    col_nome,
    col_senha,
    col_turno,
    col_area,
    col_nivel_acesso,
    col_cargo,
    col_data_registro,
    col_revisao,
    col_status,
    col_foto,
    col_email,
    col_contato,
   }: RequestInter): Promise <tbCadastroColaborador> {
    const CadastroColaboradorRepository = getRepository(tbCadastroColaborador);

    const checkColaboradorExists = await CadastroColaboradorRepository.findOne({
      where: { col_registro },
    });

    if (checkColaboradorExists) {
      console.log('Esse Registro ja Existe!');
      throw new AppError('Esse Registro ja Existe!', 400);

    }

    const hashedSenha = await hash(col_senha, 8);

    const Cadastrar = CadastroColaboradorRepository.create({
      col_registro,
      col_nome,
      col_senha,
      col_turno,
      col_area,
      col_nivel_acesso,
      col_cargo,
      col_data_registro,
      col_revisao,
      col_status,
      col_foto,
      col_email,
      col_contato,
    });


    await CadastroColaboradorRepository.save(Cadastrar);

    return Cadastrar;
  }

}
CadastroColaboradorRouter.post('/', async (request, response) => {
  const {
    col_registro,
    col_nome,
    col_senha,
    col_turno,
    col_area,
    col_nivel_acesso,
    col_cargo,
    col_data_registro,
    col_revisao,
    col_status,
    col_foto,
    col_email,
    col_contato,
  } = request.body;



  const cadastrarColaborador = new CadastroColaboradorService();


  const Cadastrar = await cadastrarColaborador.execute({
    col_registro,
    col_nome,
    col_senha,
    col_turno,
    col_area,
    col_nivel_acesso,
    col_cargo,
    col_data_registro,
    col_revisao,
    col_status,
    col_foto,
    col_email,
    col_contato,
  });

  //delete Cadastrar.col_senha;
  return response.json(Cadastrar);
});

CadastroColaboradorRouter.get('/one/:registro', async (request, response) => {
  const { registro } = request.params
  const EncontrarColaborador = getCustomRepository(CadastroColaboradorRepositorio);
  const Encontrar = await EncontrarColaborador.findOne(registro);

  return response.json(Encontrar);
})

export class AtualizarColaboradorService{
  async execute({
    registro,
    col_nome,
    col_senha,
    col_turno,
    col_area,
    col_nivel_acesso,
    col_cargo,
    col_data_registro,
    col_revisao,
    col_status,
    col_foto,
    col_email,
    col_contato,
  }: RequestUp) {
   const AtualizarrColaborador = getRepository(tbCadastroColaborador);

   const EncontraRegistro = await AtualizarrColaborador.findOne(registro);

   if (!EncontraRegistro) {
     return new AppError("Não Existe");
   }

   const hashedSenha = await hash(col_senha, 8);

   EncontraRegistro.col_nome = col_nome ? col_nome : EncontraRegistro.col_nome;
   EncontraRegistro.col_senha = hashedSenha //? col_senha : EncontraRegistro.col_senha;
   EncontraRegistro.col_turno = col_turno ? col_turno : EncontraRegistro.col_turno;
   EncontraRegistro.col_area = col_area ? col_area : EncontraRegistro.col_area;
   EncontraRegistro.col_cargo = col_cargo ? col_cargo : EncontraRegistro.col_cargo;
   EncontraRegistro.col_data_registro = col_data_registro ? col_data_registro : EncontraRegistro.col_data_registro;
   EncontraRegistro.col_revisao = col_revisao ? col_revisao : EncontraRegistro.col_revisao;
   EncontraRegistro.col_status = col_status ? col_status : EncontraRegistro.col_status;
   EncontraRegistro.col_foto = col_foto ? col_foto : EncontraRegistro.col_foto;
   EncontraRegistro.col_email = col_email ? col_email : EncontraRegistro.col_email;
   EncontraRegistro.col_contato = col_contato ? col_contato : EncontraRegistro.col_contato;


   await AtualizarrColaborador.save(EncontraRegistro);
   return EncontraRegistro;

  }
}

CadastroColaboradorRouter.put('/up/:registro', async (request, response) => {
  const { registro } = request.params;
  const {
    col_nome,
    col_senha,
    col_turno,
    col_area,
    col_nivel_acesso,
    col_cargo,
    col_data_registro,
    col_revisao,
    col_status,
    col_foto,
    col_email,
    col_contato,
  } = request.body;

  const AtualizarColaborador = new AtualizarColaboradorService();
  const Atualizar = await AtualizarColaborador.execute({
    registro,
    col_nome,
    col_senha,
    col_turno,
    col_area,
    col_nivel_acesso,
    col_cargo,
    col_data_registro,
    col_revisao,
    col_status,
    col_foto,
    col_email,
    col_contato,
  })

  return response.json(Atualizar);


})








/* export class AtualizarOperadorFotoService {
  public async execute({ registro, nomeFoto  }: ResquestFoto) {

    const CadastroFotoColaborador = getRepository(tbCadastroColaborador);
    const ColaboradorFoto = await CadastroFotoColaborador.findOne(registro);

    if (!ColaboradorFoto) {

      throw new AppError('Não Existe esse Registroooo', 401);
    }


    if(ColaboradorFoto.col_foto) {

      const ColaboradorFotoCaminho = path.join(uploadConfig.directory, ColaboradorFoto.col_foto);

      const ColaboradorFotoExiste = await fs.promises.stat(ColaboradorFotoCaminho);

      if(ColaboradorFotoExiste) {

        await fs.promises.unlink(ColaboradorFotoCaminho);
      }
    }


    ColaboradorFoto.col_foto=nomeFoto;
    await CadastroFotoColaborador.save(ColaboradorFoto);

  }
}



CadastroColaboradorRouter.patch('/Foto/:registro', upload.single('avat'), async (request, response) => {

  const AtualizarFoto = new AtualizarOperadorFotoService();

  const {registro}  = request.params;
  const nomeFoto = request.file.filename;

  const Atualizar = await AtualizarFoto.execute({
    registro,
    nomeFoto,
  })

  return response.json(Atualizar);
});*/


export default CadastroColaboradorRouter;
