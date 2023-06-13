import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Root } from './pages/root';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  );
}

export default App;
