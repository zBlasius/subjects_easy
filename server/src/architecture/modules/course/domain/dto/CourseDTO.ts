// TODO - Faz sentido usar?
export class CourseDTO {
    id: number;
    name: string;
  
    constructor(properties: { id: number; name: string }) {
      this.id = properties.id;
      this.name = properties.name;
    }
  }
  