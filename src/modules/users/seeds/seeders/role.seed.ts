import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RoleEntity } from '../../entities/role.entity';
import { PermissionEntity } from '../../entities/permission.entity';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(RoleEntity);
    const perimssions = await dataSource.getRepository(PermissionEntity).find();

    const datas = [
      {
        id: 1,
        name: 'super-admin',
        description: 'this is super admin',
        isDefault: true,
      },
      {
        id: 2,
        name: 'dev',
        description: 'this is super developer',
        isDefault: true,
      },
      {
        id: 3,
        name: 'customer',
        description: 'this is customer',
        isDefault: true,
      },
      {
        id: 4,
        name: 'admin',
        description: 'this is admin',
        isDefault: false,
      },
    ];

    await repository.save(
      datas.map((data) => {
        const model = new RoleEntity();
        model.id = data.id;
        model.name = data.name;
        model.description = data.description;
        model.is_default = data.isDefault;
        if (data.id === 4) {
          model.permissions = perimssions;
        }
        return model;
      }),
    );
  }
}
