import { inject, injectable } from "inversify";
import { ICourseService, IFileService, ISearchCodeService } from "./contracts";
import { ICourseRepository } from "../repository";
import { TYPES } from "../../utils";
import { CourseModel } from "../model";

@injectable()
export class CourseService implements ICourseService {
  constructor(
    @inject(TYPES.CourseRepository)
    private courseRepository: ICourseRepository,
    @inject(TYPES.SearchCodeService)
    private searchCodeService: ISearchCodeService, 
    @inject(TYPES.FileService)
    private fileService: IFileService
  ) {}

  formatNameSearch(name: string) {
    const formattedName = name
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s/g, "")
      .toLowerCase()
      .trim();

    return formattedName;
  }

  formatCodeSearch(code: string): number {
    const numbersOnly = code.match(/\d+/g);
    const numberString = numbersOnly ? numbersOnly.join('') : '0';
    return parseInt(numberString);
  }

  async getSearchCode(): Promise<number> {
    const list = await this.searchCodeService.list();
    if (!list) {
      await this.searchCodeService.create("Course");
      return 1;
    }

    await this.searchCodeService.update(list.id.toString(), {
      table: "Course",
      lastCode: list.lastCode + 1, 
    });
    return list.lastCode + 1; 
  }

  async create(data: { title: string; userId: string; description: string }) {
    const formattedName = this.formatNameSearch(data.title);
    const codeSearch = await this.getSearchCode();
    const newCourse = { 
      userId: data.userId, 
      title: data.title,
      description: data.description,
      nameSearch: formattedName,
      codeSearch,
    };

    return this.courseRepository.create(newCourse);
  }

  async listByUser(email: string) {
    return this.courseRepository.listByFilter({ user: email });
  }

  async listByUserId(id: string){
    return this.courseRepository.listByFilter({ userId: id });
  }

  async getById(id: string) {
    return this.courseRepository.getById(id);
  }

  async getDetails(courseId: string) {
    const videoList = await this.fileService.listByCourseId(courseId);
    const course = await this.courseRepository.getById(courseId);

    if (!course) return null;
    return { ...course, videoList };
  }

  async search(value: string){
    if(value.startsWith("#")){
      const code = value.replace("#", "");
      return this.getByCodeSearch(code);
    }

    return this.getBySimilarName(value);
  }

  private async getByCodeSearch(code: string) { 
    const formatCodeSearch = this.formatCodeSearch(code);
    return this.courseRepository.getByCodeSearch(formatCodeSearch);
  }

  private async getBySimilarName(name: string) {
    const formattedName = this.formatNameSearch(name);
    const courseList = await this.courseRepository.listByLikeSearch(
      formattedName
    );

    return courseList;
  }
}
