import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { permissionDatas } from './permission-data';
import { PermissionEntity } from '../../entities/permission.entity';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(PermissionEntity);

    await repository.save(
      permissionDatas.map((data) => {
        const model = new PermissionEntity();
        model.id = data.id;
        model.name = data.name;
        model.description = data.description;
        model.type = data.type;
        model.display_name = data.display_name;
        return model;
      }),
    );
  }
}
