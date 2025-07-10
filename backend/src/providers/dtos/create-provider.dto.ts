import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { Specialty } from '../entities/providers.entity';

export class CreateProviderDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsEnum(Specialty)
  specialty!: Specialty;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  licenseName!: string;

  @IsNotEmpty()
  @IsString()
  licenseNumber!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUUID('all', { each: true })
  serviceIds?: string[];
}
