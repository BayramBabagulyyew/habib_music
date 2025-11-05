import { PaginationDto } from '@common/global-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryMediaDto extends PaginationDto {
    @ApiProperty({ type: 'number', required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    albumId?: number;

    @ApiProperty({ type: 'number', required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    genreId?: number;

    @ApiProperty({ type: 'boolean', required: false })
    @IsOptional()
    @Type(() => String)
    @IsString()
    video?: boolean;

    @ApiProperty({ type: 'boolean', required: false })
    @IsOptional()
    @Type(() => String)
    @IsString()
    audio?: boolean;

}
