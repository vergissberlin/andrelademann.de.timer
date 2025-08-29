export async function registerServiceWorker() {
  if (import.meta.env.DEV) {
    try {
      const regs = await navigator.serviceWorker?.getRegistrations?.();
      regs?.forEach((r) => r.unregister());
    } catch {}
    return;
  }
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (e) {
      // ignore
    }
  }
}

