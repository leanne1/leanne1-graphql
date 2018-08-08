import gql from 'graphql-tag';

const fetchSong = gql`
  query FetchSong($id: ID!) {
    song(id: $id) {
      title
      id
    }
  }
`;

export default fetchSong;
