import {Injectable} from '@nestjs/common';
import {CreateRefundDto} from './dto/create-refund.dto';
import {UpdateRefundDto} from './dto/update-refund.dto';

@Injectable()
export class RefundsService {
  create(createRefundDto: CreateRefundDto) {
    return 'This action adds a new refund';
  }

  findAll() {
    return {
      data: [],
    };
  }

  findOne(id: string) {
      return `This action returns a #${id} refund`;
  }

    update(id: string, updateRefundDto: UpdateRefundDto) {
        return `This action updates a #${id} refund`;
    }

    remove(id: string) {
        return `This action removes a #${id} refund`;
    }
}
