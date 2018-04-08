import { IViewProps } from "neweb";
import React = require("react");
import ArticleItem from "./../../components/ArticleItem";
import { IData } from "./controller";
export default class ProfileView extends React.Component<IViewProps<any, IData>, {}> {
    render() {
        return (<div className="profile-page">

            <div className="user-info">
                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img src={this.props.data.profile.image || "http://i.imgur.com/Qr71crq.jpg"}
                                className="user-img" />
                            <h4>{this.props.data.profile.username}</h4>
                            <p>{this.props.data.profile.bio}</p>
                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-plus-round"></i>
                                &nbsp;
                                Follow {this.props.data.profile.username}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">

                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link active" href="">My Articles</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="">Favorited Articles</a>
                                </li>
                            </ul>
                        </div>

                        {this.props.data.articles.map((article, key) => (
                            <ArticleItem article={article} isAuth={this.props.data.isAuth} key={key} />
                        ))}

                    </div>

                </div>
            </div>

        </div>);
    }
}
