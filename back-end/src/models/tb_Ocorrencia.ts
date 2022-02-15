import { Entity, Column,  PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import cadastroMaquinastb from './tb_Maquinas';
import tbCadastroColaborador from './tb_Colaborador';


@Entity('tb_ocorrencia')
class tbCadastroOcorrencia {
    @PrimaryGeneratedColumn()
    col_numos: number;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_data_abertura: Date;

    @Column()
    col_mi: string;

    @ManyToOne(() => cadastroMaquinastb)
    @JoinColumn({ name: 'col_mi'})
    fk_maquina: cadastroMaquinastb;

    @Column()
    col_maquinaparada: string;

    @Column()
    col_seguranca: string;

    @Column()
    col_problema: string;


    @Column('int')
    col_registro_operador: number;

    @Column('int')
    col_tecnico: number;

    @Column()
    col_tipo: string;

    @Column()
    col_natureza: string;

    @Column()
    col_raiz: string;

    @Column()
    col_atuacao: string;

    @Column()
    col_obs: string;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_chegada: Date;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_diagnostico: Date;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_desmontagem: Date;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_peca: Date;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_montagem: Date;

    @Column('datetime')//AAAA-MM-DD HH:MM:SS
    col_fim: Date;

    @Column()
    col_status: string;

    @Column()
    col_MBD: string;

}

export default tbCadastroOcorrencia;
