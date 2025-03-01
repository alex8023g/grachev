export default function Home() {
  return (
    <>
      {/* <p>Hi, my name is Alexey. I`m a React / Node js developer.</p>
      <h1 className='mb-5'>Немного о себе</h1> */}
      <section className='mb-5'>
        <h3>Алексей Грачев</h3>
        <p>Россия, Москва</p>
      </section>
      <section className='mb-5'>
        <h3>Сфера деятельности:</h3>
        <p>
          Разрабатываю кроссплатформенные (в том числе для загрузки в AppStore и
          Google Play) web приложений с использованием технологического стека:
        </p>
        <ul className='list-disc'>
          {[
            'JavaScript',
            'TypeScript',
            'React',
            'Node.js',
            'MongoDB',
            'PostgreSQL',
            // 'Express.js',
            // 'NextJs',
          ].map((item) => (
            <li key={item} className='ml-5'>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className='mb-5'>
        <h3>Образование:</h3>
        <ul>
          <li className='ml-5'>
            Московский энергетический институт (в настоящее время НИУ МЭИ) по
            специальности инженер-электрик.
          </li>
          <li className='ml-5'>
            Курсы Skillbox по направлениям: Javascript, React, Node.js
            Веб-вёрстка.
          </li>
        </ul>
      </section>
      <section className='mb-5'>
        <h3>Текущие проекты:</h3>
        <ul>
          <li className='ml-5'>
            Система мониторинга систем учета электроэнергии
          </li>
          <li className='ml-5'>
            Визуализация объемов потребления электроэнергии
          </li>
          <li className='ml-5'>
            CRM для самозанятых и индивидуальных предпринимателей
          </li>
        </ul>
      </section>
      <section className='mb-5'>
        <h3>
          Перечень основных библиотек и фреймворков используемых мной в
          различных проектах:
        </h3>
        <ul>
          <li className='ml-5'>языки: TypeScript, JavaScript</li>
          <li className='ml-5'>
            библиотеки и фреймворки: React, React-Router, Redux, Redux-RTK,
            Zustand, Express.js,Classnames, Recharts, Styled-components,
            Next.js, MUI, React-beautiful-dnd,
          </li>
          <li className='ml-5'>базы данных: MongoDB, PostgreSQL, </li>
          <li className='ml-5'>система сборки: Webpack</li>
          <li className='ml-5'>серверное ПО: Node.js, Linux</li>
          <li className='ml-5'>система версионирования Git.</li>
          <li className='ml-5'>а также HTML, CSS, WebSocket, SSH, tmux.</li>
        </ul>
      </section>
      <section className='mb-5'>
        <h3>Контакты </h3>
        <ul>
          <li>
            telegram:{' '}
            <a className='underline' href='https://t.me/alex80231'>
              @alex80231
            </a>
          </li>
          <li>
            email:{' '}
            <a className='underline' href='mailto:alex8023@yandex.ru'>
              {' '}
              alex8023@yandex.ru{' '}
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
