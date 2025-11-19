import React from 'react'
import { Form, Input, Button, Checkbox, Flex, Row, Col, Divider } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons'
// import useAuth from '../../hooks/useAuth'
import Loginbg from '../../../assets/background/Loginbg.svg'
import Loginform from "./Loginform.jsx"
const Loginpage = () => {

    return (
        <div className="login-container h-screen min-w-lg sm:bg-cover sm:bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${Loginbg})` }}>
            <Row gutter={0} align="middle" className="h-full">
                {/* hero left side - login form */}
                <Col xs={24} md={12}>
                    {/* login form */}
                    <div className="border-0 rounded-lg bg-transparent shadow-lg p-8 max-w-md mx-auto hover:bg-gray-200 hover:transform hover:translate-y-2 duration-300 ease-in-out"  >
                        <Loginform />
                    </div>
                </Col>
                {/*hero right side  */}
                <Col xs={24} md={12} className="flex flex-col justify-center items-start p-16">

                </Col>

            </Row>
        </div >

    )
}

export default Loginpage
