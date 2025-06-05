type EventCallback = (data: unknown) => void;

const eventBus = {
  on(event: string, callback: EventCallback) {
    const listener = (e: Event) => callback((e as CustomEvent).detail);
    document.addEventListener(event, listener);
    return listener;
  },
  dispatch(event: string, data?: unknown) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: string, listener: EventListenerOrEventListenerObject) {
    document.removeEventListener(event, listener);
  },
};

export default eventBus;
