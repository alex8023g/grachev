import { bucket, minioClient } from '@/lib/s3minioClient';
import { Readable } from 'stream';

export async function GET(req: Request) {
  const requestHeaders = new Headers(req.headers);
  const range = requestHeaders.get('range');
  console.log('🚀 ~ GET ~ range:', range, req.method);

  // const objectName = req.url.split('?')[1];
  const objectName = decodeURI(new URL(req.url).search).substring(1);

  const stats = await minioClient.statObject(bucket, objectName);

  const videoSize = stats.size;
  // const start = Number(range?.replace(/\D/g, ''));
  const start = Number(range?.split('=')[1].split('-')[0]);
  console.log('🚀 ~ GET ~ start:', start);
  // const end = Math.min(start + 1000_000, videoSize - 1);
  const end = Number(range?.split('=')[1].split('-')[1]) || videoSize - 1;
  console.log('🚀 ~ GET ~ end:', end);

  const res = await minioClient.getPartialObject(
    bucket,
    objectName,
    start,
    end,
  );
  const data: ReadableStream = iteratorToStream(nodeStreamToIterator(res));
  console.log('🚀 ~ GET ~ data:', data);

  let retrievedLength;
  if (start !== undefined && end !== undefined) {
    retrievedLength = end + 1 - start;
  } else if (start !== undefined) {
    retrievedLength = videoSize - start;
  } else if (end !== undefined) {
    retrievedLength = end + 1;
  } else {
    retrievedLength = videoSize;
  }

  return new Response(data, {
    status: 206,
    headers: {
      'Accept-Ranges': `bytes`,
      Connection: 'Keep-Alive',
      // 'Content-Length': `${end - start + 1}`,
      'Content-Length': `${retrievedLength}`,
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      // 'Content-Type': stats.metaData['Content-Type'],
      'Content-Type': 'video/mp4',
      'X-Playback-Session-Id': 'someRandom-chars-like.uuid',
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

export async function HEAD(req: Request) {
  console.log('🚀 ~ HEAD ~ req:', req.method);

  const objectName = decodeURI(new URL(req.url).search).substring(1);

  const stats = await minioClient.statObject(bucket, objectName);

  const videoSize = stats.size;
  return new Response('', {
    status: 200,
    headers: {
      'Accept-Ranges': `bytes`,

      'Content-Length': `${videoSize + 1}`,
    },
  });
}
