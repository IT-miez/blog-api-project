import ReactDOM from 'react-dom/client';
import Router from './components/Router';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // Initialize QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Router></Router>
    </QueryClientProvider>
);
