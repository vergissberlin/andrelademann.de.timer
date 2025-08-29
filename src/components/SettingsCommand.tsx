import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Button } from './ui/button';
import { cn } from '../lib/cn';
import { readPrefs, writePrefs } from '../lib/storage';

export const SettingsCommand: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [prefs, setPrefs] = React.useState(readPrefs());

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const applyTheme = (val: 'system' | 'light' | 'dark') => {
    if (val === 'dark') document.documentElement.classList.remove('light');
    else if (val === 'light') document.documentElement.classList.add('light');
    const next = { ...prefs, theme: val };
    writePrefs(next);
    setPrefs(next);
  };

  const setLang = (lng: 'en' | 'de') => {
    const next = { ...prefs, language: lng };
    writePrefs(next);
    setPrefs(next);
    location.reload();
  };

  return (
    <div>
      <CommandPrimitive.Dialog open={open} onOpenChange={setOpen} label="Settings">
        <CommandPrimitive className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md border shadow-md md:min-w-[480px]">
          <div className="flex h-12 items-center gap-2 border-b px-3">
            <input placeholder="Settings..." className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden" />
          </div>
          <CommandPrimitive.List className="max-h-[300px] overflow-y-auto">
            <CommandPrimitive.Group heading="Theme">
              <CommandPrimitive.Item onSelect={() => applyTheme('system')}>System</CommandPrimitive.Item>
              <CommandPrimitive.Item onSelect={() => applyTheme('light')}>Light</CommandPrimitive.Item>
              <CommandPrimitive.Item onSelect={() => applyTheme('dark')}>Dark</CommandPrimitive.Item>
            </CommandPrimitive.Group>
            <CommandPrimitive.Separator />
            <CommandPrimitive.Group heading="Language">
              <CommandPrimitive.Item onSelect={() => setLang('en')}>English</CommandPrimitive.Item>
              <CommandPrimitive.Item onSelect={() => setLang('de')}>Deutsch</CommandPrimitive.Item>
            </CommandPrimitive.Group>
          </CommandPrimitive.List>
        </CommandPrimitive>
      </CommandPrimitive.Dialog>
    </div>
  );
};

