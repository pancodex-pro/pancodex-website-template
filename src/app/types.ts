export type TagValueSource =
    'useRootDocumentValue'
    | 'useParentDocumentValue'
    | 'useCustomValue';

export type MetaTag_ContentData = {
    tagSource: TagValueSource;
    tagValue: string;
};

export type MetaTags_ContentData = {
    description: MetaTag_ContentData;
    robots: MetaTag_ContentData;
};

export type SectionType =
    'SECTION_HEADER' |
    'SECTION_PARAGRAPH' |
    'SECTION_DIVIDER' |
    'SECTION_IMAGE' |
    'SECTION_CTA';

export type Text_ContentData = {
    htmlText: string;
};

export type Image_ContentData = {
    altText: string;
    useImageUrlDesktopForAll?: boolean;
    imageUrlDesktop: string;
    imageUrlTablet?: string;
    imageUrlMobile?: string;
};

export type CallToAction_ContentData = {
    title: string;
    actionUrl: string;
};

export type Section_ContentData = {
    sectionType: SectionType;
    headerText?: Text_ContentData;
    paragraphText?: Text_ContentData;
    image?: Image_ContentData;
    cta?: CallToAction_ContentData;
};

export type BasicPage_ContentData = {
    metaTags: MetaTags_ContentData;
    hero: Array<Section_ContentData>;
    body: Array<Section_ContentData>;
};

export type LocaleType = string; // todo: add all other locales except orcs' locale
export type DocumentType = 'site' | 'main_page' | 'root_page' | 'page';

export type DocumentContent_Proxy = {
    title: string;
    slug: string;
    dateUpdated: number;
    contentData: BasicPage_ContentData;
};

export type Document_Proxy = {
    id: string; // file name
    type: DocumentType;
    contents: Record<LocaleType, DocumentContent_Proxy>;
};

export type DocumentRecord_Proxy = Pick<Document_Proxy, 'id' | 'type'> & {
    contents: Partial<Record<LocaleType, Pick<DocumentContent_Proxy, 'title' | 'slug'>>>;
    children: Array<DocumentRecord_Proxy>;
};

export type SiteMap_Proxy = {
    defaultLocale: LocaleType;
    root: DocumentRecord_Proxy;
};
