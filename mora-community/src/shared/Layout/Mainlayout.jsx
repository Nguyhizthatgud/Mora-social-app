import React from 'react'
import { Layout } from "antd";
import Navbar from './Navbar.jsx';
const Mainlayout = ({ children, Footerchildren }) => {
    return (
        <Layout className="main-layout min-h-screen">
            <Layout.Header className="absolute top-0 left-0 right-0 w-full z-50 !bg-transparent p-0 h-16 flex items-center justify-center"
                style={{
                    // backdropFilter: "blur(15px)",
                    transition: "all 0.3s ease-in-out"
                }}>
                <Navbar />
            </Layout.Header>
            <Layout.Content >
                {/* Main content goes here */}
                {children}
            </Layout.Content>
            <Layout.Footer className="text-center !bg-transparent">
                {Footerchildren}
            </Layout.Footer>
        </Layout >
    )
}

export default Mainlayout
