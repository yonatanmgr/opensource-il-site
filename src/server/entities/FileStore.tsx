import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class FileStore {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @Index({ unique: true })
  filename: string;

  @Column()
  fileType: string;
}
