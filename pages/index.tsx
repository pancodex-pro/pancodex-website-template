import React from 'react';
import type {NextPage, GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import Head from 'next/head'
import {SiteMap_Proxy, DocumentRecord_Proxy, DocumentContent_Proxy, Document_Proxy} from '../src/app/types';
import {fetchDataFromFile} from '../src/app/fetchData';
import {PageData} from '../src/api';
import {PageDataProvider} from '../src/features/PageDataProvider';
import {Page} from '../src/skin';

/**
 * As getStaticProps runs only on the server-side, it will never run on the client-side.
 * It won’t even be included in the JS bundle for the browser,
 * so you can write direct database queries without them being sent to browsers.
 *
 * @param context
 */
export async function getStaticProps(context: GetStaticPropsContext) {
    const siteMap: SiteMap_Proxy | null = await fetchDataFromFile<SiteMap_Proxy>('data/siteMap.json');
    if (siteMap) {
        const mainPage: DocumentRecord_Proxy | undefined = siteMap.root.children.find(i => i.type === 'main_page');
        if (mainPage) {
            const document: Document_Proxy | null = await fetchDataFromFile<Document_Proxy>(`data/documents/${mainPage.id}.json`);
            if (document) {
                const mainPageContent: DocumentContent_Proxy = context.locale
                    ? document.contents[context.locale]
                    : document.contents[siteMap.defaultLocale];
                return {
                    props: {
                        documentContent: mainPageContent
                    },
                    // Next.js will attempt to re-generate the page:
                    // - When a request comes in
                    // - At most once every 30 minutes
                    revalidate: 60 * 30
                };
            }
        }
    }
    return {
        props: {},
        notFound: true,
    }
}

const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps> & { children?: React.ReactNode }) => {
    const {documentContent} = props;
    const pageData: PageData = {
        documentContent
    };
    return (
        <>
            <Head>
                <title key="pageTitle">{documentContent?.title}</title>
            </Head>
            <PageDataProvider data={pageData}>
                <Page />
            </PageDataProvider>
        </>
    )
}

export default Home
