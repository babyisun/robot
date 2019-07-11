import React from 'react';
import { Layout, Menu, Badge, Spin } from 'antd';
import { withRouter, NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Config from '@/config/config';
import router, { getNode } from '@/router';
import styles from './Sider.scss';

const { SubMenu, Item } = Menu;

const DotMenu = [0]; // 需要红点的菜单

@inject('bs')
@observer
class Sider extends React.Component {
  constructor(props) {
    super(props);
    this.loaded = true;
    this.state = {
      openKeys: [], // 默认展开的侧边栏项
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { pathname: curPath } = history.location;
    this.setOpenKeys(curPath);
    this.init(curPath);
    history.listen(({ pathname: nextPathname }) => {
      if (!this.loaded) return;
      this.init(nextPathname);
      window.scrollTo(0, 0);
      this.setOpenKeys(nextPathname);
    });
  }

  componentWillUnmount() {
    this.loaded = false;
  }

  init = p => {
    const { bs } = this.props;
    // p为pathname
    const bread = getNode(p);
    // console.log('面包：', bread);
    const selected = bread && bread.length > 1 ? bread[1] : null;
    // console.log('当前选中导航：', pathname);
    bs.setCurrPage(bread);
    // console.log(bs.currEditCode);
    return selected;
  };

  setOpenKeys = pathname => {
    const path = pathname.split('/');
    const openKeys = path.length ? [`/${path[1]}`] : ['/'];
    this.setState({ openKeys });
    // console.log(openKeys);
  };

  onOpenChange = openKeys => {
    // 确保每次只打开1个菜单，如果要展示3级菜单，需要去掉slice(-1)
    this.setState({ openKeys: openKeys.slice(-1) });
  };

  creatItem = item => <Item key={item.path}>{this.getMenuItemPath(item)}</Item>;

  getMenuItemPath = item =>
    item.link ? (
      <a href={item.path} target="_blank" rel="noopener noreferrer">
        {item.icon && <i className={`iconfont icon-${item.icon}`} />}
        {item.name}
      </a>
    ) : (
      <NavLink to={item.path} activeClassName="active">
        {item.icon && <i className={`iconfont icon-${item.icon}`} />}
        {DotMenu.includes(item.code) ? (
          <Badge dot={this.props.exportlog.showLogListDot} offset={[4, -0.4]}>
            <span>{item.name}</span>
          </Badge>
        ) : (
          <span>{item.name}</span>
        )}
      </NavLink>
    );

  getSubMenuOrItem = item => {
    if (item.children && !item.hide && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <i className={`iconfont icon-${item.icon}`} />
                  {DotMenu.includes(item.code) ? (
                    <Badge dot={this.props.exportlog.showLogListDot} offset={[4, -0.4]}>
                      <span>{item.name}</span>
                    </Badge>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return this.creatItem(item);
    }
    return this.creatItem(item);
  };

  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    const { hasAuth } = this.props.bs;
    return menusData
      .filter(item => item.name && !item.hide && hasAuth(item.code))
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      });
    // .filter(item => item);
  };

  render() {
    const {
      location: { pathname },
      bs,
      // loading,
    } = this.props;
    const { openKeys } = this.state;
    // 拿到选中路由
    const p = `/${pathname
      .split('/')
      .slice(1, 2)
      .join('/')}`;
    console.log(p,pathname);
    return (
      <Layout.Sider
        className={styles.sider}
        width={180}
        collapsible
        collapsed={bs.collapsed}
        onCollapse={bs.setCollapse}
      >
        <div className={['logo', bs.collapsed ? 'small' : ''].join(' ')}>
          <NavLink to="/">
            <span className="image" />
            <span className="title">{Config.Web.Title}</span>
            <span className="tag">{Config.Web.Version}</span>
          </NavLink>
        </div>
        <Spin spinning={bs.getUserLoading}>
          <Menu
            className={styles.menu}
            mode="inline"
            theme="dark"
            openKeys={openKeys}
            selectedKeys={[p]}
            onOpenChange={this.onOpenChange}
          >
            {this.getNavMenuItems(router)}
          </Menu>
        </Spin>
      </Layout.Sider>
    );
  }
}

export default withRouter(Sider);
