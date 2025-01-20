import { Input } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const { Search } = Input;

const NavPage = () => {

    return (
        <div className="flex items-center justify-between flex-wrap gap-3 py-4 px-2">
            <div>
                <h2 className="text-2xl font-semibold">
                    {/* {selectedRoutPageTitle} */}
                    Wellcome
                </h2>
            </div>
            <div>
                <Search placeholder="Search" className="lg:w-[500px] items-center flex" />
            </div>
            <div>
                <BellOutlined className="text-2xl bg-gray-100 p-3 rounded-full text-gray-600" />
            </div>
        </div>
    );
};

export default NavPage;
