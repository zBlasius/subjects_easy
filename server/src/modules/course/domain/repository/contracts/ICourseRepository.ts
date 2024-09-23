import CourseModel from "../../model/CourseModel";

export interface ICourseRepository {
  /**
   *
   * Should create new courses
   *
   * @param {any} data info data to create course
   *
   */
  create(data: any): Promise<void>;

  /**
   *
   * Should get a creditRelease List
   *
   * @param {any} filter filter to listCourses
   *
   */
  listByFilter(filter: any): Promise<CourseModel[] | undefined>;

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
}
