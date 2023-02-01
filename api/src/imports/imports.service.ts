import {Injectable} from '@nestjs/common';
import {ImportDto} from './dto/create-import.dto';

@Injectable()
export class ImportsService {
  create(createImportDto: ImportDto) {
    return 'This action adds a new import';
  }

  findAll() {
    return `This action returns all imports`;
  }

  findOne(id: string) {
      return `This action returns a #${id} import`;
  }

    remove(id: string) {
        return `This action removes a #${id} import`;
    }
}
