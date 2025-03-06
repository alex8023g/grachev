import { getMinioFileList } from '../../actions/minioActions';
import { DropZoneBlock } from '@/components/forS3MinioStorage/DropZoneBlock';
import { MinioOjectType } from '../../../lib/s3minioClient';
import { DownloadItem } from '@/components/forS3MinioStorage/DownloadItem';
import { BucketItemStat } from 'minio';
import { MinioItem } from '@/components/forS3MinioStorage/MinioItem';

export default async function S3minioStoragePage() {
  const minioItemsList: (MinioOjectType & BucketItemStat)[] =
    await getMinioFileList();
  // console.log('🚀 ~ HomePage ~ res:', minioItemsList);
  return (
    <div className='flex h-full flex-col'>
      <ul className='flex flex-grow flex-wrap justify-start overflow-y-auto'>
        {minioItemsList.map((minioItem) => (
          <li
            key={minioItem.name}
            className='mb-5 mr-5 flex max-h-56 flex-col justify-end'
          >
            <MinioItem data={minioItem} />
            <div className='flex'>
              <DownloadItem name={minioItem.name} />
              <span className='max-w-32 truncate text-xs ...'>
                {minioItem.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <DropZoneBlock />
    </div>
  );
}
