import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TimerDisplay } from '../components/TimerDisplay';
import { longBeep3s, shortBeep } from '../lib/audio';
import { formatMmSs } from '../lib/time';

export const DetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [remaining, setRemaining] = React.useState(90);

  React.useEffect(() => {
    const start = performance.now();
    const total = remaining;
    const int = setInterval(() => {
      const elapsed = Math.floor((performance.now() - start) / 1000);
      const left = total - elapsed;
      setRemaining(left);
      if (left === 60) shortBeep();
      if (left === 0) {
        longBeep3s();
        clearInterval(int);
        navigate('/');
      }
    }, 1000);
    return () => clearInterval(int);
  }, [navigate]);

  const blink = remaining <= 60 && remaining > 0;
  const title = `Event`;
  return (
    <div className="p-4 h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="text-sm opacity-70">{formatMmSs(remaining)} remaining</div>
      <div className="w-full h-[60vh]">
        <TimerDisplay remainingSeconds={remaining} blink={blink} />
      </div>
      <div>
        <Link to="/" className="text-primary underline">Back</Link>
      </div>
    </div>
  );
};

