import { IViewProps, Link } from "neweb";
import React = require("react");
import { IData } from "./controller";
export default class LayoutView extends React.Component<IViewProps<{}, IData>, {}> {
    render() {
        return [<nav className="navbar navbar-light" key="header">
            <div className="container">
                <Link className="navbar-brand" href="/">conduit</Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        {/*<!-- Add "active" class when you're on that page" -->*/}
                        <Link className="nav-link active" href="/">Home</Link>
                    </li>
                    {this.props.data.isAuth ?
                        [<li className="nav-item">
                            <Link className="nav-link" href="">
                                <i className="ion-compose"></i>&nbsp;New Post</Link>
                        </li>,
                        <li className="nav-item">
                            <Link className="nav-link" href="/settings">
                                <i className="ion-gear-a"></i>&nbsp;Settings</Link>
                        </li>, <li className="nav-item">
                            <Link className="nav-link" href="/profile">{this.props.data.username}</Link>
                        </li>]
                        :
                        [<li className="nav-item">
                            <Link className="nav-link" href="/login">Sign in</Link>
                        </li>, <li className="nav-item">
                            <Link className="nav-link" href="/register">Sign up</Link>
                        </li>]}
                </ul>
            </div>
        </nav>,
        this.props.children,
        <footer key="footer">
            <div className="container">
                <a href="/" className="logo-font">conduit</a>
                <span className="attribution">An interactive learning project from
                    <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                </span>
            </div>
        </footer>,
        ];
    }
}
