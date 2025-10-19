import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '@appointments/entities/appointment.entity';
import { AppointmentsService } from '@appointments/services/appointments.service';
import { AppointmentsController } from '@appointments/controllers/appointments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
