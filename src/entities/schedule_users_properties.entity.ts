import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RealEstate } from './realEstate.entity';
import { User } from './users.entity';

@Entity('schedules_users_properties')
export class Schedule {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'date' })
	date: string;

	@Column({ type: 'time' })
	hour: string;

	@ManyToOne(() => User, (user) => user.schedule)
	user: User;

	@ManyToOne(() => RealEstate, (realEstate) => realEstate.schedule)
	realEstate: RealEstate;
}
