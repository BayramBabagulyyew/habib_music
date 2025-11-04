import { FileTypeEnum } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateFilesDto {

    @IsOptional()
    @Exclude()
    type: FileTypeEnum;

    @ApiProperty({ type: 'string', format: 'binary', description: 'Files to upload' })
    @IsOptional()
    file: string;

    @IsOptional()
    @Exclude()
    duration: FileTypeEnum;

}