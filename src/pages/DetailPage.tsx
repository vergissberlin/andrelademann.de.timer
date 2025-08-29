import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TimerDisplay } from '../components/TimerDisplay';
import { longBeep3s, shortBeep } from '../lib/audio';
import { formatMmSs, secondsUntil } from '../lib/time';
import { getEventById } from '../lib/events-repo';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

export const DetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [remaining, setRemaining] = React.useState(0);
  const [untilStart, setUntilStart] = React.useState<number | null>(null);
  const [title, setTitle] = React.useState('Event');

  React.useEffect(() => {
    let tick: number | null = null;
    (async () => {
      if (!id) return;
      const ev = await getEventById(id);
      if (!ev) return;
      setTitle(ev.title);
      const startMs = new Date(ev.startDateTime).getTime();
      const endMs = startMs + ev.durationSeconds * 1000;
      const loop = () => {
        const now = Date.now();
        if (now < startMs) {
          setUntilStart(Math.max(0, Math.floor((startMs - now) / 1000)));
          setRemaining(ev.durationSeconds);
        } else {
          setUntilStart(null);
          const left = Math.max(0, Math.floor((endMs - now) / 1000));
          setRemaining(left);
          if (left === 60) shortBeep();
          if (left === 0) {
            longBeep3s();
            navigate('/');
            return;
          }
        }
        tick = window.setTimeout(loop, 1000);
      };
      loop();
    })();
    return () => { if (tick) clearTimeout(tick); };
  }, [id, navigate]);

  const blink = remaining <= 60 && remaining > 0;
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {untilStart !== null ? (
        <div className="text-sm opacity-70">Starts in {formatMmSs(untilStart)}</div>
      ) : remaining > 0 ? (
        <div className="text-sm opacity-70">{formatMmSs(remaining)} remaining</div>
      ) : (
        <Alert>
          <AlertTitle>Beendet</AlertTitle>
          <AlertDescription>Dieses Event ist beendet.</AlertDescription>
        </Alert>
      )}
      <div className="w-full h-[60vh]">
        <TimerDisplay remainingSeconds={remaining} blink={blink} />
      </div>
      <div>
        <Link to="/" className="text-primary underline">Back</Link>
      </div>
    </div>
  );
};

