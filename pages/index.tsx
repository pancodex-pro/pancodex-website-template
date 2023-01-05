import React from 'react';
import type {NextPage, GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import Head from 'next/head'
import {PageDataProvider, createPageData, PageData} from '@pancodex/bridge';
import {DocumentDataFetchingStatus} from '../src/app/types';
import {fetchDocumentData} from '../src/app/fetchDocumentData';
import {Page} from '../src/theme';
import Custom404 from './404';

/**
 * As getStaticProps runs only on the server-side, it will never run on the client-side.
 * It won’t even be included in the JS bundle for the browser,
 * so you can write direct database queries without them being sent to browsers.
 *
 * @param context
 */
export async function getStaticProps(context: GetStaticPropsContext) {
    const dataFetchStatus: DocumentDataFetchingStatus = await fetchDocumentData(context.locale);
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

const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps> & { children?: React.ReactNode }) => {
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

export default Home
