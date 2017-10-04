import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="landingPage landing">
        <div className="container">
        <div className="col-sm-6">
          <h2> Read. Discuss. Learn. Grow.</h2>
          <br />
          <p> Dewey is a web-based book club that allows you to track your favorite books, discuss what you are currently reading with friends, and discover new books all in one place. </p>
          <br />
          <p>Your next adventure awaits. Let's get reading.</p>
          <br />
          <br />
          {
            isAuthenticated() && (
                <h4>
                  You are logged in! You can now view your{' '}
                  <Link to="profile">profile area</Link>
                  .
                </h4>
              )
          }
          {
            !isAuthenticated() && (
                <h4>
                  You are not logged in! Please{' '}
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </a>
                  {' '}to continue.
                </h4>
              )
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
