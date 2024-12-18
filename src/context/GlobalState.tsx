import React, { createContext, useReducer } from "react";
import { Transaction } from "../types/Transaction";
import AppReducer from "./AppReducer";

interface State {
  transactions: Transaction[];
}

interface Context {
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
}

// Initial State
const initialState: State = {
  transactions: [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
  ],
};

// Create context

export const GlobalContext = createContext<Context>(initialState as any);

// Provider component
export const GlobalProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id: number) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction: Transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
