import { CourseModel } from "../../model/CourseModel";

/**
 * Interface that defines the service layer for Course operations.
 * Provides methods to create, list, retrieve, and get details of courses.
 */
export interface ICourseService {
  /**
   * Creates a new course associated with a specific user.
   *
   * @param {Object} data - The data required to create a course.
   * @param {string} data.userId - The ID of the user creating the course.
   * @param {string} data.title - The title of the course.
   * @param {string} data.description - A brief description of the course.
   * @returns {Promise<void>} A promise that resolves when the course is successfully created.
   */
  create(data: {
    userId: string;
    title: string;
    description: string;
  }): Promise<void>;

  /**
   * Retrieves a list of courses associated with a specific user's email.
   *
   * @param {string} email - The email of the user to fetch the courses for.
   * @returns {Promise<CourseModel[] | undefined>} A promise that resolves to an array of CourseModel instances
   * or undefined if no courses are found.
   */
  listByUser(email: string): Promise<CourseModel[] | null>;

  listByUserId(id:string): Promise<CourseModel[] | null>;

  /**
   * Fetches a course by its ID.
   *
   * @param {string} id - The unique identifier of the course.
   * @returns {Promise<CourseModel | null>} A promise that resolves to the CourseModel instance if found,
   * or null if no course with the specified ID exists.
   */
  getById(id: string): Promise<CourseModel | null>;

  /**
   * Retrieves the details of a specific course by its ID.
   *
   * @param {string} courseId - The unique identifier of the course.
   * @returns {Promise<CourseModel>} A promise that resolves to the CourseModel instance with all its details.
   */
  getDetails(courseId: string): Promise<CourseModel | null>;

  /**
   * Return a list of courses by similar name.
   *
   * @param {string} name - Name searched by user.
   * @returns {Promise<CourseModel[] | undefined>} A promise that resolves to the CourseModel instance with all its details.
   */
  getBySimilarName(name: string): Promise<CourseModel[] | undefined>;
}
