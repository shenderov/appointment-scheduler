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
import { CreateAppointmentDto } from '@shared-models/dtos/appointments/create-appointment.dto';
import { UpdateAppointmentStatusDto } from '@shared-models/dtos/appointments/update-appointment-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { Role } from '@shared-models/enums/auth/role.enum';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.CLIENT)
  create(@Req() req: Request, @Body() dto: CreateAppointmentDto) {
    interface AuthenticatedRequest extends Request {
      user?: { userId?: string };
    }

    const { user } = req as AuthenticatedRequest;

    if (!user || !user.userId) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    return this.service.create(user.userId as unknown as number, dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.CLIENT)
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.PROVIDER)
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.PROVIDER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
