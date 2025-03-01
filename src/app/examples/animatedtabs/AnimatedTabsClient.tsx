'use client';
import { useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';

const tabs = ['one', 'two', 'three very large tab'] as const;
export type Tab = (typeof tabs)[number];
export function AnimatedTabsClient() {
  const [selectedTab, setSelectedTab] = useState<Tab>('one');

  return (
    <>
      <Flipper flipKey={selectedTab}>
        <ul className='relative mb-2 grid h-10 grid-flow-col justify-stretch rounded-lg bg-slate-100 p-1'>
          <li
            className='relative p-1 text-center text-sm font-semibold text-slate-500'
            onClick={() => setSelectedTab('one')}
          >
            {tabs[0]}
            {selectedTab === tabs[0] && (
              <Flipped flipId='tab'>
                <div className='absolute left-0 top-0 z-10 h-full w-full truncate whitespace-nowrap rounded-sm bg-white p-1 px-2 text-center text-sm font-semibold shadow-sm'>
                  {selectedTab}
                </div>
              </Flipped>
            )}
          </li>
          <li
            className='relative p-1 text-center text-sm font-semibold text-slate-500'
            onClick={() => setSelectedTab('two')}
          >
            {tabs[1]}
            {selectedTab === tabs[1] && (
              <Flipped flipId='tab'>
                <div className='absolute left-0 top-0 z-10 h-full w-full truncate whitespace-nowrap rounded-sm bg-white p-1 px-2 text-center text-sm font-semibold shadow-sm'>
                  {selectedTab}
                </div>
              </Flipped>
            )}
          </li>
          <li
            className='relative p-1 text-center text-sm font-semibold text-slate-500'
            onClick={() => setSelectedTab('three very large tab')}
          >
            {tabs[2]}
            {selectedTab === tabs[2] && (
              <Flipped flipId='tab'>
                <div className='absolute left-0 top-0 z-10 h-full w-full truncate whitespace-nowrap rounded-sm bg-white p-1 px-2 text-center text-sm font-semibold shadow-sm'>
                  {selectedTab}
                </div>
              </Flipped>
            )}
          </li>
        </ul>
      </Flipper>
      <div className='flex grow'>
        <span className='m-auto text-5xl font-bold'>{selectedTab}</span>
      </div>
    </>
  );
}
