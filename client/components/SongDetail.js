import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    return (
      <div>
        <h1>Song detail</h1>
      </div>
    );
  }
}

export default graphql(fetchSong)(SongDetail);
