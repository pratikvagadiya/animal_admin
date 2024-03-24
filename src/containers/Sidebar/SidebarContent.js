import React from "react";
import { Menu } from "antd";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;


const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
            <Menu.Item key="wallpaperType">
              <Link to="/wallpaperType">
                <i className="icon icon-profile2" />
                <span>WallpaperTypes</span>
              </Link>
            </Menu.Item>

            <SubMenu
              title={
                <span>
                  <i className="icon icon-profile2" />
                  <span>Wallpaper</span>
                </span>
              }>
              <Menu.Item key="2dwallpaper">
                <Link to="/2dwallpaper">
                  <i className="icon icon-profile2" />
                  <span>2D Wallpaper</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3dwallpaper">
                <Link to="/3dwallpaper">
                  <i className="icon icon-profile2" />
                  <span>3D Wallpaper</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

