import { IViewProps } from "neweb";
import React = require("react");
import { IData } from "./controller";
export default class SignUpView extends React.Component<IViewProps<any, IData>, {
    name: string;
    email: string;
    password: string;
}> {
    state = {
        name: "",
        email: "",
        password: "",
    };
    render() {
        return (<div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="">Have an account?</a>
                        </p>
                        {this.props.data.errors ? this.props.data.errors.map((err)=>(
                            <ul className="error-messages">
                                <li>That email is already taken</li>
                        </ul>) : null}

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.props.dispatch("signUp", this.state);
                        }}>
                            <fieldset className="form-group">
                                <input
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                    className="form-control form-control-lg" type="text" placeholder="Your Name" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    className="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    className="form-control form-control-lg" type="password"
                                    placeholder="Password" />
                            </fieldset>
                            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                                Sign up
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>);
    }
}
