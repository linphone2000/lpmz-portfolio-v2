// Utility function for conditional classes
export const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');
