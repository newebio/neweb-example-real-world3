import { IViewProps } from "neweb";
import React = require("react");
import { IData, IParams } from "./controller";
export default class HomeView extends React.Component<IViewProps<IParams, IData>, {}> {
    render() {
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
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="">Your Feed</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="">Global Feed</a>
                                </li>
                            </ul>
                        </div>
                        {this.props.data.articles.map((article, key) => (
                            <div className="article-preview" key={key}>
                                <div className="article-meta">
                                    <a href="profile.html"><img src={article.author.image} /></a>
                                    <div className="info">
                                        <a href="" className="author">{article.author.username}</a>
                                        <span className="date">{article.createdAt}</span>
                                    </div>
                                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                        <i className="ion-heart"></i> {article.favoritesCount}</button>
                                </div>
                                <a href="" className="preview-link">
                                    <h1>{article.title}</h1>
                                    <p>{article.description}</p>
                                    <span>Read more...</span>
                                </a>
                            </div>
                        ))}
                        <nav>
                            <ul className="pagination">
                                {this.props.data.paginations.map((v) => (
                                    <li className={this.props.data.currentPage === v ?
                                        "page-item active" : "page-item"} key={v}>
                                        <a onClick={(e) => {
                                            if (!e.ctrlKey) {
                                                e.preventDefault();
                                                this.props.navigate("/?page=" + v);
                                            }
                                        }} className="page-link" href={"/?page=" + v}>{v}</a>
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
