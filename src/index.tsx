
import ReactDOM from "react-dom/client";
import App from './App'
import "./index.css";
import '@ant-design/v5-patch-for-react-19';

const rootDom = document.getElementById("root")

ReactDOM.createRoot(rootDom!).render(<App />);
