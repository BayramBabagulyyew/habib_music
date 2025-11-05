import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { FileModel } from './files.model';
import { MediaModel } from './medias.model';

@Table({ tableName: 'reels' })
export class ReelsModel extends Model<ReelsModel> {

  @BelongsTo(() => FileModel, { as: 'thumbnail', foreignKey: 'thumbnailId' })
  thumbnail: FileModel;

  @ForeignKey(() => FileModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  thumbnailId: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  likeCount: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  dislikeCount: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  listenCount: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  downloadCount: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  shareCount: number;

  @BelongsTo(() => MediaModel)
  media: MediaModel;

  @ForeignKey(() => MediaModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  mediaId: number;

  @BelongsTo(() => FileModel, { as: 'reels', foreignKey: 'reelsId' })
  reels: FileModel;

  @ForeignKey(() => FileModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  reelsId: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  lyrics: string;

}
