import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Room{

    @PrimaryColumn()
    public roomId: string;

    @Column()
    public password: string;

}
