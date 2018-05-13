import { IViewProps, Link } from "neweb";
import React = require("react");
import ArticleItem from "./../../components/ArticleItem";
import { IData, IParams } from "./controller";
export default class HomeView extends React.Component<IViewProps<IParams, IData>, {}> {
    render() {
        console.log(this.props);
        return <div className="home-page">

            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">

                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {this.props.data.isAuth ? <li className="nav-item">
                                    <a className="nav-link" href="">Your Feed</a>
                                </li> : null}
                                <li className="nav-item">
                                    <a className="nav-link active" href="">Global Feed</a>
                                </li>
                            </ul>
                        </div>
                        {this.props.data.articles.map((article, key) => (
                            <ArticleItem isAuth={this.props.data.isAuth} key={key} article={article} />
                        ))}
                        <nav>
                            <ul className="pagination">
                                {this.props.data.paginations.map((v) => (
                                    <li className={this.props.data.currentPage === v ?
                                        "page-item active" : "page-item"} key={v}>
                                        <Link className="page-link" href={"/?page=" + v}>
                                            {v}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                {this.props.data.tags.map((tag) =>
                                    <a key={tag} href="" className="tag-pill tag-default">{tag}</a>,
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>;
    }
}
