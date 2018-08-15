import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="row">
        <form className="col s4">
          <h1>Login</h1>
          <div className="input-field">
            <label>Email</label>
            <input value={this.state.email} onClick={(e) => { this.setState({ email: e.target.value }) }} />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input value={this.state.password} onClick={(e) => { this.setState({ password: e.target.value }) }} />
          </div>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
