import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tb_subarea')
class tbSubarea{
  @PrimaryColumn('int')
  col_id_subarea: number;

  @Column()
  col_subarea: string;
}

export default tbSubarea;
