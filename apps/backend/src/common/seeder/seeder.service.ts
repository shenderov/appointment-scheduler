import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '@services/entities/services.entity';
import { User } from '@users/entities/user.entity';
import { Provider, Specialty } from '@providers/entities/providers.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '@shared/models/enums';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Provider)
    private readonly providerRepo: Repository<Provider>,
  ) {}

  async onModuleInit() {
    console.log('✅ onModuleInit triggered');
    await this.seedServices();
    await this.seedProviders();
    await this.seedAdmins();
    await this.seedClients();
  }

  private async seedServices() {
    const count = await this.serviceRepo.count();
    console.log('Services in DB: ', count);
    if (count === 0) {
      await this.serviceRepo.save([
        {
          name: 'Massage Therapy 30 Min',
          durationMin: 30,
          breakMin: 15,
        },
        {
          name: 'Massage Therapy 45 Min',
          durationMin: 45,
          breakMin: 15,
        },
        {
          name: 'Massage Therapy 60 Min',
          durationMin: 60,
          breakMin: 15,
        },
        {
          name: 'Massage Therapy 90 Min',
          durationMin: 90,
          breakMin: 15,
        },
        {
          name: 'Chiropractic Initial Examination',
          durationMin: 60,
          breakMin: 10,
        },
        {
          name: 'Chiropractic Re-evaulation',
          durationMin: 30,
          breakMin: 0,
        },
        {
          name: 'Chiropractic Adjustment',
          durationMin: 20,
          breakMin: 0,
        },
        {
          name: 'Acupuncture 30 Min',
          durationMin: 30,
          breakMin: 5,
        },
        {
          name: 'Acupuncture 60 Min',
          durationMin: 60,
          breakMin: 10,
        },
        {
          name: 'Physiotherapy 30 Min',
          durationMin: 30,
          breakMin: 5,
        },
        {
          name: 'Physiotherapy 60 Min',
          durationMin: 60,
          breakMin: 10,
        },
        {
          name: 'Nutritional Consulting Initial',
          durationMin: 75,
          breakMin: 15,
        },
        {
          name: 'Nutritional Consulting Follow-up',
          durationMin: 30,
          breakMin: 5,
        },
        {
          name: 'Foot Care Initial Assessment',
          durationMin: 60,
          breakMin: 10,
        },
        {
          name: 'Foot Care Routine Assessment',
          durationMin: 30,
          breakMin: 5,
        },
        {
          name: 'Foot Care Diabetic Foot Exam',
          durationMin: 20,
          breakMin: 5,
        },
      ]);
      console.log('✅ Preloaded services into database.');
    }
  }

  private async seedProviders() {
    const providerCount = await this.providerRepo.count();
    console.log('Providers in DB: ', providerCount);
    if (providerCount === 0) {
      const services = await this.serviceRepo.find();
      const passwordHash = await bcrypt.hash('password123', 10);

      const getIds = (names: string[]) =>
        services.filter((s) => names.includes(s.name)).map((s) => s.id);

      const massageServicesIds = getIds([
        'Massage Therapy 30 Min',
        'Massage Therapy 45 Min',
        'Massage Therapy 60 Min',
        'Massage Therapy 90 Min',
      ]);

      const chiropracticServicesIds = getIds([
        'Chiropractic Initial Examination',
        'Chiropractic Re-evaulation',
        'Chiropractic Adjustment',
      ]);

      const acupunctureServicesIds = getIds([
        'Acupuncture 30 Min',
        'Acupuncture 60 Min',
      ]);

      const physiotherapyServicesIds = getIds([
        'Physiotherapy 30 Min',
        'Physiotherapy 60 Min',
      ]);

      const nutritionalConsultingServicesIds = getIds([
        'Nutritional Consulting Initial',
        'Nutritional Consulting Follow-up',
      ]);

      const footCareServicesIds = getIds([
        'Foot Care Initial Assessment',
        'Foot Care Routine Assessment',
        'Foot Care Diabetic Foot Exam',
      ]);

      const seedData: {
        name: string;
        email: string;
        password: string;
        specialty: Specialty;
        title: string;
        licenseName: string;
        licenseNumber: string;
        serviceIds: string[];
        bio: string;
      }[] = [
        {
          name: 'Alice Brown',
          email: 'alice.massage@example.com',
          password: 'pass123',
          specialty: Specialty.MASSAGE,
          title: 'Massage Therapist',
          licenseName: 'Massage Board Manitoba',
          licenseNumber: 'MB1001',
          serviceIds: massageServicesIds,
          bio: 'Alice specializes in deep tissue and therapeutic massage with over 10 years of experience helping clients recover from injuries and stress.',
        },
        {
          name: 'Bob Martin',
          email: 'bob.massage@example.com',
          password: 'pass123',
          specialty: Specialty.MASSAGE,
          title: 'Registered Massage Therapist',
          licenseName: 'Massage Canada',
          licenseNumber: 'MB1002',
          serviceIds: massageServicesIds,
          bio: 'Bob is passionate about improving mobility and reducing pain through custom massage techniques and wellness advice.',
        },
        {
          name: 'Cindy Zhang',
          email: 'cindy.chiro@example.com',
          password: 'pass123',
          specialty: Specialty.CHIROPRACTOR,
          title: 'Doctor of Chiropractic',
          licenseName: 'Chiropractic Association',
          licenseNumber: 'CH2001',
          serviceIds: chiropracticServicesIds,
          bio: 'Cindy combines modern chiropractic care with holistic practices to improve posture and spinal health.',
        },
        {
          name: 'David Stone',
          email: 'david.chiro@example.com',
          password: 'pass123',
          specialty: Specialty.CHIROPRACTOR,
          title: 'Licensed Chiropractor',
          licenseName: 'Canadian Chiro Board',
          licenseNumber: 'CH2002',
          serviceIds: chiropracticServicesIds,
          bio: 'David brings over 15 years of experience treating chronic back and neck pain through chiropractic adjustments.',
        },
        {
          name: 'Eva Lee',
          email: 'eva.acu@example.com',
          password: 'pass123',
          specialty: Specialty.THERAPIST,
          title: 'Acupuncturist',
          licenseName: 'Manitoba Acupuncture College',
          licenseNumber: 'AC3001',
          serviceIds: acupunctureServicesIds,
          bio: 'Eva offers acupuncture and Eastern medicine therapies to treat anxiety, pain, and fatigue in a calming environment.',
        },
        {
          name: 'Frank Wu',
          email: 'frank.acu@example.com',
          password: 'pass123',
          specialty: Specialty.THERAPIST,
          title: 'Therapy Specialist',
          licenseName: 'Therapy Alliance',
          licenseNumber: 'AC3002',
          serviceIds: acupunctureServicesIds,
          bio: 'Frank focuses on holistic therapies and acupuncture for sports injury recovery and overall energy balance.',
        },
        {
          name: 'Grace Kim',
          email: 'grace.physio@example.com',
          password: 'pass123',
          specialty: Specialty.NURSE,
          title: 'Physiotherapist',
          licenseName: 'Physiotherapy Manitoba',
          licenseNumber: 'PH4001',
          serviceIds: physiotherapyServicesIds,
          bio: 'Grace designs personalized rehabilitation programs for post-surgical recovery and mobility improvement.',
        },
        {
          name: "Henry O'Neil",
          email: 'henry.physio@example.com',
          password: 'pass123',
          specialty: Specialty.NURSE,
          title: 'Rehab Nurse',
          licenseName: 'Nursing Board',
          licenseNumber: 'PH4002',
          serviceIds: physiotherapyServicesIds,
          bio: 'Henry is a rehabilitation nurse focused on long-term recovery support for neurological and orthopedic conditions.',
        },
        {
          name: 'Irene Patel',
          email: 'irene.nutri@example.com',
          password: 'pass123',
          specialty: Specialty.NUTRICIOLOGIST,
          title: 'Nutritionist',
          licenseName: 'Nutrition Canada',
          licenseNumber: 'NU5001',
          serviceIds: nutritionalConsultingServicesIds,
          bio: 'Irene helps clients reach their wellness goals through evidence-based nutrition plans and lifestyle coaching.',
        },
        {
          name: 'James Wilson',
          email: 'james.nutri@example.com',
          password: 'pass123',
          specialty: Specialty.NUTRICIOLOGIST,
          title: 'Diet Consultant',
          licenseName: 'Nutrition Manitoba',
          licenseNumber: 'NU5002',
          serviceIds: nutritionalConsultingServicesIds,
          bio: 'James creates tailored diet strategies for weight management, sports performance, and chronic disease prevention.',
        },
        {
          name: 'Kathy Rivera',
          email: 'kathy.pod@example.com',
          password: 'pass123',
          specialty: Specialty.PODIATOR,
          title: 'Foot Care Nurse',
          licenseName: 'Foot Health Institute',
          licenseNumber: 'FO6001',
          serviceIds: footCareServicesIds,
          bio: 'Kathy provides medical foot care, treating conditions like ingrown toenails, calluses, and diabetic foot complications.',
        },
        {
          name: 'Leo Brooks',
          email: 'leo.pod@example.com',
          password: 'pass123',
          specialty: Specialty.PODIATOR,
          title: 'Podiatry Assistant',
          licenseName: 'Manitoba FootCare',
          licenseNumber: 'FO6002',
          serviceIds: footCareServicesIds,
          bio: 'Leo supports podiatric procedures and provides preventive care for elderly and at-risk patients.',
        },
        // Demo providers with generic bios
        ...Array.from({ length: 10 }).map((_, i) => ({
          name: `Demo Provider ${i + 1}`,
          email: `demo${i + 1}@example.com`,
          password: 'pass123',
          specialty: Object.values(Specialty)[
            i % Object.values(Specialty).length
          ] as Specialty,
          title: 'Specialist',
          licenseName: 'Demo License Org',
          licenseNumber: `DM${7000 + i}`,
          serviceIds: [
            ...new Set(
              i % 2 === 0 ? massageServicesIds : chiropracticServicesIds,
            ),
          ],
          bio: 'Experienced specialist providing client-centered care using best practices in their field.',
        })),
      ];

      for (const data of seedData) {
        const user = await this.userRepo.save({
          name: data.name,
          email: data.email,
          passwordHash,
          role: Role.Provider,
        });

        await this.providerRepo.save({
          user: { id: user.id },
          profileImageUrl: '',
          specialty: data.specialty,
          title: data.title,
          licenseName: data.licenseName,
          licenseNumber: data.licenseNumber,
          bio: data.bio,
          isActive: true,
          services: data.serviceIds.map((id) => ({ id })),
        });
      }

      console.log('✅ Seeded 20+ providers and linked users');
    }
  }

  private async seedAdmins() {
    const adminCount = await this.userRepo.count({
      where: { role: Role.Admin },
    });
    console.log('Admins in DB: ', adminCount);
    if (adminCount > 0) {
      console.log('⏩ Admins already exist. Skipping seeding admins.');
      return;
    }
    const passwordHash = await bcrypt.hash('password123', 10);
    const admins: Partial<User>[] = [
      {
        name: 'Admin One',
        email: 'admin1@example.com',
        passwordHash,
        role: Role.Admin,
      },
      {
        name: 'Admin Two',
        email: 'admin2@example.com',
        passwordHash,
        role: Role.Admin,
      },
    ];
    await this.userRepo.save(admins);
    console.log('✅ Seeded 2 admins');
  }

  private async seedClients() {
    const clientCount = await this.userRepo.count({
      where: { role: Role.Client },
    });
    console.log('Users in DB: ', clientCount);
    if (clientCount > 0) {
      console.log('⏩ Clients already exist. Skipping seeding clients.');
      return;
    }
    const passwordHash = await bcrypt.hash('password123', 10);
    const clients: Partial<User>[] = Array.from({ length: 20 }).map((_, i) => ({
      name: `Client ${i + 1}`,
      email: `client${i + 1}@example.com`,
      passwordHash,
      role: Role.Client,
    }));
    await this.userRepo.save(clients);
    console.log('✅ Seeded 20 clients');
  }
}
