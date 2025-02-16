/*
 *   Copyright (c) 2025
 *   All rights reserved.
 */
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/app';
import './index.css';
import { store } from './lib/store';
import { BrowserRouter } from 'react-router';
import { ColorsGlobal } from './lib/ui/colors.globals';
import { ToastContainer } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ColorsGlobal />
          <App />
          <ToastContainer />
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
