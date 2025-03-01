import Image from 'next/image';

const certificates = [
  'CertSBJSAdvanced.png',
  'CertSBTS.png',
  'CertSBNodeJS.png',
  'CertSBReactJS.png',
  'CertSBWebLayout.png',
  'CertSBWebLayoutAdvanced.png',
];

export default async function CertificatesPage() {
  return (
    <>
      <ul className='flex flex-wrap justify-around gap-2'>
        {certificates.map((cert) => (
          <li key={cert} className='mb-5 overflow-hidden rounded-xl shadow-lg'>
            <Image
              src={'/img/certificates/' + cert}
              width={500}
              height={500}
              alt='Picture of the author'
            />
          </li>
        ))}
      </ul>
    </>
  );
}
