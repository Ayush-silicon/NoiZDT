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
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import './styles/index.css';

// Get the root element
const rootElement = document.getElementById('root');
// Create a root
const root = createRoot(rootElement);
// Render the app
root.render(<App />);