import { useState } from "react";
import UploadPage from "./components/UploadPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [result, setResult] = useState(null);

  return result ? (
    <Dashboard data={result} onReset={() => setResult(null)} />
  ) : (
    <UploadPage onResult={setResult} />
  );
}

export default App;