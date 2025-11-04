import { PartialType } from '@nestjs/swagger';
import { CreateFilesDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(CreateFilesDto) { }
