import { PaginationDto } from '@common/global-dto';
import { PaginationParams, type PaginationRequest } from '@common/libs/pagination';
import { SkipAuth, TOKEN_NAME } from '@modules/auth';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreService } from './genre.service';

@ApiBearerAuth(TOKEN_NAME)
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) { }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @SkipAuth()
  @Get()
  findAll(
    @PaginationParams() pagination: PaginationRequest<PaginationDto>,
    @Query() query: PaginationDto
  ) {
    return this.genreService.findAll(pagination, query);
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: CreateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
