import { inject, injectable } from "inversify";
import { ISearchCodeService } from "./contracts";
import { TYPES } from "../../utils";
import { ISearchCodeRepository } from "../repository";

@injectable()
export class SearchCodeService implements ISearchCodeService {
  constructor(
    @inject(TYPES.SearchCodeRepository)
    private searchCodeRepository: ISearchCodeRepository
  ) {}

  async update(id: string, data: { table: string; lastCode: number }) {
    await this.searchCodeRepository.update(id, data);
  }

  async list(){
    return this.searchCodeRepository.list();
  }

  async create(table: string){
    return this.searchCodeRepository.create(table);
  }
}
