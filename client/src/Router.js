import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Layout } from 'antd';
import Navbar from "./components/Layout/Navbar"
import Signin from "./components/Auth/SignIn"
import Signup from "./components/Auth/SignUp"
import Admin from "./components/Layout/Main/Admin"
import Players from "./components/Layout/Main/Players"
import Profile from "./components/Layout/Main/Players/Profile"





function Router() {
  const { Content, Footer } = Layout;

  return (


    <BrowserRouter>
      <Layout>



        <Navbar />
        <Content style={{ padding: '0 50px', marginTop: 64 }}>

          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Switch>
              <Route path="/signin" component={Signin} />
              <Route path="/admin" component={Admin} />
              <Route path="/players/profile" component={Profile} />

              <Route exact path="/players" component={Players} />
              {/* <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} /> */}
            </Switch>

          </div>

        </Content>

        <Footer style={{ textAlign: 'center' }}>HAND2 ©2020 Created 2MIM_DEV </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
