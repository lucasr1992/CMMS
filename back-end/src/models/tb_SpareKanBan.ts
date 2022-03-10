import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import tbSpare from './tb_Spare';
import tbSubarea from './tb_subarea';

@Entity('tb_kanbanspar')
class tbSpareKanBan{
  @PrimaryColumn('int')
  col_id: number;

  @Column()
  col_peca: string;

  @ManyToOne(() => tbSpare)
    @JoinColumn({ name: 'col_peca'})
    fk_cod_peca: tbSpare;

  @Column('int')
  col_subarea: number;

  @ManyToOne(() => tbSubarea)
    @JoinColumn({ name: 'col_subarea'})
    fk_subarea_peca: tbSubarea;

  @Column()
  col_corredor: string;

  @Column()
  col_armario: string;

  @Column()
  col_gaveta: string;

  @Column()
  col_posicao: string;

  @Column()
  col_revisao: Date;

  @Column()
  col_proxima: Date;

  @Column('int')
  col_quantidade: number;

}

export default tbSpareKanBan







