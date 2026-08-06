// Design tokens ported from the reference pages' :root custom properties.
// The font stack intentionally matches the reference verbatim — Inter is not
// loaded as a webfont there, so pixel parity requires the same fallback chain.
export const COLORS = {
    navy: '#123e73',
    navy2: '#0b2f59',
    blue: '#079dd4',
    red: '#f31c2a',
    ink: '#162434',
    muted: '#617184',
    line: '#dce5ec',
    soft: '#f4f8fb',
    white: '#fff',
    green: '#168466',
};

export const SHADOW = '0 18px 48px rgba(17,54,91,.14)';
export const RADIUS = 18;
export const MAX_WIDTH = 1160;
export const FONT_STACK = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

// The reference has exactly two breakpoints.
export const MOBILE = '@media (max-width: 520px)';
export const DESKTOP = '@media (min-width: 760px)';

// .container{width:min(calc(100% - 28px),var(--max));margin:auto}
export const container = {
    width: `min(calc(100% - 28px), ${MAX_WIDTH}px)`,
    margin: 'auto',
};

// Reference body styles, applied to each page's root div. width/textAlign/
// fontWeight also neutralize the app shell (centered flex column, bold body).
export const pageRoot = {
    width: '100%',
    textAlign: 'left',
    fontWeight: 400,
    boxSizing: 'border-box',
    margin: 0,
    fontFamily: FONT_STACK,
    color: COLORS.ink,
    lineHeight: 1.58,
    background: '#fff',
    WebkitFontSmoothing: 'antialiased',
};

// a{color:inherit} — also overrides the app's global link color/decoration.
export const inheritLink = {
    color: 'inherit',
};

// img{max-width:100%;display:block} — width:auto counters the app's img{width:100%}.
export const baseImg = {
    width: 'auto',
    maxWidth: '100%',
    display: 'block',
};
