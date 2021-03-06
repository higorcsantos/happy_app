import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orphanage } from "./Orphanage";

@Entity('images')
class Image{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage

}

export {Image}