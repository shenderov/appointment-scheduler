import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  durationMin!: number;

  @IsInt()
  @Min(0)
  breakMin!: number;
}
