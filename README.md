# 2FA-Backend

Backend for 2FA project

To run this project locally follow the below steps


- Install [Node](https://nodejs.org/en/)
- Install [MongoDB](https://www.mongodb.com/download-center/community)
- Create a `.env` file for environment variables

Follow these steps to set up the development environment:

### Step 1: Install Node.js from the [Node.js official website](https://nodejs.org/en/).

During the developement process, I used node version v14.17.4. You can check your node version by running the following command:

```shell
node -v
```

### Step 2: Install MongoDB from the [MongoDB official website](https://www.mongodb.com/download-center/community).

My MongoDB shell version `v5.0.2-rc0`

### Step 3: Install [MongoDB Compass](https://www.mongodb.com/products/compass) and [Postman](https://www.postman.com/) (Optional)

You may want to install these two tools to help you with the development process.
Using MongoDB Compass, you can have a look at your database as it gives a nice overview of your database.
Postman can be used to test API endpoints.

### Step 4: Create a `.env` file for environment variables

You'll have to create a `.env` file for environment variables with the variables listed [here](https://github.com/kartikeyvaish/2FA-Backend/blob/main/README.md#env-file)

### Step 5: Clone the repository

    git clone https://github.com/kartikeyvaish/2FA-Backend.git

### Step 6: Install dependencies

    cd 2FA-Backend

    npm install

### Step 7: Run the server

    npm run dev

#### .env file

```dosini
// development or production
NODE_ENV="development"

// Local Database Configurations
DB_Name="2FA"

// MongoDB Atlas Configurations
atlas_url="your_mongo_db_atlas_url_if_any"
apiVersion="api_version_if_any"

// Endpoints Here
auth=""
```
