"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class LayoutView extends React.Component {
    render() {
        return React.createElement("div", { className: "home-page" },
            React.createElement("div", { className: "banner" },
                React.createElement("div", { className: "container" },
                    React.createElement("h1", { className: "logo-font" }, "conduit"),
                    React.createElement("p", null, "A place to share your knowledge."))),
            React.createElement("div", { className: "container page" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-9" },
                        React.createElement("div", { className: "feed-toggle" },
                            React.createElement("ul", { className: "nav nav-pills outline-active" },
                                React.createElement("li", { className: "nav-item" },
                                    React.createElement("a", { className: "nav-link disabled", href: "" }, "Your Feed")),
                                React.createElement("li", { className: "nav-item" },
                                    React.createElement("a", { className: "nav-link active", href: "" }, "Global Feed")))),
                        this.props.data.articles.map((article, key) => (React.createElement("div", { className: "article-preview", key: key },
                            React.createElement("div", { className: "article-meta" },
                                React.createElement("a", { href: "profile.html" },
                                    React.createElement("img", { src: article.author.image })),
                                React.createElement("div", { className: "info" },
                                    React.createElement("a", { href: "", className: "author" }, article.author.username),
                                    React.createElement("span", { className: "date" }, article.createdAt)),
                                React.createElement("button", { className: "btn btn-outline-primary btn-sm pull-xs-right" },
                                    React.createElement("i", { className: "ion-heart" }),
                                    " ",
                                    article.favoritesCount)),
                            React.createElement("a", { href: "", className: "preview-link" },
                                React.createElement("h1", null, article.title),
                                React.createElement("p", null, article.description),
                                React.createElement("span", null, "Read more..."))))),
                        React.createElement("nav", null,
                            React.createElement("ul", { className: "pagination" }, [1, 2, 3, 4, 5, 6, 7, 8].map((v) => (React.createElement("li", { className: this.props.data.currentPage === v ?
                                    "page-item active" : "page-item", key: v },
                                React.createElement("a", { onClick: (e) => {
                                        if (!e.ctrlKey) {
                                            e.preventDefault();
                                            this.props.navigate("/?page=" + v);
                                        }
                                    }, className: "page-link", href: "/?page=" + v }, v))))))),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("div", { className: "sidebar" },
                            React.createElement("p", null, "Popular Tags"),
                            React.createElement("div", { className: "tag-list" }, this.props.data.tags.map((tag) => React.createElement("a", { key: tag, href: "", className: "tag-pill tag-default" }, tag))))))));
    }
}
exports.default = LayoutView;
