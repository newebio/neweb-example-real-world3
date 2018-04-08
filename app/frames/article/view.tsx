import { IViewProps } from "neweb";
import React = require("react");
import { IData } from "./controller";

export default class ArticleView extends React.Component<IViewProps<{}, IData>, {}> {
    render() {
        return (
            <div className="article-page">

                <div className="banner">
                    <div className="container">

                        <h1>{this.props.data.article.title}</h1>

                        <div className="article-meta">
                            <a href={"/profile/" + this.props.data.article.author.username}>
                                <img
                                    src={this.props.data.article.author.image || "http://i.imgur.com/Qr71crq.jpg"} />
                            </a>
                            <div className="info">
                                <a href={"/profile/" + this.props.data.article.author.username}
                                    className="author">{this.props.data.article.author.username}</a>
                                <span className="date">January 20th</span>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary">
                                <i className="ion-plus-round"></i>
                                &nbsp;
        Follow Eric Simons <span className="counter">(10)</span>
                            </button>
                            &nbsp;&nbsp;
      <button className="btn btn-sm btn-outline-primary">
                                <i className="ion-heart"></i>
                                &nbsp;
        Favorite Post <span className="counter">(29)</span>
                            </button>
                        </div>

                    </div>
                </div>

                <div className="container page">

                    <div className="row article-content">
                        <div className="col-md-12">
                            {this.props.data.article.body}
                        </div>
                    </div>

                    <hr />

                    <div className="article-actions">
                        <div className="article-meta">
                            <a href={"/profile/" + this.props.data.article.author.username}>
                                <img src={this.props.data.article.author.image
                                    || "http://i.imgur.com/Qr71crq.jpg"} /></a>
                            <div className="info">
                                <a href={"/profile/" + this.props.data.article.author.username}
                                    className="author">{this.props.data.article.author.username}</a>
                                <span className="date">{this.props.data.article.updatedAt}</span>
                            </div>

                            <button className="btn btn-sm btn-outline-secondary">
                                <i className="ion-plus-round"></i>
                                &nbsp;
        Follow {this.props.data.article.author.username}
                                <span className="counter">({this.props.data.article.author.following})</span>
                            </button>
                            &nbsp;
      <button className="btn btn-sm btn-outline-primary">
                                <i className="ion-heart"></i>
                                &nbsp;
        Favorite Post <span className="counter">({this.props.data.article.favoritesCount})</span>
                            </button>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-xs-12 col-md-8 offset-md-2">
                            {this.props.data.user ?
                                <form className="card comment-form">
                                    <div className="card-block">
                                        <textarea
                                            className="form-control"
                                            placeholder="Write a comment..." rows={3}></textarea>
                                    </div>
                                    <div className="card-footer">
                                        <img src={this.props.data.user.image || "http://i.imgur.com/Qr71crq.jpg"}
                                            className="comment-author-img" />
                                        <button className="btn btn-sm btn-primary">
                                            Post Comment
                                    </button>
                                    </div>
                                </form> : null}
                            {this.props.data.comments.map((comment) => (
                                <div className="card">
                                    <div className="card-block">
                                        <p className="card-text">{comment.body}</p>
                                    </div>
                                    <div className="card-footer">
                                        <a href={"/profile/" + comment.author.username} className="comment-author">
                                            <img src={comment.author.image || "http://i.imgur.com/Qr71crq.jpg"}
                                                className="comment-author-img" />
                                        </a>
                                        &nbsp;
      <a href="" className="comment-author">{comment.author.username}</a>
                                        <span className="date-posted">{comment.updatedAt}</span>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
