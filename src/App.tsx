import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import UserView from './components/UserView';
import store from './feature/store';

function App() {
  return (
   
      
   <Provider store={store}>
    <UserView />
   </Provider>
  );
}

export default App;
