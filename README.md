# A GraphQL server boilerplate using Apollo Server 2 with MongoDB as database.

_This is a **Work In Progress** and it is not production ready! _

## Settings

- Create a setting file outside of this directory so it is not commited to repository.

```javascript
/* ../settings/settings-server.js */
var settings = {
  // MongoDB connection URL
  mongoUrl: 'mongodb://localhost:27017/myproject',
  // MongoDB database name
  mongoDbName: 'boilerplate',

  // JSON Web Token secret
  jwtSecret: 'supersecret',
};

module.exports = settings;
```

- Set setting file path in `src/settings.js`
