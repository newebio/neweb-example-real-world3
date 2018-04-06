"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class SignUpView extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            name: "",
            email: "",
            password: "",
        };
    }
    render() {
        return (React.createElement("div", { className: "auth-page" },
            React.createElement("div", { className: "container page" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6 offset-md-3 col-xs-12" },
                        React.createElement("h1", { className: "text-xs-center" }, "Sign up"),
                        React.createElement("p", { className: "text-xs-center" },
                            React.createElement("a", { href: "" }, "Have an account?")),
                        this.props.data.errors ? this.props.data.errors.map((err) => (React.createElement("ul", { className: "error-messages" },
                            React.createElement("li", null, "That email is already taken")))) : null,
                        React.createElement("form", { onSubmit: (e) => {
                                e.preventDefault();
                                this.props.dispatch("signUp", this.state);
                            } },
                            React.createElement("fieldset", { className: "form-group" },
                                React.createElement("input", { onChange: (e) => this.setState({ name: e.target.value }), className: "form-control form-control-lg", type: "text", placeholder: "Your Name" })),
                            React.createElement("fieldset", { className: "form-group" },
                                React.createElement("input", { onChange: (e) => this.setState({ email: e.target.value }), className: "form-control form-control-lg", type: "text", placeholder: "Email" })),
                            React.createElement("fieldset", { className: "form-group" },
                                React.createElement("input", { onChange: (e) => this.setState({ password: e.target.value }), className: "form-control form-control-lg", type: "password", placeholder: "Password" })),
                            React.createElement("button", { type: "submit", className: "btn btn-lg btn-primary pull-xs-right" }, "Sign up")))))));
    }
}
exports.default = SignUpView;
