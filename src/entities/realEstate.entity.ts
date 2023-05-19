import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Address } from './addresses.entity';
import { Category } from './categories.entity';
import { Schedule } from './schedule_users_properties.entity';

@Entity('real_estate')
export class RealEstate {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ default: false })
	sold: boolean;

	@Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
	value: number | string;

	@Column({ type: 'integer' })
	size: number;

	@CreateDateColumn({ type: 'date' })
	createdAt: string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: string;

	@OneToMany(() => Schedule, (schedule) => schedule.realEstate)
	schedule: Schedule[];

	@OneToOne(() => Address)
	@JoinColumn()
	address: Address;

	@ManyToOne(() => Category, (category) => category.realEstate)
	category: Category;
}
