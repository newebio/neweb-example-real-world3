import { IViewProps } from "neweb";
import React = require("react");
import { IUser } from "../../Api";
import { IData } from "./controller";

export default class SettingsView extends React.Component<IViewProps<any, IData>, IUser & { password: string }> {
    componentWillMount() {
        this.setState({ ...this.props.data.user, password: "" });
    }
    render() {
        return (
            <div className="settings-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.props.dispatch("update", this.state);
                            }}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            onChange={(e) => this.setState({ image: e.target.value })}
                                            value={this.state.image || ""}
                                            className="form-control" type="text"
                                            placeholder="URL of profile picture" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            onChange={(e) => this.setState({ username: e.target.value })}
                                            value={this.state.username}
                                            className="form-control form-control-lg"
                                            type="text" placeholder="Your Name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea
                                            onChange={(e) => this.setState({ bio: e.target.value })}
                                            value={this.state.bio || ""}
                                            className="form-control form-control-lg"
                                            rows={8} placeholder="Short bio about you" ></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                            value={this.state.email}
                                            className="form-control form-control-lg" type="text" placeholder="Email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            onChange={(e) => this.setState({ password: e.target.value })}
                                            value={this.state.password}
                                            className="form-control form-control-lg"
                                            type="password" placeholder="Password" />
                                    </fieldset>
                                    <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                                        Update Settings
                                    </button>
                                </fieldset>
                            </form>
                            <hr />
                            <button
                                onClick={() => this.props.dispatch("logout")}
                                className="btn btn-outline-danger">Or click here to logout.</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
