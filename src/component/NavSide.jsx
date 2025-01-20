import React from 'react';
import { TbCalendarUser } from 'react-icons/tb';
import { Menu } from 'antd';

import { BranchesOutlined, LikeOutlined, LogoutOutlined } from '@ant-design/icons';
import { DoneOutlined, House, SettingsOutlined } from '@mui/icons-material';

import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { getInitials, getUser } from '../helpers/utils.js';

// format
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
        className : '!text-white',
    };
}

// Menu-Side-List
const items = [
    getItem('Overview', 'overview', <DashboardIcon />),
    getItem('Events', 'events', <EventIcon />, [
        getItem('List Event', 'event', <EditCalendarIcon />),
        getItem('Create Event Track', 'new-event-track', <BranchesOutlined />),
        getItem('Create Venue', 'new-venue', <House />),
        getItem('My Events', 'my-events', <TbCalendarUser />),
        getItem('Registered Events', 'registered-events', <DoneOutlined />),
        getItem('Recommended', 'recommended', <LikeOutlined />),
    ]),
    getItem('Settings', 'settings', <SettingsOutlined />),
    getItem('logout', 'logout', <LogoutOutlined />),
];


// UI
const NavSide = ({ setOpen }) => {
    const user = getUser();
    const loc = window.location.pathname.split('/')[1] || 'overview';

    console.log(window.location.pathname);
    const onClick = (menu) => {
        if (menu.key === 'logout') {
            localStorage.removeItem('user');
            window.location = '/';
        } else {
            window.location = `/${menu.key === 'overview' ? '' : menu.key}`;
        }
        if (menu.key === "event") {

        }
    };

    return (
        <div
            className={`sidenav ${open ? 'open' : 'closed'}`}
            style={{ position: 'absolute', zIndex: 1000 }}
        >
            
            <div className="min-h-[86vh]">

                {/* {app logo} */}
                <div className="brand mt-6 mb-6 flex items-center justify-between">
                    <Link to="/">
                     <img src={Logo} alt="Norton" className="w-[200px]" />
                    </Link>
                    <div className="block lg:hidden" onClick={() => setOpen(false)}>
                        <MenuIcon className="text-white block " />
                    </div>
                </div>
                <hr />

                {/* {Menu and sub-menu} */}
                <Menu
                    className="w-full mt-10 bg-transparent text-white hover:text-white"
                    onClick={onClick}
                    defaultSelectedKeys={[loc]}
                    defaultOpenKeys={['events', 'recommended']}
                    mode="inline"
                    items={items}
                />
            </div>
            <hr />

            {/* {cur login name} */}
            <div className="grid grid-cols-2 grid-flow-col text-white mt-4 cursor-pointer">
                <span className="mt-2 font-bold">
                    <span className="text-sm mr-2 bg-red-700 p-3 rounded-full">
                        {getInitials()}
                    </span>
                </span>
                <br />
                <span className="mr-10 leading-4">
                    <span className="text-nowrap">{user?.name}</span>
                    <br />
                    <span className="text-xs">{user?.email}</span>
                </span>
            </div>
        </div>
    );
};

export default NavSide;