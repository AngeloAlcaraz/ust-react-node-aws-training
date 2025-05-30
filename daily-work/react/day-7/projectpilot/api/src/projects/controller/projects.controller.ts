import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from '../service/projects.service';
import { Project } from '../schemas/project.schema';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(): Promise<{ message: string; data: Project[] }> {
    try {
      const data = await this.projectsService.getAllProjects();
      return {
        message: 'All projects retrieved successfully',
        data,
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new HttpException(
        {
          message: 'Failed to retrieve projects',
          error: (error as Error).message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getProjectById(
    @Param('id') id: string,
  ): Promise<{ message: string; data: Project }> {
    try {
      const project = await this.projectsService.getProject(id);

      if (!project) {
        throw new NotFoundException(`No project exists with id: ${id}`);
      }

      return {
        message: 'Project retrieved successfully',
        data: project,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(`Error fetching project ${id}:`, error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve project',
          error: (error as Error).message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<{ message: string; data: Project }> {
    try {
      const newProject =
        await this.projectsService.createProject(createProjectDto);
      return {
        message: 'Project created successfully',
        data: newProject,
      };
    } catch (error) {
      console.error('Error creating project:', error);
      throw new HttpException(
        {
          message: 'Failed to create project',
          error: (error as Error).message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateDto: UpdateProjectDto,
  ): Promise<{ message: string; data: Project }> {
    try {
      const data = await this.projectsService.updateProject(id, updateDto);
      if (!data) {
        throw new HttpException(
          { message: 'Project not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Project updated successfully',
        data,
      };
    } catch (error) {
      console.error('Error updating project:', error);
      throw new HttpException(
        {
          message: 'Failed to update project',
          error: (error as Error).message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.projectsService.deleteProject(id);
      if (!deleted) {
        throw new HttpException(
          { message: 'Project not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Project deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new HttpException(
        {
          message: 'Failed to delete project',
          error: (error as Error).message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
