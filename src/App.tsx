import { Link } from 'react-router-dom'
import { Button } from 'antd'
import './App.css'

function App() {

  return (
    <>
      <div className="m-3">
        <Link to="/about" className="cursor-pointer">
          <Button>路由切换</Button>
        </Link>
      </div>
      <div className="m-3">
        <Link to="/antd-demo">
          <Button>AntD Demo</Button>
        </Link>
      </div>
    </>
  );
}

export default App
