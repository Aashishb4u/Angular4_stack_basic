This a nodejs-express-mongodb application.

You have to Perform all the following steps in the given sequence for Installing this project.

**Install Nodejs**
- Ubuntu Machine
```
        $ sudo apt-get install nodejs-legacy
```
- Mac Machine
```
        $ brew install nodejs
```
Verify this by using `node -v` and `npm -v`

**Install Angular CLI**
- Ubuntu Machine
```
        npm install -g @angular/cli
```
The app will automatically create *node-express-stack* database and *users* collection.

- Mac Machine
```
        npm install -g @angular/cli
```

Step 1: Add NodeJs PPA. First you need to node.js ppa in our system provide by nodejs official website.
Step 2: Install Node.js and NPM. After adding required PPA file, lets install Nodejs package.
```
	$ sudo apt-get update
	$ sudo apt-get install nodejs
	$ sudo apt-get install npm
```

Step 3: Check Node.js and NPM Version
```
	$ node --version
	$ npm --version
```
Step 4: Install Angular CLI
```
	npm install -g @angular/cli
```
Step 5: Install node dependencies
```
         $ npm install
```
Step 6: To start project use following command.
```
         $ npm start or $ ng serve
```

To update Angular CLI to a new version, you must update both the global package and your project's local package.
```
	    npm uninstall -g @angular/cli
            npm cache clean
            npm install -g @angular/cli@latest
```