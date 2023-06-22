import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from 'store/store';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(
    <Provider store={store}>
        <App />
    </Provider>

);