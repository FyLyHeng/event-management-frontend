import React, { useState } from 'react';
import { Layout } from 'antd';
import MenuIcon from '@mui/icons-material/Menu';
import NavSide from '../component/NavSide';
import { Outlet } from 'react-router-dom';


const {Sider, Content } = Layout;

const MainFramLayout = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggleSidebar = () => {
        setOpen(!open);
    };
    return (
        <Layout>
            <Sider width={265} className="px-4 h-[100vh] hidden lg:block">
                <NavSide setOpen={setOpen} />
            </Sider>

            {/* small screen sider */}
            {open ? (
                <div className="absolute  top-0 z-20">
                    <Sider  width={265} className="px-4 h-[100vh] block lg:hidden ">
                        <NavSide setOpen={setOpen} />
                    </Sider>
                </div>
            ) : (
                <div className="block lg:hidden" onClick={() => setOpen(true)}>
                    <MenuIcon className="mt-5 ml-3 font-bold text-primary " />
                </div>
            )}

            <Content className="max-h-[100vh] overflow-y-auto px-8">
                <Outlet />
            </Content>
        </Layout>
    );
};

export default MainFramLayout;
