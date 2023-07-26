import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import tbSpare from './tb_Spare';
import cadastroMaquinastb from './tb_Maquinas';

@Entity('tb_bom')
class tbSpareBom{
  @PrimaryColumn()
  col_id: string;

  @Column()
  col_maquina: string;

  @ManyToOne(() => cadastroMaquinastb)
    @JoinColumn({ name: 'col_mi'})
    fk_maquina_cod: cadastroMaquinastb;

  @Column()
  col_peca: string;

  @ManyToOne(() => tbSpare)
    @JoinColumn({ name: 'col_cod'})
    fk_spare_cod: tbSpare;

}

export default tbSpareBom







