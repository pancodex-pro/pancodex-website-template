import React from 'react';
import {PageData, usePageData} from '@pancodex/bridge';

export function Page() {
    const pageData: PageData | null = usePageData();
    return (
        <div>
            <pre>
                <code>
                    {JSON.stringify(pageData, null, 4)}
                </code>
            </pre>
        </div>
    );
}
