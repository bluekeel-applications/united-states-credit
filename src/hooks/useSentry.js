import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const useSentry = (history) => {
    useEffect(() => {
        (function () {
            Sentry.init({
                dsn: 'https://e7b6d13933254ee29da1019e52d8447c@o440028.ingest.sentry.io/5407883',
                integrations: [new Integrations.BrowserTracing({
                    routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
                })],
                tracesSampleRate: 1.0,
                release: 'united-states-credit@' + process.env.npm_package_version,
            });
        })()

        return;
        // eslint-disable-next-line
    }, []);
};

export default useSentry;