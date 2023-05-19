import { getRounds, hashSync } from 'bcryptjs';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BeforeInsert,
	BeforeUpdate,
	OneToMany,
} from 'typeorm';
import { Schedule } from './schedule_users_properties.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ length: 45 })
	name: string;

	@Column({ length: 45, unique: true })
	email: string;

	@Column({ default: false })
	admin: boolean;

	@Column({ length: 120 })
	password: string;

	@CreateDateColumn({ type: 'date' })
	createdAt: string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: string;

	@DeleteDateColumn({ type: 'date' })
	deletedAt: string;

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		const passwordIsEncrypted = getRounds(this.password);
		if (!passwordIsEncrypted) {
			this.password = hashSync(this.password, 10);
		}
	}

	@OneToMany(() => Schedule, (schedule) => schedule.user)
	schedule: Schedule[];
}
