/* eslint-disable no-console */
import colors from 'colors';
import mongoose, { Mongoose } from 'mongoose';

let connection: Mongoose | null = null;

export const connectDb = async () => {
	try {
		connection = await mongoose.connect(process.env.MONGO_URI!);
		console.log(colors.cyan.bold(`MongoDB Connected: ${connection.connection.host}`));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

export const disconnectDb = async () => {
	await connection?.disconnect();
	console.log(colors.cyan.bold('MongoDB Disconnected'));
};
