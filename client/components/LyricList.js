import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs';
import likeLyric from '../mutations/likeLyric';

class LyricList extends Component {
  constructor(props) {
    super();
    this.renderLyrics = this.renderLyrics.bind(this);
    this.onLikeLyric = this.onLikeLyric.bind(this);
  }

  onLikeLyric(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        <div className="vote-box">
          {likes}
          <i
            onClick={() => this.onLikeLyric(id, likes)}
            className="material-icons"
          >
            star
          </i>
        </div>
      </li>
    ))
  }

  render() {
    return (
      <div>
        <ul className="collection">
          {this.renderLyrics()}
        </ul>
      </div>
    );
  }
}

export default graphql(likeLyric)(LyricList);
