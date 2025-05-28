import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsBoolean,
  Min,
  Matches,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'name can only contain letters, numbers, and spaces',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'name can only contain letters, numbers, and spaces',
  })
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  contractTypeId?: number;

  @IsOptional()
  @IsDateString()
  contractSignedOn?: string;

  @IsNumber()
  @Min(0)
  budget: number;

  @IsBoolean()
  isActive: boolean;
}
