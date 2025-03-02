import { bucket } from '@/lib/s3minioClient';
import { Readable } from 'stream';
import * as Minio from 'minio';

export async function GET(req: Request) {
  if (
    !process.env.MINIO_HOST ||
    !process.env.MINIO_PORT ||
    !process.env.MINIO_ACCESS_KEY ||
    !process.env.MINIO_SECRET_KEY ||
    !process.env.MINIO_BUCKET
  ) {
    throw new Error(
      '!process.env.MINIO_HOST || !process.env.MINIO_PORT ||  !process.env.MINIO_ACCESS_KEY || !process.env.MINIO_SECRET_KEY  ||   !process.env.MINIO_BUCKET',
    );
  }

  const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST,
    port: Number(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  });

  // const objectName = req.url.split('?')[1];
  const objectName = decodeURI(new URL(req.url).search).substring(1);

  const [stats, res] = await Promise.all([
    minioClient.statObject(bucket, objectName),
    minioClient.getObject(bucket, objectName),
  ]);
  const data: ReadableStream = iteratorToStream(nodeStreamToIterator(res));

  return new Response(data, {
    status: 206,
    headers: {
      'Content-Type': stats.metaData['content-type'],
    },
  });
}

async function* nodeStreamToIterator(stream: Readable) {
  for await (const chunk of stream) {
    yield new Uint8Array(chunk);
  }
}

function iteratorToStream(iterator: AsyncGenerator<Uint8Array, void, unknown>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}
