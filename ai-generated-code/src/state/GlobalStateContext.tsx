import React, { createContext, useReducer, Dispatch } from 'react';
    
    type CartItem = {
      id: string;
      name: string;
      price: number;
      // This can hold the complex cake configuration
      details: any; 
    };
    
    type State = {
      cart: CartItem[];
    };
    
    type Action =
      | { type: 'ADD_TO_CART'; payload: CartItem }
      | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
      | { type: 'CLEAR_CART' };
    
    const initialState: State = {
      cart: [],
    };
    
    const reducer = (state: State, action: Action): State => {
      switch (action.type) {
        case 'ADD_TO_CART':
          return {
            ...state,
            cart: [...state.cart, action.payload],
          };
        case 'REMOVE_FROM_CART':
          return {
            ...state,
            cart: state.cart.filter(item => item.id !== action.payload.id),
          };
        case 'CLEAR_CART':
          return {
            ...state,
            cart: [],
          };
        default:
          return state;
      }
    };
    
    export const GlobalStateContext = createContext<{
      state: State;
      dispatch: Dispatch<Action>;
    }>({
      state: initialState,
      dispatch: () => null,
    });
    
    export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
      const [state, dispatch] = useReducer(reducer, initialState);
    
      return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
          {children}
        </GlobalStateContext.Provider>
      );
    };