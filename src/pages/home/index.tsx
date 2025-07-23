import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { Link } from 'pure-react-router';

function Home() {
	const {
		loading: fetchLoading,
		runAsync: handleFakeFetch
	} = useRequest(
    () => {
      return fetch(window.location.href).then((res) => {
        return res.text();
      });
    },
    {
			manual: true,
      onSuccess: (res) => {
        console.log("请求结果", res);
				message.success('请求成功')
      },
    }
  );

  return (
    <>
      <div className="m-3">
        <Button loading={fetchLoading} onClick={handleFakeFetch}>
          点击请求
        </Button>
      </div>
      <div className="m-3">
        <Button>
          <Link to="/about">路由切换</Link>
        </Button>
      </div>
      <div className="m-3">
        <Button>
          <Link to="/antd-demo">AntD Demo</Link>
        </Button>
      </div>
    </>
  );
}

export default Home;
