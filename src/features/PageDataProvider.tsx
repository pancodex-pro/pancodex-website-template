import React, { ReactNode } from 'react';
import { PageData } from 'api/types';

export type PageDataProviderProps = {
    data?: PageData;
    children: ReactNode;
};

export const PageDataContext = React.createContext<PageData>(null);

export const PageDataProvider: React.FC<PageDataProviderProps> = (props) => {
    const { children, data } = props;
    return (
        <PageDataContext.Provider value={data}>
            {children}
        </PageDataContext.Provider>
    );
};
