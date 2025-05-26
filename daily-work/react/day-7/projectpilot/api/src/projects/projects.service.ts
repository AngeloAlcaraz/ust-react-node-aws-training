import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  contractTypeId: number;
  contractSignedOn: string;
  budget: number;
  isActive: boolean;
}

interface DbData {
  projects: Project[];
}

@Injectable()
export class ProjectsService {
  private readonly dbFilePath = path.join(__dirname, '../../db.json');

  private readDb(): DbData {
    const fileContent = fs.readFileSync(this.dbFilePath, 'utf-8');
    return JSON.parse(fileContent) as DbData;
  }

  private writeDb(data: DbData): void {
    fs.writeFileSync(this.dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  public findAll(): Project[] {
    const data = this.readDb();
    return data.projects;
  }

  public findOne(id: number): Project | undefined {
    const data = this.readDb();
    return data.projects.find((project) => project.id === id);
  }

  public create(newProjectData: Omit<Project, 'id'>): Project {
    const data = this.readDb();

    const newId =
      data.projects.length > 0
        ? Math.max(...data.projects.map((p) => p.id)) + 1
        : 1;

    const newProject: Project = {
      id: newId,
      ...newProjectData,
    };

    data.projects.push(newProject);
    this.writeDb(data);

    return newProject;
  }

  public update(id: number, updateData: Partial<Project>): Project | undefined {
    const data = this.readDb();
    const index = data.projects.findIndex((project) => project.id === id);

    if (index === -1) {
      return undefined;
    }

    const updatedProject: Project = {
      ...data.projects[index],
      ...updateData,
    };

    data.projects[index] = updatedProject;
    this.writeDb(data);

    return updatedProject;
  }
}
