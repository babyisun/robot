// 基础框架引用
import React from 'react';
import { observer, inject } from 'mobx-react';
// import ajax from '@/utils/ajax';
// 底层ui组件引用
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import Loading from '#/components/loading';
import Path from '#/components/bread';
import { LAYOUT } from '@/utils/const';
// 业务组件引用
// import router from '../router';
import Header from './Basic/Header';
// import Drawer from './Basic/Drawer';
import Sider from './Basic/Sider';
import Footer from './Basic/Footer';

// 样式引用
import styles from './BasicLayout.scss';

const { Content } = Layout;

@inject('bs')
@observer
class BasicLayout extends React.Component {
  componentDidMount() {
    const { bs } = this.props;
    bs.getUser();
  }

  setLayout(path) {
    this.NeedHF = !LAYOUT.NotNeedHF.some(item => path.includes(item));
  }

  render() {
    const {
      bs,
      children,
      location: { pathname },
    } = this.props;
    this.setLayout(pathname);
    return (
      <Layout>
        {this.NeedHF && <Header />}
        {this.NeedHF && <Sider />}
        <Layout className={styles.layout}>
          {this.NeedHF && <Path data={bs.currPage} />}
          <Content className={this.NeedHF ? styles.content : styles.full}>
            {bs.getUserLoading ? <Loading /> : children}
          </Content>
          {this.NeedHF && <Footer />}
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
