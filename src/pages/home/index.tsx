import { Button } from 'antd'

function Home() {

  return (
    <>
      <div className="m-3">
        <Button>
					<a href='/react-template/about'>路由切换</a>
				</Button>
      </div>
      <div className="m-3">
        <Button>
					<a href='/react-template/antd-demo'>AntD Demo</a>
				</Button>
      </div>
    </>
  );
}

export default Home;
