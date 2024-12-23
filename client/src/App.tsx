import './App.css';
import { AddTransactionForm } from './components/AddTransactionForm';
import { Balance } from './components/Balance';
import { Header } from './components/Header';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { GlobalProvider } from './context/GlobalState';

function App() {
	return (
		<GlobalProvider>
			<Header />
			<div className='container'>
				<Balance />
				<IncomeExpenses />
				<TransactionList />
				<AddTransactionForm />
			</div>
		</GlobalProvider>
	);
}

export default App;
