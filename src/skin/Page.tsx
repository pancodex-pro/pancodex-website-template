import React from 'react';
import {PageData, usePageData} from '../api';

export function Page() {
    const pageData: PageData = usePageData();
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
