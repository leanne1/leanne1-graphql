import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import currentUser from '../schema/queries/currentUser';
import logout from '../schema/mutations/logout';

class Header extends Component {

  constructor() {
    super();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: currentUser }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <ul className="right" />
    }

    if (user) {
      return (
        <ul className="right">
          <li><a onClick={this.handleLogoutClick}>Logout</a></li>
        </ul>
      );
    }

    if (user === null) {
      return (
        <ul className="right">
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        {!this.props.data.loading &&
          <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo left">Home</Link>
              {this.renderButtons()}
            </div>
          </nav>
        }
      </div>
    );
  }
}

export default graphql(logout)(graphql(currentUser)(Header));
