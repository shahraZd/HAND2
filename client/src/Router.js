import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Layout } from 'antd';
import Navbar from "./components/Layout/Navbar"
import Signin from "./components/Auth/SignIn"
import Signup from "./components/Auth/SignUp"
import Admin from "./components/Layout/Main/Admin"



function Router() {
  const { Content, Footer } = Layout;

  return (


    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Navbar />
          <Content style={{ padding: '0 50px', marginTop: 64 }}>

            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>


              {/* <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} /> */}

            </div>

          </Content>
        </Switch>

        <Footer style={{ textAlign: 'center' }}>HAND2 ©2020 Created 2MIM_DEV </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
