import SearchCodeModel from "../../model/SearchCodeModel";

export interface ISearchCodeService {
  /**
   *
   * Should update
   *
   */
  update(
    id: string,
    data: { table: string; lastCode: number }
  ): Promise<void>;

  list(): Promise<SearchCodeModel | null>

  create(table: string) : Promise<SearchCodeModel>

}
