## Basic CRUD  For REST API  Setup with Nodejs+Typescript+Type-ORM and Postgresql

### Overview
1.  Prerequisites
2. Project Setup
3. Running Project
4. Add API Routes
5. Apply Type-ORM  for db control
6. Adding  Models, Services and Controllers
7. Test with API Tester (eg. postman, thunderclient)

---

### 1. Prerequisites
- **Typescript** : A TypeScript compiler with static set type definitions.
- **ts-node** :  Allows us to run and configure Typescript execution environments.
- **nodemon**: A server utility library for monitoring changes of the code on a text editor. It automatically restarts the server whenever code changes are detected.
- **Express**:  Node.js web application framework for setting and managing web-based server.
- **Type-ORM**: TypeORM is an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) that can run in NodeJS and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8)
- **dotenv**: Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env)
- **Postgresql**

---

### 2.Project Setup 
- Create project folder with project name.
	- example: "crud"
	- Open cmd or terminal to crud folder and run following codes for project initiation.
	```bash
	npm init -y
	tsc -init
	```
- Install require libraries with this commands.
	```bash
	npm install typescript ts-node nodemon express typeorm reflect-metadata pg dotenv --save
	npm install @types/express @types/node @types/dotenv --save-dev  #for type definitions  
	```
- Create **src** folder for source codes.
- Create **.env** file to the project **root** directory.
	```
	#.env
	db_host = 127.0.0.1
	db_port = 5432
	db_name = "dbname"
	db_username = "username"
	db_pass = "password"
	app_port = 4000
	```
- Create **environment.ts** file within **src** folder for export environment variable .
	```js
	//environment.ts
	import  *  as  dotenv  from  'dotenv';
	dotenv.config();
	interface  IEnvironmentProps {
		db_host: string | undefined;
		db_port: any
		db_name: string | undefined;
		db_username: string | undefined;
		db_pass: string | undefined;
		app_port: number | undefined | string;
	}

	export  const  envData: IEnvironmentProps = {
		db_host:  process.env.db_host || '',
		db_port:  process.env.db_port,
		db_name:  process.env.db_name || '',
		db_username:  process.env.db_username || '',
		db_pass:  process.env.db_pass || '',
		app_port:  process.env.app_port || 0
	}
	```
---

### 3.Running project
- In *package.json* file please add this two lines in **scripts** section.
	```json
	"scripts":{
		"start": "ts-node src/index.ts",
		"start:watch": "nodemon src/index.ts"
	}
	```
- **tsconfig.json** file should be like this 
	```json
	{
	"compilerOptions": {
		"target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */  /* Specify what JSX code is generated. */
		"experimentalDecorators": true, /* Enable experimental support for TC39 stage 2 draft decorators. */
		"emitDecoratorMetadata": true, /* Emit design-type metadata for decorated declarations in source files. */
		"module": "commonjs", /* Specify what module code is generated. */
		"rootDir": "./src", /* Specify the root folder within your source files. */
		"outDir": "./build", /* Specify an output folder for all emitted files. */
		"esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
		"forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
		"strict": true, /* Enable all strict type-checking options. */
		"strictPropertyInitialization": false, /* Check for class properties that are declared but not set in the constructor. */
		"skipLibCheck": true  /* Skip type checking all .d.ts files. */
		}
	}
	```
- Create *index.ts* in **src** folder and add this codes.
	```ts
	import  http  from  'http';
	import  express, { Express } from  'express';
	import { envData } from  './environment';
	const  router: Express = express();
	
	/** Parse the request */
	router.use(express.urlencoded({ extended:  false }));
	
	/** Takes care of JSON data */
	router.use(express.json());
	
	/** RULES OF OUR API */
	router.use((req, res, next) => {
	
	// set the CORS policy
	res.header('Access-Control-Allow-Origin', '*');
	
	// set the CORS headers
	res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-	Type,Accept, Authorization');
	
	// set the CORS method headers
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
		return  res.status(200).json({});
	}
	next();
	});
	
	/** Routes */
	router.use('/', (req, res) =>  res.send('Hello world!'));
	
	/** Error handling */
	router.use((req, res, next) => {
		const  error = new  Error('not found');
		return  res.status(404).json({
		message:  error.message
		});
	});
	/** Server */

	const  httpServer = http.createServer(router);
	const  PORT: any = envData.app_port;
	httpServer.listen(PORT, () =>  console.log(`The server is running on port ${PORT}`));
	```
	
- Run with `npm start` or `npm run start:watch`.
**Note**: `npm run start:watch` mode will run with *watch mode* it can run without restarting your server after code changes.

- This codes will crate basic http server at port **4000** and you can call  using *GET method* **localhost:4000** at your browser or Postman it will return "Hello World!" text.

---

### 4. Add API Routes
- Create **routes** folder in **src** folder and create file called user.routes.ts.
```js
//user.routes.ts
import  express, { Request, Response } from  'express';
const  router = express.Router();

router.get('/users', (req: Request, res: Response) => {
	return  res.status(200).json({
		data:  'getallusers',
		status:  res.statusCode
	});
});

router.get('/users/:id', (req: Request, res: Response) => {
	return  res.status(200).json({
		data:  'getUserById',
		status:  res.statusCode
	});
});

router.put('/users/:id', (req: Request, res: Response) => {
	return  res.status(200).json({
		data:  'updated',
		status:  res.statusCode
	});
});

router.delete('/users/:id', (req: Request, res: Response) => {
	return  res.status(200).json({
		data:  'deleted',
		status:  res.statusCode
	});
});

router.post('/users', (req: Request, res: Response) => {
	let  body = req.body;
	return  res.status(200).json({
		body
	});
});

export = router;
```
- Replace 
`router.use('/',  (req, res)  => res.send('Hello world!'));` with `router.use('/api', routes);` in ***index.ts*** and add this `import  routes  from  './routes/user.routes';` to top section.
- Now you can call that routes with api tester (Postman) with `localhost:4000`. 
---

