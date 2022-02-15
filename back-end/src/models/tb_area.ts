import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tb_area')
class tbArea{
  @PrimaryColumn('int')
  col_id_area: number;

  @Column()
  col_area: string;
}

export default tbArea







