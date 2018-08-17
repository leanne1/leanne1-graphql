import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import login from '../schema/mutations/login';
import currentUser from '../schema/queries/currentUser';
import AuthForm from './AuthForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      errors: []
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  handleSubmit({email, password}) {
   this.props.mutate({
     variables: { email, password },
     refetchQueries: [{ query: currentUser }]
   })
   .catch(res => {
     this.setState({
       errors: res.graphQLErrors,
     })
   });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <AuthForm handleSubmit={this.handleSubmit} errors={this.state.errors} />
      </div>
    );
  }
}

export default graphql(currentUser)(graphql(login)(Login));
