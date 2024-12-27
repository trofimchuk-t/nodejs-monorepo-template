// https://blog.logrocket.com/how-to-set-up-node-typescript-express/

import 'express-async-errors';
import path from 'path';
import colors from 'colors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import router from './routes/transactions';

dotenv.config({ path: './config/config.env' });

const app: Express = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/v1/transactions', router);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'));

	app.get('*', (_req, res) => res.sendFile(path.resolve(__dirname, '/../../client', 'build', 'index.html')));
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5001;

app.listen(port, () =>
	// eslint-disable-next-line no-console
	console.log(colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)),
);
