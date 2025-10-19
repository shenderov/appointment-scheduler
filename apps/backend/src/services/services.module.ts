import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from '@services/controllers/services.controller';
import { ServicesPublicController } from '@services/controllers/services.public.controller';
import { ServicesService } from '@services/services/services.service';
import { Service } from '@services/entities/services.entity';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), forwardRef(() => AuthModule)],
  controllers: [ServicesController, ServicesPublicController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
