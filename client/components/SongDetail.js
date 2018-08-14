import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { get } from 'lodash';
import fetchSong from '../queries/fetchSong';
import { hasData } from '../utils';
import LyricCreate from '../components/LyricCreate';
import LyricList from '../components/LyricList';

class SongDetail extends Component {
  hasData(node) {
    return hasData(this.props)(node);
  }
  render() {
    const { params, data } = this.props;
    return (
      <div>
        <Link to="/">Back</Link>
        <h1>{this.hasData('song') && data.song.title}</h1>
        <div>
          <LyricList lyrics={this.hasData('song') && data.song.lyrics || []} />
          <LyricCreate songId={params.id} />
        </div>
      </div>
    );
  }
}

const queryOptions = props => { return { variables: { id: props.params.id } }};

export default graphql(fetchSong, {
  options: queryOptions,
})(SongDetail);
