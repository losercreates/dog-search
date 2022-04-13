# Dog Search

Dog Search is a Ui based website which helps you to search about favorite dog breed.

## Installation

- Clone the repo
- Install the required modules in all of the sub-folders

```bash
npm i
```

- Run the mongodb server

```bash
mongod
```

- Add the following .env variables in a .env file

```bash
DB=<YOUR_MONGODB_URL>
JWTPRIVATEKEY = <YOUR_PRIVATE_KEY>
SALT = 10
```

- First run the dog-script. It populates your mongo databse with the required data.
- Next run the client and server folder
