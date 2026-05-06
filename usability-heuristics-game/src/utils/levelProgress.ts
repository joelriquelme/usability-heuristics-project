// Simple localStorage wrapper for tracking completed levels
const STORAGE_KEY = 'uh_levels_completed';

type ProgressMap = Record<string, boolean>;

const read = (): ProgressMap => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to read level progress from localStorage', e);
    return {};
  }
};

const write = (map: ProgressMap) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Failed to write level progress to localStorage', e);
  }
};

export const markLevelCompleted = (levelId: string) => {
  const map = read();
  map[levelId] = true;
  write(map);
};

export const isLevelCompleted = (levelId: string): boolean => {
  const map = read();
  return !!map[levelId];
};

export const clearAllProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear level progress', e);
  }
};

export const getAllCompleted = (): string[] => {
  return Object.keys(read()).filter((k) => read()[k]);
};

// Tutorial seen flag (stored separately)
const TUTORIAL_KEY = 'uh_tutorial_seen';

export const markTutorialSeen = () => {
  try {
    localStorage.setItem(TUTORIAL_KEY, '1');
  } catch (e) {
    console.error('Failed to mark tutorial seen', e);
  }
};

export const isTutorialSeen = (): boolean => {
  try {
    return localStorage.getItem(TUTORIAL_KEY) === '1';
  } catch (e) {
    console.error('Failed to read tutorial seen flag', e);
    return false;
  }
};

// Extend default export
const _default = {
  markLevelCompleted,
  isLevelCompleted,
  clearAllProgress,
  getAllCompleted,
  markTutorialSeen,
  isTutorialSeen,
};

export default _default;
