const COOKIE_NAME = 'cv_tutorial_seen';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, maxAge) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/`;
}

const steps = [
  {
    target: null,
    title: 'Welcome!',
    text: 'Let me walk you through the interactive features of this CV. Click <strong>Next</strong> to start, or skip if you prefer to explore on your own.',
  },
  {
    target: '#menu-toggle',
    title: 'Navigation Menu',
    text: 'This button opens and closes the side panel containing all customization options.',
  },
  {
    target: '#toggle-design',
    title: 'Layout Toggle',
    text: 'Switch between a single-column and a two-column layout for the CV.',
  },
  {
    target: '#extra-description',
    title: 'Detailed Descriptions',
    text: 'Toggle this to expand each experience with a more detailed description of the work done.',
  },
  {
    target: '#color-form',
    title: 'Color Palette',
    text: 'Choose a color scheme to match your taste — or click <strong>?</strong> for a fully random combination!',
  },
  {
    target: '#display-options',
    title: 'Display Options',
    text: 'Use these checkboxes to show or hide individual sections of the CV — handy when printing or sharing a focused view.',
  },
  {
    target: '#experience-filter',
    title: 'Experience Filter',
    text: 'Type a technology or keyword and press Enter to filter the experience list. You can also click any tech tag directly.',
  },
  {
    target: null,
    title: '🥚 Easter Egg',
    text: 'There\'s a hidden easter egg somewhere in the CV. Interact with things and see if you can find it!',
  },
  {
    target: '#downloadButton',
    title: 'Download as PDF',
    text: 'Save this CV as a PDF file with your current layout and color settings applied.',
  },
];

class Tutorial {
  constructor() {
    this.overlay = null;
    this.highlight = null;
    this.tooltip = null;
  }

  start() {
    this._createElements();
    this._showStep(0);
  }

  _createElements() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'tutorial-overlay';
    document.body.appendChild(this.overlay);

    this.highlight = document.createElement('div');
    this.highlight.id = 'tutorial-highlight';
    document.body.appendChild(this.highlight);

    this.tooltip = document.createElement('div');
    this.tooltip.id = 'tutorial-tooltip';
    document.body.appendChild(this.tooltip);
  }

  _showStep(index) {
    const step = steps[index];
    const isLast = index === steps.length - 1;
    const isFirst = index === 0;
    const stepLabel = isFirst ? '' : `Step ${index} of ${steps.length - 1}`;

    this.tooltip.innerHTML = `
      <div class="tut-counter">${stepLabel}</div>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
      <div class="tut-actions">
        <button class="tut-btn tut-skip">Skip tour</button>
        <button class="tut-btn tut-next">${isLast ? 'Done ✓' : 'Next →'}</button>
      </div>
    `;

    this.tooltip.querySelector('.tut-next').addEventListener('click', () => {
      if (isLast) this._finish();
      else this._showStep(index + 1);
    });
    this.tooltip.querySelector('.tut-skip').addEventListener('click', () => this._finish());

    if (step.target) {
      const el = document.querySelector(step.target);
      if (el) {
        this._positionHighlight(el);
        this._positionTooltipNear(el);
        this.highlight.style.display = 'block';
        this.overlay.classList.remove('tut-dim');
      }
    } else {
      this.highlight.style.display = 'none';
      this.overlay.classList.add('tut-dim');
      this._centerTooltip();
    }
  }

  _positionHighlight(el) {
    const rect = el.getBoundingClientRect();
    const pad = 8;
    Object.assign(this.highlight.style, {
      top: `${rect.top - pad}px`,
      left: `${rect.left - pad}px`,
      width: `${rect.width + pad * 2}px`,
      height: `${rect.height + pad * 2}px`,
    });
  }

  _positionTooltipNear(el) {
    const rect = el.getBoundingClientRect();
    const TW = 290;
    const TH = 210;
    const gap = 20;

    let left = rect.right + gap;
    let top = rect.top;

    if (left + TW > window.innerWidth - gap) {
      left = rect.left - TW - gap;
    }
    left = Math.max(gap, Math.min(left, window.innerWidth - TW - gap));
    top = Math.max(gap, Math.min(top, window.innerHeight - TH - gap));

    Object.assign(this.tooltip.style, {
      left: `${left}px`,
      top: `${top}px`,
      transform: 'none',
    });
  }

  _centerTooltip() {
    Object.assign(this.tooltip.style, {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    });
  }

  _finish() {
    setCookie(COOKIE_NAME, '1', COOKIE_MAX_AGE);
    [this.overlay, this.highlight, this.tooltip].forEach(el => el.remove());
  }
}

window.addEventListener('load', () => {
  if (window.innerWidth < 768) return;
  if (getCookie(COOKIE_NAME)) return;
  new Tutorial().start();
});