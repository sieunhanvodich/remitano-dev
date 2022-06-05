export function setData<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getData<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function clearData(key?: string) {
  if (key) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.clear();
}
