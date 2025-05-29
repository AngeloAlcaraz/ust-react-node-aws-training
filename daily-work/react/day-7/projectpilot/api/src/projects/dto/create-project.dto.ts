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
import { Transform } from 'class-transformer';

export class CreateProjectDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'Name can only contain letters, numbers, and spaces',
  })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
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
