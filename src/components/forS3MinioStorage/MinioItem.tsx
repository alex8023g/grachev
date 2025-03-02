'use client';
import { MinioOjectType } from '@/lib/s3minioClient';
import { BucketItemStat } from 'minio';
import { useRouter } from 'next/navigation';

export function MinioItem({ data }: { data: MinioOjectType & BucketItemStat }) {
  const router = useRouter();
  if (data.metaData['content-type'].includes('video')) {
    return (
      <video width='320' height='240' style={{ minHeight: '240px' }} controls>
        <source
          src={'/api/minio/streamvideo?' + data.name}
          type={data.metaData['content-type']}
        ></source>
        {data.name}
      </video>
    );
  } else if (data.metaData['content-type'].includes('image')) {
    return (
      <img
        src={'/api/minio/streamfile?' + data.name}
        height={100}
        width={100}
        alt=''
      />
    );
  } else if (
    data.metaData['content-type'].includes('application/msword') ||
    data.metaData['content-type'].includes(
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )
  ) {
    return (
      <img
        src={'/img/filetypes/msword.svg'}
        height={100}
        width={100}
        alt=''
        onClick={async () => {
          // window.open('/wordpreview?name=' + data.name);
          router.push('/wordpreview?name=' + data.name);
        }}
      />
    );
  } else if (data.metaData['content-type'].includes('application/pdf')) {
    return (
      <img
        src={'/img/filetypes/pdflogo.svg'}
        alt=''
        onClick={async () => {
          const res = await fetch('/api/minio/streamfile?' + data.name);
          const contentType = res.headers.get('content-type') || undefined;
          const result = await res.arrayBuffer();
          const blob = new Blob([result], { type: contentType });
          const urlBlob = URL.createObjectURL(blob);
          window.open(urlBlob);
        }}
      />
    );
  } else {
    return (
      <img
        src={'/img/filetypes/filequestion.svg'}
        height={100}
        width={100}
        alt=''
      />
    );
  }
}
