// import React from 'react';
// import ReactDOM from 'react-dom';
// //import { Provider } from 'react-redux';
// //import store from './redux/store';
// import App from './App';
// import './styles/index.css'; // Correct path

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
// src/index.jsx or main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
