import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import tbArea from './tb_area';
import tbSubarea from './tb_subarea';

@Entity('tb_colaborador')
class tbCadastroColaborador {
    @PrimaryColumn('int')
    col_registro: number;

    @Column()
    col_nome: string;

    @Column()
    col_senha: string;

    @Column()
    col_turno: string;

    @Column('int')
    col_area: number;

    @ManyToOne(() => tbArea)
    @JoinColumn({ name: 'col_id_area'})
    fk_aarea: tbArea;

    @Column('int')
    col_nivel_acesso: number;

    @Column()
    col_cargo: string;

    @Column()
    col_data_registro: Date;

    @Column()
    col_revisao: Date;

    @Column()
    col_status: string;

    @Column()
    col_foto: string;

    @Column()
    col_email: string;

    @Column()
    col_contato: string;

    @Column('int')
    col_subarea: number;

    @ManyToOne(() => tbSubarea)
    @JoinColumn({ name: 'col_id_subarea'})
    fk_ssubarea: tbSubarea;

}

export default tbCadastroColaborador;







