import { inject, injectable } from "inversify";
import { ISearchCodeService } from "./contracts";
import { TYPES } from "../../utils";
import { ISearchCodeRepository } from "../../architeture";

@injectable()
export class SearchCodeService implements ISearchCodeService {
  constructor(
    @inject(TYPES.SearchCodeRepository)
    private searchCodeRepository: ISearchCodeRepository
  ) {}

  // TODO - Write tests here
  async update(id: string, data: { table: string; lastCode: number }) {
    await this.searchCodeRepository.update(id, data);
  }

  // TODO - Write tests here
  async list(){
    return this.searchCodeRepository.list();
  }

  // TODO - Write tests here
  async create(table: string){
    return this.searchCodeRepository.create(table);
  }
}
