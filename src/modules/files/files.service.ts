import { FileHelper } from '@common/helpers/file-delete.helper';
import { FileModel } from '@db/models';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilesDto } from './dto/create-file.dto';
import { ImageMapper, MulterFile } from './file.mapper';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILES')
    private readonly file: typeof FileModel,
  ) { }

  async create(dto: CreateFilesDto, files: MulterFile[]) {
    const mappedData: CreateFilesDto[] = ImageMapper.toDataBase(dto, files);
    const createFileDto = await this.file.bulkCreate(mappedData as any);
    return createFileDto
  }


  async findOne(id: number) {
    const file = await this.file.findByPk(id);
    if (!file) {
      throw new NotFoundException('File tapylmady!');
    }
    return ImageMapper.toDto(file);
  }

  async remove(id: number) {
    const file = await this.file.findByPk(id);
    if (!file) {
      throw new NotFoundException('File tapylmady!');
    }
    FileHelper.deleteFileSilent(file.file);
    await this.file.destroy({ where: { id } });
    return;
  }
}
