import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export default class FileStore {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @Index({ unique: true })
  filename: string;

  @Column({ default: 'json' })
  fileType: string;

  @Column('simple-json', { nullable: false })
  file: {
    success: boolean;
    allComps: string[];
    allGqlProjects: string[];
    allGqlCompanies: string[];
    allLanguages: string[];
  };
}
