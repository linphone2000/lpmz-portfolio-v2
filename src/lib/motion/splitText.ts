'use client';

export type SplitResult = {
  words: HTMLElement[];
  chars: HTMLElement[];
  revert: () => void;
};

/**
 * Free SplitText stand-in: wraps words (and optionally chars) in spans.
 * Preserves original text via data attribute for revert.
 */
export function splitWords(
  el: HTMLElement,
  options: { chars?: boolean } = {}
): SplitResult {
  const original = el.innerHTML;
  const text = el.textContent ?? '';
  const words = text.split(/(\s+)/).filter((part) => part.length > 0);
  const wordEls: HTMLElement[] = [];
  const charEls: HTMLElement[] = [];

  el.setAttribute('aria-label', text.trim());
  el.innerHTML = '';

  words.forEach((part) => {
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
      return;
    }

    const word = document.createElement('span');
    word.className = 'split-word inline-block';
    word.style.willChange = 'transform, opacity';

    if (options.chars) {
      [...part].forEach((ch) => {
        const char = document.createElement('span');
        char.className = 'split-char inline-block';
        char.textContent = ch;
        char.style.willChange = 'transform, opacity';
        word.appendChild(char);
        charEls.push(char);
      });
    } else {
      word.textContent = part;
    }

    el.appendChild(word);
    wordEls.push(word);
  });

  return {
    words: wordEls,
    chars: charEls,
    revert: () => {
      el.innerHTML = original;
      el.removeAttribute('aria-label');
    },
  };
}
