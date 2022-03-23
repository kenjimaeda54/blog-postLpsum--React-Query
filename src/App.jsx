import { QueryClientProvider, QueryClient } from "react-query";
import { Posts } from "./Posts";
import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";

const queryCliente = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryCliente}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
