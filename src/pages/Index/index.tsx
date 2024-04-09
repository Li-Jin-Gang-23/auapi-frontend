import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {listInterfaceInfoByPageUsingGet} from "@/services/aurumapi-backend/interfaceInfoController";
import {List, message} from "antd";

const Index: React.FC = () => {
  // 使用 useState 和泛型来定义组件内的状态
  // 加载状态
  const [Loading, setLoading] = useState(false);
  // 列表数据
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  // 总数
  const [total, setTotal] = useState<number>(0);

  // 定义异步加载数据的函数
  const loadData = async (current = 1, pageSize = 5) => {
    // 设置加载状态为 true
    setLoading(true);
    try {
      // 调用接口获取数据
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      // 更新列表数据和总数
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    // 设置加载状态为 false
    setLoading(false)
  };

  useEffect(() => {
    // 页面加赞完成后，调用加载数据的函数
    loadData();
  }, []);


  return (
    // 使用 antd 的 PageContainer 组件作为页面容器
    <PageContainer title={"在线接口开发平台"}>
      <List
        className="my-list"
        // 设置 loading 属性，表示数据是否正在加载中
        loading={Loading}
        itemLayout="horizontal"
        // 将列表数据作为数据源传递给 List 组件
        dataSource={list}
        // 渲染每个列表项
        renderItem={(item) => {
          // 构建列表项的链接地址
          const apiLink = `/interface_info/${item.id}`;
          return (
            // 显示查看链接
            <List.Item actions={[<a key={item.id} href={apiLink}>查看</a>]}>
              <List.Item.Meta
                // 列表项标题显示为可点击链接
                title={<a href={apiLink}>{item.name}</a>}
                // 描述
                description={item.description}
              />
            </List.Item>
          );
        }}
        // 分页配置
        pagination={{
          // 显示总数
          showTotal(total: number) {
            return "总数" + total;
          },
          pageSize: 5,
          total: total,
          // 切换页面触发的回调函数
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}

      />
    </PageContainer>
  );
};

export default Index;
