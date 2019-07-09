### 登录模块
> 统一登录模块, 该模块提供 Login, ChangePassword, ChangePhone, Me 4 个组件。

#### 如何使用

```javascript
import React from 'react';
import Login, { ChangePassword, ChangePhone, Me } from 'Login';

const header = (
  <React.Fragment>
    <div className={styles.logoContainer}>
      <div className="logo" />
      <div className="content">
        <div className="desc">顺丰e证通</div>
        <div className="tag">运营端</div>
      </div>
    </div>
   </React.Fragment>
)

const info = [
    { label: '姓名', value: '张三'},
    { label: '角色', value: '管理员'},
    { label: '电话', value: '13211112222'},
]

clasee Demo extends React.Component {
    state={
        visiblePassword: false,
        visiblePhone: false,
    }

    handlePasswordModal= v => this.setState({ visiblePassword: v })

    handlePhoneModal= v => this.setState({ visiblePhone: v })

    render() {
        const { visiblePassword, visiblePhone } = this.state
        return (
            <React.Fragment>
                <Login header={header} register />
                <ChangePassword 
                visible={visiblePassword}
                hideModal={() => handlePasswordModal(false)}
                />
                <ChangePhone
                visiblePhone={visiblePhone}
                hideModal={() => handlePhoneModal(false)}
                />
                <Me name="李四" info={info} loginUrl="/admin/#/login"/>
            </React.Fragment>
        )
    }
}
```

#### 属性

##### Login

| 属性 | 类型 | 描述 | 属性 | 默认值 |
| :------|:------| :------ | :------ | :------ |
| register | Boolean | 是否显示注册按钮 | 非必填 | false |
| platform | String | 登录平台标识 | 必填 | -- |
| header | ReactNode | 登录页头部内容 | 非必填 | -- |
| homeUrl | String | 登录成功跳转地址 | 非必填 | / |
| loginUrl | String | 登录页面忘记密码修改完成后跳转登录地址相对路径 | 非必填 | /admin/#/login |
| return_url | String | 注册成功跳转地址 | 非必填 | /admin/#/login |

##### Me

| 属性 | 类型 | 描述 | 属性 | 默认值 |
| :------|:------| :------ | :------ | :------ |
| name | String | 用户展示的姓名 | 非必填 | -- |
| info | Object | 用户详细信息, <br/>eg: <br/>[<br/>&ensp;{ label: '姓名', value: '张三'}, <br/>&ensp;{ label: '角色', value: '管理员'}, <br/>&ensp;{ label: '电话', value: '13211112222'}<br/>]| 非必填 | -- |
| beforeExit | Function | 退出前回调函数 | 非必填 | -- |
| loginUrl | String | 登录地址相对路径 | 非必填 | -- |

##### ChangePassword

| 属性 | 类型 | 描述 | 属性 | 默认值 |
| :------|:------| :------ | :------ | :------ |
| visible | Boolean | 弹窗是否显示 | 必填 | false |
| hideModal | Function | 弹窗关闭函数 | 必填 | -- |
| loginUrl | String | 登录地址相对路径 | 非必填 | /admin/#/login |

##### ChangePhone

| 属性 | 类型 | 描述 | 属性 | 默认值 |
| :------|:------| :------ | :------ | :------ |
| visible | Boolean | 弹窗是否显示 | 必填 | false |
| hideModal | Function | 弹窗关闭函数 | 必填 | -- |
| loginUrl | String | 登录地址相对路径 | 非必填 | /admin/#/login |


