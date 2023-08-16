import { Button, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import dayjs from "dayjs";

export default function AntdDemo() {
	return (
    <div>
      <div className="mb-3">
				<span className='mr-3'>按钮</span>
        <Link to="/">
          <Button>回到首页</Button>
        </Link>
      </div>
      <div>
        <span className='mr-3'>日期组件，默认值是昨天</span>
        <DatePicker defaultValue={dayjs().subtract(1, "day")} />
      </div>
    </div>
  );
}
