import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto'; // <-- Nuevo DTO para creación

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  public findAll(): Project[] {
    return this.projectsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Project {
    const project = this.projectsService.findOne(+id);
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Project {
    const updated: Project | undefined = this.projectsService.update(
      +id,
      updateProjectDto,
    );

    if (!updated) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return updated;
  }

  @Post()
  public create(@Body() createProjectDto: CreateProjectDto): Project {
    return this.projectsService.create(createProjectDto);
  }
}
