import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { StorageFileHandlerService } from 'src/infrastructure/storage/file-storage-service';
import { DriveConfigurationService } from 'src/infrastructure/storage/drive-config';
import { JsonMessageParserService } from 'src/infrastructure/json-parser/json-parser.service';
import { User } from 'src/domain/user/user.entity';

export default class UserLocalSeeder implements Seeder {
  private storageService: StorageFileHandlerService;
  private configService: ConfigService;
  private programsSeedFilePath: string;
  private fileName: string = 'users.json';
  track?: boolean = true;

  constructor() {
    this.storageService = new StorageFileHandlerService(
      new ConfigService(),
      new DriveConfigurationService(),
      new JsonMessageParserService(),
    );
    this.configService = new ConfigService();
    this.programsSeedFilePath =
      this.configService.get<string>('SEED_FILES_PATH') + this.fileName;
  }

  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);
    const users = await this.storageService.getFile(this.programsSeedFilePath);

    await repository.insert(users);
  }
}