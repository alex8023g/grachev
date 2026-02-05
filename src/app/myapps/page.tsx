import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';

export default async function MyAppsPage() {
  const apps = [
    {
      name: 'Urlaubs planer',
      img: 'urlaubsplanner.png',
      url: 'https://otpuskplan.ru',
      description: 'NextJS, Postgres, Prisma ORM, Next Auth, Tailwind, Nginx',
      github: 'https://github.com/alex8023g/diary-1/tree/main',
    },
    {
      name: 'Beauty calendar',
      img: 'beautycalendarIOS.png',
      url: 'https://apps.apple.com/am/app/beauty-calendar/id6755293904',
      description: 'IOS app, React, Vite, Tailwind, Typescript, Capacitor',
      github: 'https://github.com/alex8023g/beauty-calendar',
    },
    {
      name: 'Diary web',
      img: 'diaryWeb.png',
      url: 'https://diarysimple.com',
      description:
        'NextJS, Postgres, Prisma ORM, Next Auth, Tailwind, Shadcn, Nginx, Certbot',
      github: 'https://github.com/alex8023g/diary-1/tree/main',
    },

    {
      name: 'Diary IOS',
      img: 'diaryappios.png',
      url: 'https://apps.apple.com/ru/app/diary-app/id6752512860',
      description:
        'Android приложение, в России открывать с android телефона или через vpn',
      github: 'https://github.com/alex8023g/diary-app',
    },
    {
      name: 'W-wave',
      img: 'wwave.png',
      url: 'https://w-wave-six.vercel.app',
      description: 'HTML, CSS, pixel-perfect',
      github: '',
    },
    {
      name: 'grachev.dev',
      img: 'grachevTable.png',
      url: 'https://grachev.dev',
      description: 'NextJs, Tailwind, Shadcn, S3 Minio Storage, Nginx',
      github: 'https://github.com/alex8023g/grachev',
    },
    {
      name: 'Diary android',
      img: 'diaryAndroid.png',
      url: 'https://play.google.com/store/apps/details?id=diary.app',
      description:
        'Android приложение, в России открывать с android телефона или через vpn',
      github: 'https://github.com/alex8023g/diary-app',
    },
    {
      name: 'Todooooit android',
      img: 'todooooit.png',
      url: 'https://play.google.com/store/apps/details?id=todo.cap.v1.com',
      description:
        'Android приложение, в России открывать с android телефона или через vpn',
      github: 'https://github.com/alex8023g/todo-cap-1',
    },
    {
      name: 'Pomodoro',
      img: 'pomodoro.png',
      url: 'https://pomodoro-alpha-six.vercel.app',
      description: 'React, Typescript, React router, DnD, MUI',
      github: 'https://github.com/alex8023g/pomodoro',
    },
  ] as const;

  return (
    <>
      <ul className='flex flex-wrap'>
        {apps.map((app) => (
          <li
            key={app.name}
            className='mb-3 mr-3 flex flex-col overflow-hidden rounded-lg border shadow-md'
          >
            <a
              href={app.url}
              target='_blank'
              className='outline outline-red-600'
            >
              <Image
                src={'/img/apps/' + app.img}
                width={500}
                height={500}
                alt='Picture of the author'
              />
            </a>
            <div className='flex-grow bg-slate-200 p-3'>
              <div className='max-w-[470px]'>
                <span className='font-semibold'>Description:&nbsp;</span>
                <span className='text-wrap'>{app.description}</span>
              </div>
              <div>
                {app.github && (
                  <a
                    href={app.github}
                    target='_blank'
                    className='flex align-bottom'
                  >
                    <span className='text-gray-600'>Github</span>
                    <SquareArrowOutUpRight
                      size={14}
                      color='gray'
                      className='ml-1 self-center'
                    />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
