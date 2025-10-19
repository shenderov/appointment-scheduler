import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '@appointments/entities/appointment.entity';
import { CreateAppointmentDto } from '@shared-models/dtos/appointments/create-appointment.dto';
import { UpdateAppointmentStatusDto } from '@shared-models/dtos/appointments/update-appointment-status.dto';
import { Provider } from '@providers/entities/providers.entity';
import { Service } from '@services/entities/services.entity';
import { User } from '@users/entities/user.entity';
import { AppointmentStatus } from '@shared-models/enums/appointments/status.enum';
import { AppointmentInfoClientDto } from '@shared-models/dtos/appointments/appointment-info-client.dto';
import { toAppointmentInfoClientDto } from '@appointments/mappers/appointment.mapper';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}

  async create(
    clientId: number,
    data: CreateAppointmentDto,
  ): Promise<Appointment> {
    if (!data.acknowledgment) {
      throw new BadRequestException(
        'Acknowledgment of terms and conditions required',
      );
    }

    const appointment = this.appointmentRepo.create({
      provider: { id: data.providerId } as Provider,
      service: { id: data.serviceId } as Service,
      user: { id: clientId } as User,
      startTime: new Date(data.startTime),
      comments: data.comments,
      status: AppointmentStatus.PENDING,
    });

    try {
      return await this.appointmentRepo.save(appointment);
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code?: string }).code === '23503'
      ) {
        throw new BadRequestException('Invalid provider or service ID');
      }
      throw err;
    }
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepo.find();
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async findAllByClientId(userId: number): Promise<AppointmentInfoClientDto[]> {
    const appointments = await this.appointmentRepo.find({
      where: { user: { id: userId } },
    });

    return appointments.map(toAppointmentInfoClientDto);
  }

  async updateStatus(
    id: number,
    dto: UpdateAppointmentStatusDto,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    appointment.status = dto.status;
    return this.appointmentRepo.save(appointment);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepo.delete(id);
  }
}
