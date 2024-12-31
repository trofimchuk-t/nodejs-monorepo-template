import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
	text: {
		type: String,
		required: [true, 'Please add expense title'],
		trim: true,
	},
	amount: {
		type: Number,
		required: [true, 'Please add expense amount'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Transaction', TransactionSchema);
