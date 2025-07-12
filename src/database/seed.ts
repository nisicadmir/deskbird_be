import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from '../common/models/user.model';
import { hashPassword } from '../common/lib/hash.lib';
import { config } from '../config/config';

const EMAIL = 'admir.nisic@outlook.com';
const PASSWORD = '123456';
const ROLE = UserRole.ADMIN;
const FULL_NAME = 'Admir Nisic';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.database.url,
  entities: [User],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);

  // Check if user already exists
  const existing = await userRepository.findOne({ where: { email: EMAIL } });
  if (existing) {
    console.log('User already exists:', existing.email);
    await AppDataSource.destroy();
    return;
  }

  const hashedPassword = await hashPassword(PASSWORD);
  const user = userRepository.create({
    email: EMAIL,
    password: hashedPassword,
    role: ROLE,
    fullName: FULL_NAME,
  });
  await userRepository.save(user);
  console.log('Seeded user:', EMAIL);
  await AppDataSource.destroy();
}

seed().catch((e: unknown) => {
  if (e instanceof Error) {
    console.error('Seed error:', e.message);
  } else {
    console.error('Seed error:', e);
  }
  process.exit(1);
});
