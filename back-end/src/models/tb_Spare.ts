import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tb_spare')
class tbSpare{
  @PrimaryColumn()
  col_cod: string;

  @Column()
  col_base: string;

  @Column()
  col_descricao: string;

  @Column()
  col_grupo: string;

  @Column()
  col_registro: Date;

  @Column()
  col_revisao: Date;

  @Column('int')
  col_min: number;

  @Column('int')
  col_leadtime: number;

  @Column('float')
  col_preco: number;

  @Column()
  col_unidade: string;

  @Column()
  col_raridade: string;

  @Column()
  col_obsolecencia: string;

  @Column('int')
  col_estoque: number;

  @Column('int')
  col_max: number;

  @Column()
  col_ehs: string;

  @Column()
  col_qc: string;

  @Column()
  col_proxima_rev: Date;

  @Column()
  col_status: string;

}

export default tbSpare







