import { useState } from 'react';
import { addTransactionAsync } from '../reducers/transactionsSlice';
import { useAppDispatch } from '../store/hooks';

export const AddTransactionForm = () => {
	const dispatch = useAppDispatch();

	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTransaction = {
			text,
			amount,
		};

		// https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
		dispatch(addTransactionAsync(newTransaction))
			.unwrap()
			.then(() => {
				setText('');
				setAmount(0);
			})
			.catch(() => {});
	};

	return (
		<>
			<h3>Add new transaction</h3>
			<form onSubmit={onSubmit}>
				<div className='form-control'>
					<label htmlFor='text'>Text</label>
					<input
						type='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder='Enter text...'
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='amount'>
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type='number'
						value={amount}
						onChange={(e) => setAmount(+e.target.value)}
						placeholder='Enter amount...'
					/>
				</div>
				<button className='btn'>Add transaction</button>
			</form>
		</>
	);
};
