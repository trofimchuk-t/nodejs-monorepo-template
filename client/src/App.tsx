import './App.css';
import { AddTransactionForm } from './components/AddTransactionForm';
import { Balance } from './components/Balance';
import { Header } from './components/Header';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { TransactionsProvider } from './context/TransactionsContext';

function App() {
	return (
		<TransactionsProvider>
			<Header />
			<div className='container'>
				<Balance />
				<IncomeExpenses />
				<TransactionList />
				<AddTransactionForm />
			</div>
		</TransactionsProvider>
	);
}

export default App;
