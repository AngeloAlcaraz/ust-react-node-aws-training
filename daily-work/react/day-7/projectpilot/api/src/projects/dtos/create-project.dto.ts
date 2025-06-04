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
import { Transform, Expose, Exclude } from 'class-transformer';

@Exclude()
export class CreateProjectDto {
  @Expose()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'Name can only contain letters, numbers, and spaces',
  })
  name: string;

  @Expose()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @Expose()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(1)
  contractTypeId?: number;

  @Expose()
  @IsOptional()
  @IsDateString()
  contractSignedOn?: string;

  @Expose()
  @IsNumber()
  @Min(0)
  budget: number;

  @Expose()
  @IsBoolean()
  isActive: boolean;
}
