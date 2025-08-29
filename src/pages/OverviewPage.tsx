import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateMockEvents } from '../lib/mock';
import { EventRow, resolveStatus } from '../components/EventRow';
import { EventDataTable } from '../components/EventDataTable';
import { Button } from '../components/ui/button';
import { QRCodeModal } from '../components/QRCodeModal';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { EventDialog } from '../components/EventDialog';
import { clearEvents, addEvent, listEvents, saveMany } from '../lib/events-repo';
import { SettingsCommand } from '../components/SettingsCommand';

export const OverviewPage: React.FC = () => {
  const [events, setEvents] = React.useState<any[]>([]);
  const [openQR, setOpenQR] = React.useState(false);
  const navigate = useNavigate();
  const [addOpen, setAddOpen] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const existing = await listEvents();
      if (existing.length === 0) {
        const mocks = generateMockEvents();
        await saveMany(mocks as any);
        setEvents(mocks);
      } else {
        setEvents(existing);
      }
    })();
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => {
      // Auto-nav 30s vor Start zum Detail
      const now = Date.now();
      const next = events.find((e) => resolveStatus(e, now) === 'upcoming');
      if (next) {
        const start = new Date(next.startDateTime).getTime();
        if (start - now <= 30_000 && start - now > 0) {
          navigate(`/event/${next.id}`);
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [events, navigate]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="flex gap-2 items-center">
          <ThemeSwitcher />
          <Button onClick={async () => { const mocks = generateMockEvents(); await clearEvents(); await saveMany(mocks as any); setEvents(mocks); }}>Load Mock</Button>
          <Button variant="outline" onClick={async () => { await clearEvents(); setEvents([]); }}>Delete Mock</Button>
          <Button variant="outline" onClick={() => setAddOpen(true)}>Add Event</Button>
          <Button variant="outline" onClick={() => setOpenQR(true)}>QR</Button>
        </div>
      </div>
      <div className="mt-3">
        <EventDataTable data={events as any} onRowClick={(e) => navigate(`/event/${(e as any).id}`)} />
      </div>
      <SettingsCommand />
      <QRCodeModal open={openQR} onOpenChange={setOpenQR} />
      <EventDialog open={addOpen} onOpenChange={setAddOpen} onSubmit={async (e) => { await addEvent(e as any); setEvents((prev) => [...prev, e]); }} />
    </div>
  );
};

