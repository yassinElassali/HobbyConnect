export function getFromStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setInStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromStorage(key: string): void {
  localStorage.removeItem(key);
}

export function clearStorage(): void {
  localStorage.clear();
}