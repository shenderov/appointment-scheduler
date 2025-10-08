import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  ParseIntPipe,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AppointmentsService } from '@appointments/services/appointments.service';
import { CreateAppointmentDto } from '@appointments/dtos/create-appointment.dto';
import { UpdateAppointmentStatusDto } from '@appointments/dtos/update-status.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllByAuthenticatedUser(@Req() req: Request) {
    interface AuthenticatedRequest extends Request {
      user?: { userId?: string };
    }

    const { user } = req as AuthenticatedRequest;

    if (!user || !user.userId) {
      throw new UnauthorizedException('User must be authenticated.');
    }

    return this.service.findAllByClientId(user.userId as unknown as number);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
