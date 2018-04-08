import { Link } from "neweb";
import React = require("react");
import { IArticle } from "../Api";

export default ({ article, isAuth, key }: { key: any; article: IArticle; isAuth: boolean; }) => (
    <div className="article-preview" key={key}>
        <div className="article-meta">
            <a href="profile.html"><img src={article.author.image} /></a>
            <div className="info">
                <Link href={"/profile/" + article.author.username}
                    className="author">{article.author.username}</Link>
                <span className="date">{article.createdAt}</span>
            </div>
            <button disabled={!isAuth}
                className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i> {article.favoritesCount}</button>
        </div>
        <a href={"/article/" + article.slug} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
        </a>
    </div>
);
