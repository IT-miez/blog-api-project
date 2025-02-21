import './styles/App.css';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsList from './components/PostsList';

const queryClient = new QueryClient(); // Initialize QueryClient

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Navbar />
            </div>
            <PostsList />
        </QueryClientProvider>
    );
}

export default App;
