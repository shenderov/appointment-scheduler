import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersController } from './controllers/providers.controller';
import { ProvidersPublicController } from './controllers/providers.public.controller';
import { ProvidersService } from './services/providers.service';
import { Provider } from './entities/provider.entity';
import { AuthModule } from '@auth/auth.module';
import { Service } from '@services/entities/services.entity';
import { Appointment } from '@appointments/entities/appointment.entity';
import { ProviderHours } from '@providers/entities/provider-hours.entity';
import { ProviderHoursOverride } from '@providers/entities/provider-hours-override.entity';
import { ClinicHours } from '@clinic/entities/clinic-hours.entity';
import { ClinicHoursException } from '@clinic/entities/clinic-hours-exception.entity';
import { AvailabilityController } from '@providers/controllers/availability.controller';
import { AvailabilityPublicController } from '@providers/controllers/availability.public.controller';
import { AvailabilityService } from '@providers/services/availability.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Provider,
      Service,
      Appointment,
      ProviderHours,
      ProviderHoursOverride,
      ClinicHours,
      ClinicHoursException,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    ProvidersController,
    ProvidersPublicController,
    AvailabilityController,
    AvailabilityPublicController,
  ],
  providers: [ProvidersService, AvailabilityService],
  exports: [ProvidersService, AvailabilityService],
})
export class ProvidersModule {}
