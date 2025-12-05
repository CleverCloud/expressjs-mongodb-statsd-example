# NodeJS-MongoDB-Demo

This is an example NodeJS application that works with MongoDB on Clever Cloud.

The application is a very simple list where you can add or delete values.

### Before You Begin

Before starting the deployment process, you'll need to decide on:

- `<APP_ALIAS>` your chosen application alias
- `<ADDON_NAME>` your chosen add-on name

### Using Clever Tools CLI

Follow these steps to deploy this app on Clever Cloud using the command line:

```bash

# Step 1: Clone the application
git clone https://github.com/CleverCloud/expressjs-mongodb-statsd-example.git
cd expressjs-mongodb-statsd-example

# Step 2: Create a Node.js application
clever create --type node --alias <APP_ALIAS>

# Step 3: Create required add-on and link it
clever addon create mongodb-addon --plan xs_sml <ADDON_NAME> --link <APP_ALIAS>
```

## Deployment

Now, you can deploy your application:

```bash
git add . && git commit -m "Initial commit"
clever deploy
```

That's it, the application will use the environnement variables to connect to MongoDB.
