import { hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserEntity } from '../../entities/user.entity';
import { ProfileEntity } from '../../entities/profile.entity';
import { RoleEntity } from '../../entities/role.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const usersRepository = dataSource.getRepository(UserEntity);
    const profileRepository = dataSource.getRepository(ProfileEntity);
    const user = new UserEntity();
    user.id = 1;
    user.username = 'test';
    user.password = await hash('11111111', 10);
    user.notification_topic = 'ABCD000001';
    user.phone = '+8562056859453';
    user.verify_at = new Date();
    user.roles = [
      await dataSource.getRepository(RoleEntity).findOneBy({ id: 4 }),
    ];
    const user1 = new UserEntity();
    user1.id = 2;
    user1.username = 'user';
    user1.password = await hash('111111', 10);
    user1.notification_topic = 'ABCD000002';
    user1.phone = '+8562056859450';
    user1.verify_at = new Date();
    const newUser = await usersRepository.save([user, user1]);

    const profile = new ProfileEntity();
    profile.id = 1;
    profile.user_id = newUser[0].id;
    profile.first_name = 'test';
    profile.last_name = 'test';
    profile.position = 'dev';
    await profileRepository.save(profile);
  }
}
