import React from 'react';
import type {GetStaticPaths, NextPage} from 'next';
import {GetStaticPropsContext, InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import {createPagePathDataList, PagePathData, PageData, createPageData, PageDataProvider} from '@pancodex/bridge';
import {SiteMapDataFetchStatus, DocumentDataFetchingStatus} from '../src/app/types';
import {fetchSiteMapData} from '../src/app/fetchSiteMapData';
import {fetchDocumentData} from '../src/app/fetchDocumentData';
import {Page} from '../src/theme';
import Custom404 from './404';

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async ({locales}) => {
    let paths: Array<PagePathData> = [];
    const siteMapDataStatus: SiteMapDataFetchStatus = await fetchSiteMapData();
    if (siteMapDataStatus.contextProxy) {
        paths = createPagePathDataList(siteMapDataStatus.contextProxy);
    }
    return {
        paths,
        // We'll pre-render only these paths at build time.
        // { fallback: blocking } will server-render pages
        // { fallback: false } means other routes should 404.
        // on-demand if the path doesn't exist.
        fallback: 'blocking'
    }
}

export async function getStaticProps({locale, params, defaultLocale}: GetStaticPropsContext) {
    const route_path = (params?.route_path as string[]) || [];
    console.log('[getStaticProps] route_path: ', route_path);
    if (route_path.length > 0) {
        // take the last section in the path and use it as a slug to find the page data
        let slug = route_path[route_path.length - 1];
        const dataFetchStatus: DocumentDataFetchingStatus = await fetchDocumentData(locale, slug);
        if (dataFetchStatus.isNotFound || !dataFetchStatus.contextProxy) {
            return {
                props: {},
                notFound: true,
            }
        } else {
            const pageData: PageData = createPageData(dataFetchStatus.contextProxy);
            return {
                props: {
                    pageData,
                },
                // Next.js will attempt to re-generate the page:
                // - When a request comes in
                // - At most once every 30 minutes
                revalidate: 60 * 30
            }
        }
    }
    // any failed scenario will lead to the not found result
    return {
        props: {},
        notFound: true,
    }
}

const RoutePage: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps> & { children?: React.ReactNode }) => {
    const {pageData} = props;
    if (pageData) {
        return (
            <>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title key="pageTitle">{pageData.title}</title>
                    <meta name="description" content={pageData.description} />
                    {/* Open Graph Data */}
                    <meta property="og:title" content={pageData.openGraphData.title} />
                    <meta property="og:description" content={pageData.openGraphData.description} />
                    <meta property="og:locale" content={pageData.openGraphData.locale} />
                    {/*<meta property="og:locale:alternate" content={locale} />*/}
                    {/*<meta property="og:locale:alternate" content={locale} />*/}
                    {/*<meta property="og:locale:alternate" content={locale} />*/}
                    {/*<meta property="og:locale:alternate" content={locale} />*/}
                    {/* Twitter summary card */}
                    <meta name="twitter:card" content={pageData.twitterCard.card} />
                    <meta name="twitter:title" content={pageData.twitterCard.title} />
                    <meta name="twitter:description" content={pageData.twitterCard.description} />
                    <meta name="twitter:image" content={pageData.twitterCard.image} />
                </Head>
                <PageDataProvider pageData={pageData}>
                    <Page/>
                </PageDataProvider>
            </>
        );
    }
    return (<Custom404/>);
}

export default RoutePage;
