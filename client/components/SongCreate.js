import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchSongs from '../queries/fetchSongs';
import addSong from '../mutations/addSong';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
      refetchQueries: [{ query: fetchSongs }]
    })
    .then(() => {
      hashHistory.push('/');
    });
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h1>Create a new song</h1>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <label>Song title:</label>
          <input onChange={e => this.setState({ title: e.target.value })} value={this.state.title} />
        </form>
      </div>
    );
  }
}

export default graphql(addSong)(SongCreate);
