import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointments } from '@appointments/entities/appointments.entity';
import { CreateAppointmentDto } from '@appointments/dtos/create-appointment.dto';
import { UpdateAppointmentStatusDto } from '@appointments/dtos/update-status.dto';
import { Provider } from '@providers/entities/providers.entity';
import { Service } from '@services/entities/services.entity';
import { User } from '@users/entities/user.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentRepo: Repository<Appointments>,
  ) {}

  async create(data: CreateAppointmentDto): Promise<Appointments> {
    if (!data.acknowledgment) {
      throw new BadRequestException(
        'Acknowledgment of terms and conditions required',
      );
    }

    const appointment = this.appointmentRepo.create({
      provider: { id: data.providerId } as Provider,
      service: { id: data.serviceId } as Service,
      user: { id: data.userId } as User,
      startTime: new Date(data.startTime),
      comments: data.comments,
      status: data.status ?? 'scheduled',
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

  findAll(): Promise<Appointments[]> {
    return this.appointmentRepo.find();
  }

  async findOne(id: number): Promise<Appointments> {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async findAllByClientId(userId: number): Promise<Appointments[]> {
    return this.appointmentRepo.find({
      where: { user: { id: userId } },
    });
  }

  async updateStatus(
    id: number,
    dto: UpdateAppointmentStatusDto,
  ): Promise<Appointments> {
    const appointment = await this.findOne(id);
    appointment.status = dto.status;
    return this.appointmentRepo.save(appointment);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepo.delete(id);
  }
}
