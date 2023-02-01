import {Injectable, NotFoundException} from '@nestjs/common';
import {paginate} from 'src/common/pagination/paginate';
import {CreateTagDto} from './dto/create-tag.dto';
import {GetTagsDto} from './dto/get-tags.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {Tag} from './entities/tag.entity';
import tagsJson from '@db/tags.json';
import {plainToClass} from 'class-transformer';
import Fuse from 'fuse.js';

const tags = plainToClass(Tag, tagsJson);

const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(tags, options);

@Injectable()
export class TagsService {
  private tags: Tag[] = tags;

  create(createTagDto: CreateTagDto) {
    return {
        _id: this.tags.length + 1,
        ...createTagDto,
    };
  }

  findAll({page, limit, search}: GetTagsDto) {
    if (!page) page = 1;
    let data: Tag[] = this.tags;

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
          .search({
            $and: searchText,
          })
          ?.map(({item}) => item);
    }

    const url = `/tags?limit=${limit}`;
    return {
      data,
      ...paginate(this.tags.length, page, limit, this.tags.length, url),
    };
  }

    findOne(param: string, language: string) {
        const tag = this.tags.find(
            (singleTag) => singleTag._id === String(param) || singleTag.slug === param,
        );

        if (!tag) {
            throw new NotFoundException();
        }

        return tag;
    }

    update(id: string, updateTagDto: UpdateTagDto) {
        return this.tags[0];
    }

    remove(id: string) {
        return `This action removes a #${id} tag`;
    }
}
