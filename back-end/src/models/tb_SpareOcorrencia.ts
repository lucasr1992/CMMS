import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import tbSpare from './tb_Spare';
import tbCadastroOcorrencia from './tb_Ocorrencia';

@Entity('tb_spare_ocorrencia')
class tbSpareBom{
  @PrimaryColumn('int')
  col_id: number;

  @Column('int')
  col_ocorrencia: number;

  @ManyToOne(() => tbCadastroOcorrencia)
    @JoinColumn({ name: 'col_numos'})
    fk_ocorrencia_spare: tbCadastroOcorrencia;

  @Column()
  col_spare: string;

  @ManyToOne(() => tbSpare)
    @JoinColumn({ name: 'col_cod'})
    fk_codspare_ocorrencia: tbSpare;

  @Column('int')
  col_qnt: number;

  @Column()
  col_use: string;



}

export default tbSpareBom







