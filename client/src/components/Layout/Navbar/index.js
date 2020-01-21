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
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">Players</Menu.Item>
                    <Menu.Item key="2">Clubs</Menu.Item>
                    <Menu.Item key="3">Matchs</Menu.Item>

                    {/* <Link to="/signin"><Button type="primary">LogIn</Button> </Link>
                    <Link to="/signup"> <Button ghost >SignUp</Button></Link> */}
                </Menu>


            </Header>
        </div >
    )
}

export default Navbar