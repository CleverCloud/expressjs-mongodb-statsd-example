# NodeJS-MongoDB-Demo

This is an example NodeJS application that works with MongoDB on Clever Cloud.

The application is a very simple list where you can add or delete values.


### Before You Begin

Before starting the deployment process, you'll need to decide on:

- **Application Name**: Choose a unique name for your application (e.g., `my-expressExample-app`)
- **Domain Name**: Optionally, choose a domain name for your application

You'll use these values throughout the deployment process. In the commands below, replace:
- `<APP_NAME>` with your chosen application name
- `<YOUR_DOMAIN_NAME>` with your domain name (if applicable)

### Using Clever Tools CLI

Follow these steps to deploy this app on Clever Cloud using the command line:

```bash
# Step 1: Create a Node.js application
clever create --type node <APP_NAME>

# Step 2: Add your domain (optional but recommended)
clever domain add <YOUR_DOMAIN_NAME>

# Step 3: Create required add-ons
clever addon create mongodb-addon --plan xs_sml <APP_NAME>-Mongo

# Step 4: Link add-ons to your application
clever service link-addon <APP_NAME>-Mongo
```

## Deployment

After configuring all the environment variables, deploy your application:

```bash
# Push your code to Clever Cloud
clever deploy
```

That's it, the application will use the environnement variables to connect to MongoDB.
