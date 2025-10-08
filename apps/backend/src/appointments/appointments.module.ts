import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from '@appointments/entities/appointments.entity';
import { AppointmentsService } from '@appointments/services/appointments.service';
import { AppointmentsController } from '@appointments/controllers/appointments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointments])],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
