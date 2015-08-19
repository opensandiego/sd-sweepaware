# Installing the stack on your machine

## Prerequisites

### Node.js

Download and install the latest stable 0.12.x version of Node.js.
- Windows users will need to use [the installer provided by the Node Foundation](https://nodejs.org/download/)
- OS X users should use [homebrew](http://brew.sh/): then `brew update` then `brew install node` in the Terminal
- GNU/Linux users should use their package manager (`apt`, `yum`, `pacman`, etc.) to install the appropriate package

### MongoDB

Download and install the latest stable 3.0.x version of MongoDB.
- Windows users will want to [choose the appropriate download for their version of Windows](https://www.mongodb.org/downloads)
- OS X users should use [homebrew](http://brew.sh/): `brew update` then `brew install mongodb` in the Terminal
- GNU/Linux users should use their package manager (`apt`, `yum`, `pacman`, etc.) to install the appropriate package

Then be sure that you have your MongoDB server daemon up and running.

### Importing the database

TODO once the database has been migrated to.

### Installing modules

In your local copy of this repository, type `npm install` into your command line. This will install all of the `npm` modules we use in this project. If you're a Linux user and don't have `npm`, you may need to install it separately.


## Running the local web server

With everything installed, you should be able to type `npm start`, then go to http://localhost:3000/ to see your local version of the project!
