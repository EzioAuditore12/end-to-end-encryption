import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlackListedRefreshToken {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'text', nullable: false })
  refreshToken: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiredAt: Date;
}
