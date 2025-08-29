import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import QRCode from 'qrcode.react';
import { Button } from './ui/button';

type Props = { open: boolean; onOpenChange(open: boolean): void };

export const QRCodeModal: React.FC<Props> = ({ open, onOpenChange }) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const copy = async () => navigator.clipboard.writeText(url);
  const openNew = () => window.open(url, '_blank');
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-4 rounded-md w-[320px] shadow">
          <Dialog.Title className="font-semibold mb-2">QR</Dialog.Title>
          <div className="flex justify-center mb-3">
            <QRCode value={url} size={200} includeMargin />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={copy}>Copy</Button>
            <Button onClick={openNew}>Open</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

