import Image from 'next/image';

export default async function MyAppsPage() {
  const apps = [
    {
      name: 'Diary web',
      img: 'diaryWeb.png',
      url: 'https://simplediary.io',
    },
    {
      name: 'Diary android',
      img: 'diaryAndroid.png',
      url: 'https://play.google.com/store/apps/details?id=diary.app',
    },
    {
      name: 'Todooooit android',
      img: 'todooooit.png',
      url: 'https://play.google.com/store/apps/details?id=todo.cap.v1.com',
    },
    {
      name: 'Pomodoro',
      img: 'pomodoro.png',
      url: 'https://pomodoro-alpha-six.vercel.app',
    },
  ];
  return (
    <>
      <ul className='flex flex-wrap'>
        {apps.map((app) => (
          <li key={app.name} className=''>
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
          </li>
        ))}
      </ul>
    </>
  );
}
