import * as Minio from 'minio';

export type MinioOjectType = {
  name: string;
  lastModified: Date;
  etag: string;
  size: number;
};
// const MINIO_HOST = process.env.MINIO_HOST || 'minio-grachev';
// const MINIO_PORT = process.env.MINIO_PORT || '9000';
// const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || 'minioadmin';
// const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || 'minioadmin';
// const MINIO_BUCKET = process.env.MINIO_BUCKET || 'minio-bucket-1';
const MINIO_HOST = process.env.MINIO_HOST;
const MINIO_PORT = process.env.MINIO_PORT;
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;
const MINIO_BUCKET = process.env.MINIO_BUCKET;

if (
  !MINIO_HOST ||
  !MINIO_PORT ||
  !MINIO_ACCESS_KEY ||
  !MINIO_SECRET_KEY ||
  !MINIO_BUCKET
) {
  throw new Error(
    '!MINIO_HOST || !MINIO_PORT ||  !MINIO_ACCESS_KEY || !MINIO_SECRET_KEY  ||   !MINIO_BUCKET',
  );
}

export const minioClient = new Minio.Client({
  endPoint: MINIO_HOST,
  port: Number(MINIO_PORT),
  useSSL: false,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
});

export const bucket = MINIO_BUCKET;

export function createMinioClient() {
  if (
    !MINIO_HOST ||
    !MINIO_PORT ||
    !MINIO_ACCESS_KEY ||
    !MINIO_SECRET_KEY ||
    !MINIO_BUCKET
  ) {
    throw new Error(
      '!MINIO_HOST || !MINIO_PORT ||  !MINIO_ACCESS_KEY || !MINIO_SECRET_KEY  ||   !MINIO_BUCKET',
    );
  }

  return new Minio.Client({
    endPoint: MINIO_HOST,
    port: Number(MINIO_PORT),
    useSSL: false,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
  });
}
