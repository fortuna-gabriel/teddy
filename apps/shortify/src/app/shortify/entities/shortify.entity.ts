import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shortify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar', length: 6, unique: true }) 
  shortId: string;

  @Column({ type: 'varchar', nullable: true })
  user?: number;
  
  @Column({ type: 'int', default: 0 })
  clickCount: number;
}