### 5. Apply Type-ORM  for db control
- Create **db** folder in **src** directory and create **entities** folder and add **user.entity.ts** for database table.
```ts
//user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from  "typeorm"

@Entity()
export  class  User {

	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string;

	@Column()
	age: number;

	@Column()
	address: string;

}
```
- Create file called **data-source.ts** within **db** folder.
```js
import { DataSource } from  "typeorm";
import { envData } from  "../environment";
import { User } from  "./entities/user.entity";

export  const  AppDataSource = new  DataSource({
	type:  "postgres",
	host:  envData.db_host,
	port:  envData.db_port,
	username:  envData.db_username,
	password:  envData.db_pass,
	database:  envData.db_name,
	synchronize:  true,
	logging:  false,
	entities: [User],
	subscribers: [],
	migrations: [],
});
```
- After created datasource and entity we are ready to control database but we need to initialize that in **index.ts** , to do that add these lines .
```ts
//index.ts
import  "reflect-metadata"
import { AppDataSource } from  './db/data-source';

//add this line to the end of the file
AppDataSource.initialize().then(() =>  console.log("DB initialized!!")).catch((err) =>  console.log(err));
```
---
### 6. Adding Models, Services & Controllers 
- Create **models** folder in **src** folder and create file called user.model.ts.
```ts
//user.model.ts
export  interface  IUser {
	id: number;
	name: string;
	age: number;
	address: string;
}
```
-Create **services** folder in **src** folder and create file called user.service.ts.
```ts
//user.service.ts
import { AppDataSource } from  "../db/data-source";
import { User } from  "../db/entities/user.entity";
import { IUser } from  "../models/user.model";
import { Repository, UpdateResult, DeleteResult } from  "typeorm";

export  class  UserService {
private  userRepository: Repository<User>;

constructor() {
	this.userRepository = AppDataSource.getRepository(User)
}

async  selectUsers(): Promise<IUser[]> {
	return  await  this.userRepository.find();
}

async  selectUserById(id: number): Promise<IUser | null> {
	return  await  this.userRepository.findOne({ where: { id } });
}

async  createUser(userData: IUser): Promise<IUser> {
	return  await  this.userRepository.save(userData);
}

async  updateUser(id: number, userData: IUser): Promise<UpdateResult> {
	return  await  this.userRepository.update(id, userData);
}

async  deleteUser(id: number): Promise<DeleteResult> {
	return  await  this.userRepository.delete(id);
}}
```
- Create **controllers** folder in **src** folder and create file called user.controller.ts.
```ts
import { Request, Response } from  'express';
import { IUser } from  '../models/user.model';
import { UserService } from  '../services/user.service';

let  userService = new  UserService();
//get all users
const  getUsers = async (req: Request, res: Response) => {
	let  users: IUser[] = await  userService.selectUsers();
	return  res.status(200).json({
		data:  users,
		status:  res.statusCode
	});
};

//get user with id
const  getUser = async (req: Request, res: Response) => {
	let  id: string = req.params.id;
	let  user: IUser | null = await userService.selectUserById(Number.parseInt(id));
	return  res.status(200).json({
		data:  user,
		status:  res.statusCode
	});
};

// updating a user
const  updateUser = async (req: Request, res: Response) => {
	let  id: string = req.params.id; // get the user id from the req.params
	let  body: IUser = req.body ?? null; // get the data from req.body
	let  updated = await  userService.updateUser(Number.parseInt(id), body);
	return  res.status(204).json({
		data:  updated,
		status:  res.statusCode
	});
};

// deleting a user
const  deleteUser = async (req: Request, res: Response) => {
	let  id: string = req.params.id; // get the user id from req.params
	let  deleted = await  userService.deleteUser(Number.parseInt(id));
	return  res.status(204).json({
		data:  deleted,
		status:  res.statusCode
	});
};

// adding a user
const  addUser = async (req: Request, res: Response) => {
	// get the data from req.body
	let  body: IUser = req.body;
	let  created = await  userService.createUser(body);
	// return response
	return  res.status(201).json({
		data:  created,
		status:  res.statusCode
	});
};

export  default { getUsers, getUser, updateUser, deleteUser, addUser };
```
- Finally, update controllers in  user.routes.ts.
```ts
import  express, { Request, Response } from  'express';
import  controller  from  '../controllers/user.controller';

const  router = express.Router();
router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUser);
router.put('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);
router.post('/users', controller.addUser);

export = router;
```
---
### 7.Test with API testing tool (Postman)
- Open Postman
	1. **localhost:4000/api/users** with **POST** method and following data will create a new user in db.
	```json
	//body->raw->json in postman
	{	
		"name":"John",
		"age":31,
		"address":"Mandalay"
	}
	```
	2. **localhost:4000/api/users** with **GET** method will show all users from db.
	3. **localhost:4000/api/users/1** with **GET** method will show user  data  who's id equal **1** from db.
	4.  **localhost:4000/api/users/1** with **PUT** method and following data will update  user user  data  who's id equal **1** from db.
	```json
	//body->raw->json in postman
	{	
		"name":"John",
		"age":31,
		"address":"Mandalay"
	}
	```
	5. **localhost:4000/api/users/1** with **DELETE** method will remove user  data  who's id equal **1** from db.

---
> Author by: Min Khant T Kyi

> github link: https://github.com/minkhant285/crud_typescript
