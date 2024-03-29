import { getRepository, EntityRepository, Repository } from 'typeorm';
import tbCadastroColaborador from '../models/tb_Colaborador';
import AppError from '../errors/AppError';
import { Response, Router } from 'express';
import tbSubarea from '../models/tb_subarea'
import tbArea from '../models/tb_area';



interface Autenticacao {
  col_registro: number;
  col_senha: string;
}

interface Resposta{
  col_registro: number;
  col_area: number;
  col_nivel_acesso: number;
  col_nome: string;
  col_subarea: number;
}

@EntityRepository(tbCadastroColaborador)
class AutenticacaoRepository extends Repository<tbCadastroColaborador>{
  public async findByDate(date: Date): Promise<tbCadastroColaborador | null> {
    const encontrarRegistro = await this.findOne({
      where: { date },
    });
    return encontrarRegistro || null;
  }
}


class AutenticacaoUsuarioServico{
  public async execute({ col_registro, col_senha}: Autenticacao): Promise<Resposta> {
    const repositorioAutenticacao = getRepository (tbCadastroColaborador);
    
    
    const colaboradorSet = await getRepository(tbCadastroColaborador)
    .createQueryBuilder('colaborador')
    .select('colaborador.col_registro, area.col_area, subarea.col_subarea, colaborador.col_nome, colaborador.col_nivel_acesso')
    .innerJoin(tbSubarea, 'subarea', 'subarea.col_id_subarea = colaborador.col_subarea')
    .innerJoin(tbArea, 'area', 'area.col_id_area = colaborador.col_area')
    .where('colaborador.col_registro = :col_registro AND colaborador.col_senha = :col_senha', {col_registro, col_senha})
    .getRawOne();

    return colaboradorSet
  }
}

const autenticacaoDeUsuario = Router();

autenticacaoDeUsuario.post('/', async(request, response) => {
  const { col_registro, col_senha } = request.body;
  const autenticacaoColaborador = new AutenticacaoUsuarioServico();
  const { col_nome, col_area, col_nivel_acesso, col_subarea } = await autenticacaoColaborador.execute({
    col_registro,
    col_senha,
  });

  
  return response.json({ col_nome, col_area, col_nivel_acesso, col_subarea});
})

export default autenticacaoDeUsuario;
