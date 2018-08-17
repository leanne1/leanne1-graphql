import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="row">
        <form className="col s4">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => { this.setState({ email: e.target.value }) }}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={(e) => { this.setState({ password: e.target.value }) }}
            />
          </div>
          {
            errors.map(error => <div className="form-error" key={error.message}>{error.message}</div>)
          }
          <button onClick={this.handleSubmit} className="btn" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
