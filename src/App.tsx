import RoutesController from "./routes/index.tsx";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <RoutesController />
    </AuthProvider>
  );
}

export default App;
