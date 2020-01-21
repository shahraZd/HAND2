import React from 'react'
import { Layout, Menu, Button } from "antd"
import { Link } from "react-router-dom"

const Navbar = () => {
    const { Header } = Layout;

    const style = {
        logo: {

            width: "120px",
            height: "31px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px 24px 16px 0",
            float: "left"

        }
    }


    return (
        <div>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div style={style.logo} />
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


            </Header>
        </div >
    )
}

export default Navbar