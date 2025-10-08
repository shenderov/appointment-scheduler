import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicHoursController } from '@clinic/controllers/clinic-hours.controller';
import { ClinicHoursService } from '@clinic/services/clinic-hours.service';
import { AuthModule } from '@auth/auth.module';
import { ClinicHours } from '@clinic/entities/clinic-hours.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicHours]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ClinicHoursController],
  providers: [ClinicHoursService],
  exports: [ClinicHoursService],
})
export class ClinicModule {}
