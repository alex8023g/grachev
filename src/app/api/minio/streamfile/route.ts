import { bucket, createMinioClient } from '@/lib/s3minioClient';
import { Readable } from 'stream';

export async function GET(req: Request) {
  const minioClient = createMinioClient();

  // const objectName = req.url.split('?')[1];
  const objectName = decodeURI(new URL(req.url).search).substring(1);

  try {
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
  } catch (error) {
    console.error(error);
  }
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
