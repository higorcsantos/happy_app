import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./Image";

@Entity('orphanages')
class Orphanage{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;
    
    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean

    @OneToMany(() => Image, image => image.orphanage,{
        cascade: ['insert','update','remove']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: Image[]
}

export {Orphanage}