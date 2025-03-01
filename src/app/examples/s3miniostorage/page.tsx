import { getMinioFileList } from '../../actions/minioActions';
import { DropZoneBlock } from '@/components/forS3MinioStorage/DropZoneBlock';
import { MinioOjectType } from '../../../lib/s3minioClient';
import { DownloadItem } from '@/components/forS3MinioStorage/DownloadItem';
import { BucketItemStat } from 'minio';
import { MinioItem } from '@/components/forS3MinioStorage/MinioItem';

export default async function HomePage() {
  const minioItemsList: (MinioOjectType & BucketItemStat)[] =
    await getMinioFileList();
  // console.log('🚀 ~ HomePage ~ res:', minioItemsList);
  return (
    <>
      <ul className='flex flex-wrap justify-start'>
        {minioItemsList.map((minioItem) => (
          <li key={minioItem.name} className='mb-5 mr-5 min-h-40'>
            <MinioItem data={minioItem} />
            <div className='flex'>
              <DownloadItem name={minioItem.name} />
              <span className='text-sm'>{minioItem.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <DropZoneBlock />
    </>
  );
}
