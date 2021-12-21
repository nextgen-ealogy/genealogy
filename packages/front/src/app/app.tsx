import NxWelcome from './nx-welcome';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()


export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NxWelcome title="front" />
    </QueryClientProvider>
  );
}

export default App;
