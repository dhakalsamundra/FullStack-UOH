const { UserInputError } = require("apollo-server");
const jwt = require('jsonwebtoken')

const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require('./models/User')
const { JWT_SECRET } = require('./utils/config')

const findOrCreateAuthor = async (name) => {
  const author = await Author.findOne({ name });
  if (!author) {
    return await new Author({ name }).save();
  }
  return author;
};

module.exports = {
    Query: {
      
        allAuthors: async() => {
            return await Author.find({})
        },
        allBooks: (root, args) => {
            if (!args.genre) {
              return Book.find({}).populate('author')
            }
            return Book.find({ genres: { $in: args.genre } }).populate('author')
          },
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        me: (root, args, { currentUser }) => currentUser
    },
    Author: {
        bookCount: async root => {
          const books = await Book.find({ author: root.id })
          return books.length
        }
      },
    Mutation: {
        addBook: async( root, { title, author, published, genres } ) => {
            
            const book = new Book({ title, published, genres });
            try {
                book.author = await findOrCreateAuthor(author);
                return await book
                  .save()
                  .then((book) => book.populate("author").execPopulate());
              } catch (error) {
                throw new UserInputError(error.message, { error });
              } 
        },
        editAuthor: async(root, args,  ) => {
            const author = await Author.findOne({ name: args.name });
            if(!author){
                throw new UserInputError("Invalid Author");
            }
            const updatedAuthor = { ... author, born: args.born }
            return updatedAuthor
        },
        createUser: async (root, args) => {
          try {
            return await new User(args).save()
          } catch (error) {
            throw new UserInputError(error.message, { error })
          }
        },
        login: async ( root, args) => {
          const user = await User.findOne({ username: args.username })
          if(!user || args.password !== 'password'){
            throw new UserInputError('Invalid Credentials..')
          }
          return {
            value: jwt.sign({ username: user.username, id: user._id }, JWT_SECRET)
          }
        }
    }
}