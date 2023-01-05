import {DocumentContext_Proxy, SiteMapDataContext_Proxy} from '@pancodex/bridge';

export type DocumentDataFetchingStatus = {
    contextProxy?: DocumentContext_Proxy;
    isUninitialized?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    isNotFound?: boolean;
    doRedirect?: boolean;
    defaultLocale?: string;
    pathname?: string;
    error?: string;
};

export type SiteMapDataFetchStatus = {
    contextProxy?: SiteMapDataContext_Proxy;
    isLoading?: boolean;
    isError?: boolean;
    error?: string;
};
