import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../mutations/deleteSong';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id },
    }).then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.loading
      ? <div>Loading...</div>
      : this.props.data.songs.map(({ title, id }) => (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i
            className="material-icons right"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      ));
  }

  render() {
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
