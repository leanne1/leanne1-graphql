import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { get } from 'lodash';
import { hasData } from '../utils';
import addLyric from '../mutations/addLyric';
import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super();
    this.state = {
      lyric: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  hasData(node) {
    return hasData(this.props)(node);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        content: this.state.lyric,
        songId: this.props.songId
      }
    })
    .then(() => {
      this.setState({
        lyric: ''
      })
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Add a lyric</label>
        <input
          value={this.state.lyric}
          onChange={(e) => this.setState({ lyric: e.target.value })}
        />
      </form>
    );
  }
}

export default graphql(addLyric)(LyricCreate);
