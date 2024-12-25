import SearchCodeModel from "../../model/SearchCodeModel";

export interface ISearchCodeRepository {
  /**
   *
   * Should list all items of searchcode table
   *
   *
   */
  list(): Promise<SearchCodeModel | null>;

  /**
   *
   * Should update searchcode table
   *
   * @param {number} id id to be updated
   * @param {any} data info data to update
   *
   */
  update(id: string, data: any): Promise<SearchCodeModel>;

  /**
   *
   * Should update searchcode table
   *
   * @param {number} id id to be updated
   * @param {any} data info data to update
   *
   */
  create(table: string): Promise<SearchCodeModel>;
}
