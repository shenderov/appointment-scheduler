import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { ProviderSpecialty } from '@shared-models/enums/providers/provider-specialty.enum';

export class CreateProviderDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsEnum(ProviderSpecialty)
  specialty!: ProviderSpecialty;

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
