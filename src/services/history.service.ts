const HISTORY_KEY = "HDB"

export function getStoredStrings(): string[] {
    const storedStrings = localStorage.getItem(HISTORY_KEY);
    if (storedStrings) {
      return JSON.parse(storedStrings);
    }
    return [];
}

export function getStrings(): string[] {
    return getStoredStrings();
}

export function saveString(str: string): void {
    const existingStrings = getStoredStrings();
    if (existingStrings.includes(str)) return;
    
    existingStrings.push(str);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(existingStrings));
}
  