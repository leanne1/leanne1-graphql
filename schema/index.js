import axios from 'axios';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  RootQueryType,
  GraphQLSchema,
} from 'graphql';

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        const { data } = await axios.get(`http://localhost:4001/companies/${parentValue.id}/users`);
        return data;
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    company: {
      type: CompanyType,
      async resolve(parentValue, args) {
        const { data } = await axios.get(`http://localhost:4001/companies/${parentValue.companyId}`);
        return data;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      async resolve(parentValue, args) {
        const { data } = await axios.get(`http://localhost:4001/users/${args.id}`);
        return data;
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      async resolve(parentValue, args) {
        const { data } = await axios.get(`http://localhost:4001/companies/${args.id}`);
        return data;
      }
    },
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        companyId: {
          type: GraphQLString,
        }
      },
      async resolve(parentValue, { firstName, age, companyId }) {
        const { data } = await axios.post(`http://localhost:4001/users`, { firstName, age, companyId });
        return data;
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(parentValue, { id }) {
        const { data } = await axios.delete(`http://localhost:4001/users/${id}`);
        return data;
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        },
        companyId: {
          type: GraphQLString
        }
      },
      async resolve(parentValue, { id, firstName, age, companyId }) {
        const { data } = await axios.patch(`http://localhost:4001/users/${id}`, { firstName, age, companyId });
        return data;
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
