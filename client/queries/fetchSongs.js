import gql from 'graphql-tag';

const fetchSongs = gql`
  query {
    songs {
      title
      id
    }
  }
`;

export default fetchSongs;
