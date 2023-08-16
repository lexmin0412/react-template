import { useRequest } from 'ahooks'
import { Button, message } from 'antd'

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
          <a href="/react-template/about">路由切换</a>
        </Button>
      </div>
      <div className="m-3">
        <Button>
          <a href="/react-template/antd-demo">AntD Demo</a>
        </Button>
      </div>
    </>
  );
}

export default Home;
