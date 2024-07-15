export interface ICourseRepository {
  /**
   *
   * Should create new courses
   *
   * @param {any} data info data to create course
   *
   */
  create(data: any): Promise<any>;

  /**
   *
   * Should get a creditRelease List
   *
   * @param {any} filter filter to listCourses
   *
   */
  listByFilter(filter: any): Promise<any>;

  /**
   *
   * Should create a creditRelease
   *
   * @param {number} id id to be updated
   * @param {any} data info data to update
   *
   */
  update(id: number, data: any): Promise<any>;

  /**
   *
   * Should get a course by id
   *
   * @param {number} id id to get
   *
   */
  getById(id: number): Promise<any>;
}
