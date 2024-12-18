import React, { createContext, useReducer } from "react";
import { Transaction } from "../types/Transaction";
import AppReducer, { Actions } from "./AppReducer";
import axios from "axios";

interface State {
  transactions: Transaction[];
  error: any;
  loading: boolean;
}

interface Context {
  transactions: Transaction[];
  error: any;
  loading: boolean;
  getTransactions: () => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
}

// Initial State
const initialState: State = {
  transactions: [],
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext<Context>(initialState as any);

// Provider component
export const GlobalProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const response = await axios.get("/api/v1/transactions");
      dispatch({
        type: Actions.GET_TRANSACTIONS,
        payload: response.data.data,
      });
    } catch (err: any) {
      dispatch({
        type: Actions.TRANSACTIONS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id: number) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: Actions.DELETE_TRANSACTION,
        payload: id,
      });
    } catch (err: any) {
      dispatch({
        type: Actions.TRANSACTIONS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction: Omit<Transaction, "id">) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/v1/transactions",
        transaction,
        config
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: response.data.data,
      });
    } catch (err: any) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
