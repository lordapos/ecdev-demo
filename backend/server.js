const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./utils/database')
const { graphqlHTTP } = require('express-graphql')
const rootResolver = require('./graphql/public_api/resolver/rootResolver')
const schema = require('./graphql/public_api/schema')
const loggedResolver = require('./graphql/logged_api/resolver/rootResolver')
const loggedSchema = require('./graphql/logged_api/schema')
const adminSchema = require('./graphql/admin_api/schema')
const adminResolver = require('./graphql/admin_api/resolver/rootResolver')
const protect = require('./middleware/authMiddleware')
const admin = require('./middleware/adminMiddleware')
const uploadRoutes = require('./routes/uploadRoutes')
const cors = require('cors')
const path = require('path')
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/upload', uploadRoutes)

app.use('/public-api', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: false,
}))

app.use("/logged-api", protect, graphqlHTTP({
  schema: loggedSchema,
  rootValue: loggedResolver,
  graphiql: false
}))

app.use("/admin-api", admin, graphqlHTTP({
  schema: adminSchema,
  rootValue: adminResolver,
  graphiql: true
}))

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const PORT = process.env.PORT || 5000

const _dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, '/frontend/public')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(_dirname, 'frontend', 'public', 'index.html')),
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

async function start () {
  try {
    await sequelize.sync()
    app.listen(PORT)
    console.log(`Server is running on port ${PORT}`)
  } catch (e) {
    console.log(e)
  }
}

start()