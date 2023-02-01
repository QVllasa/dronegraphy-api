import {Injectable} from '@nestjs/common';

@Injectable()
export class UploadsService {
  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: string) {
      return `This action returns a #${id} upload`;
  }

    remove(id: string) {
        return `This action removes a #${id} upload`;
    }
}
