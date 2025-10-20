import { Module } from '@nestjs/common';
import { SeederService } from '@common/seeder/seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '@services/entities/services.entity';
import { Provider } from '@providers/entities/provider.entity';
import { User } from '@users/entities/user.entity';
import { ClinicHours } from '@clinic/entities/clinic-hours.entity';
import { ProviderHours } from '@providers/entities/provider-hours.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Service,
      User,
      Provider,
      ProviderHours,
      ClinicHours,
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
