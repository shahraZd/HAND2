import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Navbar from "./components/Layout/Navbar"



function Router() {
  const { Header, Content, Footer } = Layout;

  return (



    <Layout>
      <Navbar />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>

        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>HAND2 ©2020 Created 2MIM_DEV </Footer>
    </Layout>
  );
}

export default Router;
