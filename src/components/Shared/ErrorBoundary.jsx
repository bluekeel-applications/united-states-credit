import React from 'react';

// Catches render/lazy-load failures so a failed route (e.g. a ChunkLoadError
// that survived lazyWithRetry's one reload) shows a recoverable message instead
// of a blank page. Auto-reload is handled by lazyWithRetry; this is the safety
// net + manual retry.
const fallbackStyle = {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#162033',
};

const buttonStyle = {
    background: '#003a8c',
    color: '#fff',
    border: 'none',
    borderRadius: 999,
    padding: '12px 22px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    marginTop: 14,
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // eslint-disable-next-line no-console
        console.error('ErrorBoundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div style={fallbackStyle}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>This page didn’t load correctly.</div>
                    <div style={{ fontSize: 14, color: '#667085', marginTop: 6 }}>
                        Please reload to try again.
                    </div>
                    <button type="button" style={buttonStyle} onClick={() => window.location.reload()}>
                        Reload
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
