import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { Button } from './ui/button';
import { z } from 'zod';
import { EventSchema } from '../schemas';

type Props = {
  open: boolean;
  onOpenChange(v: boolean): void;
  onSubmit(e: z.infer<typeof EventSchema>): void;
};

export const EventDialog: React.FC<Props> = ({ open, onOpenChange, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [start, setStart] = React.useState(new Date().toISOString().slice(0, 16));
  const [duration, setDuration] = React.useState(600);
  const [description, setDescription] = React.useState('');
  const submit = () => {
    const entity = {
      id: crypto.randomUUID(),
      title,
      icon: 'clock',
      description,
      startDateTime: new Date(start).toISOString(),
      durationSeconds: Number(duration),
    };
    onSubmit(entity);
    onOpenChange(false);
  };
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-4 rounded-md w-[420px] shadow space-y-3">
          <Dialog.Title className="font-semibold">Add Event</Dialog.Title>
          <div className="space-y-2">
            <label className="block text-sm">Title<input className="w-full mt-1 px-2 py-1 rounded bg-foreground/5" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
            <label className="block text-sm">Start<input type="datetime-local" className="w-full mt-1 px-2 py-1 rounded bg-foreground/5" value={start} onChange={(e) => setStart(e.target.value)} /></label>
            <label className="block text-sm">Duration (sec)<input type="number" className="w-full mt-1 px-2 py-1 rounded bg-foreground/5" value={duration} onChange={(e) => setDuration(Number(e.target.value))} /></label>
            <label className="block text-sm">Description<textarea className="w-full mt-1 px-2 py-1 rounded bg-foreground/5" value={description} onChange={(e) => setDescription(e.target.value)} /></label>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={submit}>Save</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

