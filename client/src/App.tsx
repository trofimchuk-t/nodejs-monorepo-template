import './App.css';
import { useMemo } from 'react';
import { AddTransactionForm } from './components/AddTransactionForm';
import { Balance } from './components/Balance';
import { Header } from './components/Header';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { TransactionsContext, TransactionsStore } from './context/TransactionsContext';

function App() {
	const transactionsStore = useMemo(() => new TransactionsStore(), []);
	return (
		<TransactionsContext.Provider value={transactionsStore}>
			<Header />
			<div className='container'>
				<Balance />
				<IncomeExpenses />
				<TransactionList />
				<AddTransactionForm />
			</div>
		</TransactionsContext.Provider>
	);
}

export default App;
