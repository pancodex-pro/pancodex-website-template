(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PancodexTheme = {}));
})(this, (function (exports) { 'use strict';

    function HeaderSection({ htmlText }) {
        return (React.createElement("div", { className: "prose lg:prose-xl", dangerouslySetInnerHTML: { __html: htmlText } }));
    }
    function RootPage() {
        const pageData = pancodexBridge.usePageData();
        if (pageData) {
            const { navigation: { siteNavigation, pageNavigation, topLevelNavigation }, content: { hero, body }, title } = pageData;
            return (React.createElement("div", null,
                React.createElement("p", { className: "p-4 font-bold bg-blue-600 text-blue-100 font-light" }, title),
                React.createElement("div", { className: "p-4 flex flex-row" }, topLevelNavigation.map((menuItem) => {
                    return (React.createElement("div", { key: menuItem.id, className: "px-3" },
                        React.createElement(pancodexPlatform.Link, { href: menuItem.url }, menuItem.title)));
                })),
                hero.map((heroItem) => {
                    if (heroItem.type === 'HEADER') {
                        return (React.createElement(HeaderSection, { key: heroItem.id, htmlText: heroItem.htmlText }));
                    }
                    else {
                        return (React.createElement("code", { key: heroItem.id },
                            React.createElement("pre", null, JSON.stringify(heroItem, null, 4))));
                    }
                }),
                React.createElement("div", { className: "p-4" },
                    React.createElement("code", null,
                        React.createElement("pre", null, JSON.stringify(siteNavigation, null, 4)))),
                React.createElement("div", { className: "p-4" },
                    React.createElement("code", null,
                        React.createElement("pre", null, JSON.stringify(pageNavigation, null, 4))))));
        }
        return null;
    }

    function Page() {
        return (React.createElement(RootPage, null));
    }

    exports.Page = Page;

}));
