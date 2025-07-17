import { Module } from '@nestjs/common';
import { SeederService } from '@common/seeder/seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '@services/entities/services.entity';
import { Provider } from '@providers/entities/providers.entity';
import { User } from '@users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, User, Provider])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
