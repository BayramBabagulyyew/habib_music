import { FileModel } from '@db/models';

export const fileProvider = [
  {
    provide: 'FILES',
    useValue: FileModel,
  },
];
