import * as express from 'express';
import { Request, Response } from 'express';
import userController from '../controller/usersController';

const routes = express.Router();

routes.post('/createUser', (req: Request, res: Response) => userController.create(req, res));
routes.post('/loginUser', (req: Request, res: Response) => userController.login(req, res));

routes.get('/userDetails/:user', (req: Request, res: Response) => userController.userDetails(req, res))

export default routes;
