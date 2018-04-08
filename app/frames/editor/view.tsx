import { IViewProps } from "neweb";
import React = require("react");

export default class EditorView extends React.Component<IViewProps<any, {
    errors?: string[];
}>, {
        saving: boolean;
        title: string;
        description: string;
        body: string;
        tags: string;
    }> {
    state = { saving: false, title: "", description: "", body: "", tags: "" };
    render() {
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            {this.props.data.errors ? this.props.data.errors.map((err) => (
                                <ul className="error-messages">
                                    <li>{err}</li>
                                </ul>)) : null}
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                this.setState({ saving: true });
                                await this.props.dispatch("publish", this.state);
                                this.setState({ saving: false });
                            }}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            value={this.state.title}
                                            onChange={(e) => this.setState({ title: e.target.value })}
                                            disabled={this.state.saving} type="text"
                                            className="form-control form-control-lg" placeholder="Article Title" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            value={this.state.description}
                                            onChange={(e) => this.setState({ description: e.target.value })}
                                            disabled={this.state.saving} type="text"
                                            className="form-control" placeholder="What's this article about?" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea
                                            value={this.state.body}
                                            onChange={(e) => this.setState({ body: e.target.value })}
                                            disabled={this.state.saving} className="form-control"
                                            rows={8} placeholder="Write your article (in markdown)">
                                        </textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            value={this.state.tags}
                                            onChange={(e) => this.setState({ tags: e.target.value })}
                                            disabled={this.state.saving}
                                            type="text" className="form-control" placeholder="Enter tags" />
                                        <div className="tag-list"></div>
                                    </fieldset>
                                    <button disabled={this.state.saving}
                                        className="btn btn-lg pull-xs-right btn-primary" type="submit">
                                        Publish Article
                                    </button>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
