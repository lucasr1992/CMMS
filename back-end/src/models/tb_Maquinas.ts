import { Entity, Column, PrimaryColumn,ManyToOne, JoinColumn } from 'typeorm';
import tbArea from './tb_area';
import tbSubarea from './tb_subarea';

@Entity('tb_maquinas')
class cadastroMaquinastb {
    @PrimaryColumn()
    col_mi: string;

    @Column()
    col_descricao: string;

    @Column()
    col_linha: string;

    @Column('int')
    col_area: number;

    @ManyToOne(() => tbArea)
    @JoinColumn({ name: 'col_area'})
    fk_area: tbArea;

    @Column()
    col_datacalendarioam: Date;

    @Column('int')
    col_subarea: number;

    @ManyToOne(() => tbSubarea)
    @JoinColumn({ name: 'col_subarea'})
    fk_subarea: tbSubarea;

    @Column()
    col_classificacao: string;

    @Column()
    col_fabricante: string;

    @Column()
    col_modelo: string;

    @Column()
    col_numserie: string;

    @Column()
    col_numativo: string;

    @Column()
    col_tipo: string;

    @Column()
    col_familia: string;

    @Column('float')
    col_valor: number;

    @Column()
    col_datacompra: Date;

    @Column()
    col_datasop: Date;

    @Column()
    col_dataregistro: Date;

    @Column()
    col_datarevisao: Date;

    @Column()
    col_dataproxrev:Date;

    @Column()
    col_datainstal: Date;

    @Column()
    col_datafabricacao: Date;

    @Column()
    col_datagarantia: Date;

    @Column()
    col_datarelatorio: Date;

    @Column()
    col_dataagendatreinamento: Date;

    @Column()
    col_datamanuais: Date;

    @Column()
    col_datadiagramaeletrico: Date;

    @Column()
    col_datadesenhos: Date;

    @Column()
    col_datacomponentes: Date;

    @Column()
    col_dataspareparts: Date;

    @Column()
    col_datasoftware: Date;

    @Column()
    col_datacalendariopm: Date;

    @Column()
    col_datasmp: Date;

    @Column()
    col_status: string;

}

export default cadastroMaquinastb;
