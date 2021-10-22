const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const { DB_URI, DB_NAME, JWT_SECRET } = process.env;

const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7 days' });

const getUserFromToken = async (token, db) => {
  if (!token) { return null }
  const tokenData = jwt.verify(token, JWT_SECRET);
  if (!tokenData?.id) { return null }
  return await db.collection('Users').findOne({ _id: ObjectID(tokenData.id) });
}

const typeDefs = gql`

  type Query {
    myFridge: [Fridge!]!
    getFridge(id: ID!): Fridge
  }

  type Mutation {
    signUp(input: SignInput): AuthUser!
    signIn(input: SignInput): AuthUser!

    createFridge: Fridge!
    #updateFridge(id: ID!): Fridge
    deleteFridge(id: ID!): Boolean!
    addUserToFridge(fridgeId: ID!, userId: ID!): Fridge

    addItem(name: String!, expDate: String!, fridgeId: ID!): Item!
  }

  input SignInput {
    email: String!
    password: String!
  }

  type AuthUser {
    user: User!
    token: String!
  }

  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Fridge {
    id: ID!
    items: [Item]!
    users: [User!]!
  }

  type Item {
    id: ID!
    name: String!
    expDate: String!
    fridge: Fridge!
  }
`;

const resolvers = {
  Query: {
    myFridge: async (_, args, { db, user }) => {
      if (!user) {
        throw new Error('Authentication error. Please sign in')
      }
      return await db.collection('Fridges').find( { userIds: user._id }).toArray();
    },
    getFridge: async (_, { id }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication error. Please sign in')
      }
      //Make so only users of the fridge can get it
      return await db.collection('Fridges').findOne({ _id: ObjectID(id) });
    }
  },

  Mutation: {
    signUp: async (_, { input }, { db }) => {
      const existingUser = await db.collection('Users').findOne({ email: input.email });
      if (existingUser) {
        throw new Error('An account associated with that email already exists');
      }
      const hashedPassword = bcrypt.hashSync(input.password);
      const newUser = {
        ...input,
        password: hashedPassword,
      }
      await db.collection('Users').insert(newUser);
      const user = await db.collection('Users').findOne({ email: input.email });
      return {
        user,
        token: getToken(user)
      }
    },
    signIn: async (_, { input }, { db }) => {
      const user = await db.collection('Users').findOne({ email: input.email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordCorrect = bcrypt.compareSync(input.password, user.password);
      if (!isPasswordCorrect) {
        throw new Error('Invalid credentials');
      }

      return {
        user,
        token: getToken(user)
      }
    },
    createFridge: async (_, args, { db, user }) => {
      if (!user) {
        throw new Error('Authentication error. Please sign in')
      }
      
      const newFridge = {
        items: [],
        userIds: [user._id]
      }
      const result = await db.collection('Fridges').insert(newFridge);
      const fridge = await db.collection('Fridges').findOne({ _id: result.insertedIds['0'] });
      return fridge;
    },
    /*updateFridge: async (_, { id }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication error. Please sign in')
      }
      //Before updating add so it checks that the user can actually do this first
      const result = await db.collection('Fridges').updateOne({ _id: ObjectID(id) }, { $set: {  }});
      const fridge = await db.collection('Fridges').findOne({ _id: result.insertedIds['0'] });
      return fridge;
    }*/
    addUserToFridge: async (_, { fridgeId, userId }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication error. Please sign in')
      }
      //Before updating add so it checks that the user can actually do this first
      const fridge = await db.collection('Fridges').findOne({ _id: ObjectID(fridgeId) });
      if (!fridge) {
        return null;
      }
      if (fridge.userIds.find((_userId) => _userId.toString() == userId.toString())) {
        return fridge;
      }
      await db.collection('Fridges').updateOne({ _id: ObjectID(fridgeId) }, { $push: { userIds: ObjectID(userId) }});
      fridge.userIds.push(ObjectID(userId));
      return fridge;
    },
    deleteFridge: async (_, { id }, { db, user }) => {
      if (!user) {
        throw new Error('Authentication error. Please sign in')
      }
      //Make so only users of the fridge can delete it
      await db.collection('Fridges').deleteOne({ _id: ObjectID(id) });
      return true;
    },
    addItem: async (_, { name, expDate, fridgeId }, { db, user }) => {
      console.log("ll");
      if (!user) {
        throw new Error('Authentication error. Please sign in')
      }
      console.log("hello");
      const newItem = {
        name,
        expDate,
        fridgeId: ObjectID(fridgeId)
      }
      console.log("h");
      const result = await db.collection('Items').insert(newItem);
      console.log("o");
      const item = await db.collection('Items').findOne({ _id: result.insertedIds['0'] });
      console.log("e");
      return item;
    }
  },
  User: {
    id: ({ _id, id }) => _id || id
  },
  Fridge: {
    id: ({ _id, id }) => _id || id,
    users: async ({ userIds }, _, { db }) => {
      return Promise.all(userIds.map( (userId) => db.collection('Users').findOne({ _id: userId})));
    },
    items: async ({ _id }, _, { db }) => {
      const result = await db.collection('Items').find({ fridgeId: ObjectID(_id) }).toArray();
      console.log(result);
      return result;
    }
  },
  Item: {
    id: ({ _id, id }) => _id || id,
    fridge: async ({ fridgeId }, _, { db }) => {
      return await db.collection('Fridges').findOne({ _id: fridgeId });
    }
  }
};


const start = async () => {
  const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await getUserFromToken(req.headers.authorization, db);
      return {
        db,
        user
      }
    }
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start();