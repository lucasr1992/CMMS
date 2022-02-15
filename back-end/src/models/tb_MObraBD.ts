import { Entity, Column,  PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import tbCadastroColaborador from './tb_Colaborador';
import tbCadastroOcorrencia from './tb_Ocorrencia';


@Entity('tb_maoobrabd')
class tbMaoObraBD {
    @PrimaryGeneratedColumn('increment')
    col_id: number;

    @Column('int')
    col_registro: number;

    @ManyToOne(() => tbCadastroColaborador)
    @JoinColumn({ name: 'col_registro'})
    fk_registro_tecnico: tbCadastroColaborador;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_inicio: Date;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_fim: Date;

    @Column('int')
    col_numos: number;

    @ManyToOne(() => tbCadastroOcorrencia)
    @JoinColumn({ name: 'col_numos'})
    fk_ocorr: tbCadastroOcorrencia;

  }

export default tbMaoObraBD;
