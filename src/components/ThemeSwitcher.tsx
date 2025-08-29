import React from 'react';
import { readPrefs, writePrefs } from '../lib/storage';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Theme: {mode}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setClass('system')}>System</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setClass('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setClass('dark')}>Dark</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

