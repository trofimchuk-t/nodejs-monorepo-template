import { Provider } from 'react-redux';
import './App.css';
import { AddTransactionForm } from './components/AddTransactionForm';
import { Balance } from './components/Balance';
import { Header } from './components/Header';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { store } from './store/store';

function App() {
	return (
		<Provider store={store}>
			<Header />
			<div className='container'>
				<Balance />
				<IncomeExpenses />
				<TransactionList />
				<AddTransactionForm />
			</div>
		</Provider>
	);
}

export default App;
