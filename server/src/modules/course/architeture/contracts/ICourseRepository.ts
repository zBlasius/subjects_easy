import { CourseModel } from "../../model/CourseModel";

export interface ICourseRepository {
  /**
   *
   * Should create new courses
   *
   * @param {any} data info data to create course
   *
   */
  create(data: {
    userId: string,
    title: string,
    description: string,
    nameSearch: string,
    codeSearch: number
  }): Promise<void>;

  /**
   *
   * Should get a creditRelease List
   *
   * @param {any} filter filter to listCourses
   *
   */
  listByFilter(filter: any): Promise<CourseModel[] | null>;

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
  getById(id: string): Promise<CourseModel | null>;

  /**
   *
   * Should return a list by text
   *
   * @param {string} text text to get
   *
   */
  listByLikeSearch(text: string): Promise<CourseModel[] | null>;

  getByCodeSearch(codeSearch: number): Promise<CourseModel | null>;
}
