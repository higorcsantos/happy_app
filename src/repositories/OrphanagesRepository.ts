import { EntityRepository, Repository } from "typeorm";
import { Orphanage } from "../models/Orphanage";


@EntityRepository(Orphanage)
class OrphanageRepository extends Repository<Orphanage>{}

export {OrphanageRepository}