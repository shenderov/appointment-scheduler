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
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from '@appointments/services/appointments.service';
import { CreateAppointmentDto } from '@shared-models/dtos/appointments/create-appointment.dto';
import { UpdateAppointmentStatusDto } from '@shared-models/dtos/appointments/update-appointment-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { Role } from '@shared-models/enums/auth/role.enum';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.CLIENT)
  create(@Req() req: Request, @Body() dto: CreateAppointmentDto) {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    if (user.role === Role.CLIENT && user.id !== dto.userId) {
      throw new BadRequestException('Clients can only book own appointments');
    }
    dto.userId = user.id;
    return this.service.create(dto);
  }

  @Post('admin/appointments')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.PROVIDER)
  createAsAdmin(
    @Query('approve') approve: string,
    @Body() dto: CreateAppointmentDto,
  ) {
    const shouldApprove = approve === 'true';
    return this.service.create(dto, false, shouldApprove);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.CLIENT)
  async findAllByAuthenticatedUser(@Req() req: Request) {
    const user = req.user as UserResponseDto;
    if (!user || !user.id) {
      throw new UnauthorizedException('User must be authenticated.');
    }
    return this.service.findAllByClientId(user.id as unknown as number);
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
