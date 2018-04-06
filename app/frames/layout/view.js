"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class LayoutView extends React.Component {
    render() {
        return [React.createElement("nav", { className: "navbar navbar-light", key: "header" },
                React.createElement("div", { className: "container" },
                    React.createElement("a", { className: "navbar-brand", href: "index.html" }, "conduit"),
                    React.createElement("ul", { className: "nav navbar-nav pull-xs-right" },
                        React.createElement("li", { className: "nav-item" },
                            React.createElement("a", { className: "nav-link active", href: "/" }, "Home")),
                        this.props.data.isAuth ?
                            [React.createElement("li", { className: "nav-item" },
                                    React.createElement("a", { className: "nav-link", href: "" },
                                        React.createElement("i", { className: "ion-compose" }),
                                        "\u00A0New Post")),
                                React.createElement("li", { className: "nav-item" },
                                    React.createElement("a", { className: "nav-link", href: "" },
                                        React.createElement("i", { className: "ion-gear-a" }),
                                        "\u00A0Settings")), React.createElement("li", { className: "nav-item" },
                                    React.createElement("a", { className: "nav-link", href: "/profile" }, this.props.data.username))]
                            :
                                [React.createElement("li", { className: "nav-item" },
                                        React.createElement("a", { className: "nav-link", href: "/login" }, "Sign in")), React.createElement("li", { className: "nav-item" },
                                        React.createElement("a", { className: "nav-link", href: "/register" }, "Sign up"))]))),
            this.props.children,
            React.createElement("footer", { key: "footer" },
                React.createElement("div", { className: "container" },
                    React.createElement("a", { href: "/", className: "logo-font" }, "conduit"),
                    React.createElement("span", { className: "attribution" },
                        "An interactive learning project from",
                        React.createElement("a", { href: "https://thinkster.io" }, "Thinkster"),
                        ". Code & design licensed under MIT."))),
        ];
    }
}
exports.default = LayoutView;
