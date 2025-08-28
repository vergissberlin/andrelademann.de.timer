import React from 'react';
import { Button } from './ui/button';
import { readPrefs, writePrefs } from '../lib/storage';

export const ThemeSwitcher: React.FC = () => {
  const [mode, setMode] = React.useState(readPrefs().theme);
  const setClass = (val: 'dark' | 'light' | 'system') => {
    if (val === 'dark') document.documentElement.classList.remove('light');
    else if (val === 'light') document.documentElement.classList.add('light');
    setMode(val);
    const p = readPrefs();
    writePrefs({ ...p, theme: val });
  };
  return (
    <div className="flex gap-2">
      <Button variant={mode === 'system' ? 'default' : 'outline'} onClick={() => setClass('system')}>System</Button>
      <Button variant={mode === 'light' ? 'default' : 'outline'} onClick={() => setClass('light')}>Light</Button>
      <Button variant={mode === 'dark' ? 'default' : 'outline'} onClick={() => setClass('dark')}>Dark</Button>
    </div>
  );
};

