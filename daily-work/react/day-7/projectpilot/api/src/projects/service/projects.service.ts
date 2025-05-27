// src/projects/projects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from '../interface/project.interface';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Project') private projectModel: Model<IProject>) {}

  async getAllProjects(): Promise<IProject[]> {
    const projectsData = await this.projectModel.find();
    if (!projectsData || projectsData.length == 0) {
      throw new NotFoundException('Projects data not found!');
    }
    return projectsData;
  }

  async getProject(projectId: string): Promise<IProject> {
    const existingProject = await this.projectModel.findById(projectId).exec();
    if (!existingProject) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }
    return existingProject;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<IProject> {
    const newProject = new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<IProject> {
    const existingProject = await this.projectModel.findByIdAndUpdate(
      projectId,
      updateProjectDto,
      { new: true },
    );
    if (!existingProject) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }
    return existingProject;
  }

  async deleteProject(projectId: string): Promise<IProject> {
    const deletedProject = await this.projectModel.findByIdAndDelete(projectId);
    if (!deletedProject) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }
    return deletedProject;
  }
}
