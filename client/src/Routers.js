import React from 'react';
import { BrowserRouter , Route, Switch } from "react-router-dom"
import { Layout,Menu } from 'antd';
import { Link } from "react-router-dom"
import Navbar from "./Layout/Navbar"
import Signin from "./Pages/Auth/SignIn"
import Signup from "./Pages/Auth/SignUp"
import Admin from "./Pages/Admin"
import Players from "./Pages/Players"
import Profile from "./Pages/Players/Profile"
import Matchs from "./Pages/Matchs"
import Classment from "./Pages/Classment"







function Routers() {
  const { Content, Footer } = Layout;

  return (


    <BrowserRouter>
      <Layout>



        {/* <Navbar /> */}


          <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to="/players">Players</Link></Menu.Item>
                    <Menu.Item key="2"> <Link to="/clubs">Clubs</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/matchs">Matchs</Link></Menu.Item> 

                    {/* <Link to="/signin"><Button type="primary">LogIn</Button> </Link>
                    <Link to="/signup"> <Button ghost >SignUp</Button></Link> */}
                </Menu>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>

          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Switch>
              <Route path="/signin" component={Signin} />
              <Route path="/admin" component={Admin} />
              <Route path="/players/profile" component={Profile} />
              <Route exact path="/matchs" component={Matchs} />

              <Route exact path="/players" component={Players} />
              <Route exact path="/classment" component={Classment} />

              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
            </Switch>

          </div>

        </Content>

        <Footer style={{ textAlign: 'center' }}>HAND2 ©2020 Created 2MIM_DEV </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default Routers;
