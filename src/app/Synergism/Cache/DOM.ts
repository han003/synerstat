/**
 * A cache for DOM elements
 */
export const DOMCache = new Map<string, HTMLElement>();

export const DOMCacheGetOrSet = (id: string) => {
  return document.createElement('div') as any;
}
