##  基于layui&we-Admin的一个后台管理系统demo

## 主要技术栈

- Node
- Express
- MySQL

## 主要功能

- 用户登录注册
- 用户密码后台加密

![image-20200527172224456](https://gitee.com/constown/picgo/raw/master/img/20200527173903.png)

- 用户逻辑删除与重新注册激活

## 相关API

### 用户登录

#### 请求地址

http://localhost:3000/signIn

#### 请求方式

post

#### 参数类型

| 参数     | 是否必须 | 类型   | 说明     |
| -------- | -------- | ------ | -------- |
| name     | Y        | string | 用户名   |
| password | Y        | string | 用户密码 |

#### 返回示例

```
{
      state: 'ok',
      content: '登录成功'
}
```

### 用户注册

#### 请求地址

http://localhost:3000/signUp

#### 请求方式

post

#### 参数类型

| 参数     | 是否必须 | 类型   | 说明     |
| -------- | -------- | ------ | -------- |
| name     | Y        | string | 用户名   |
| password | Y        | string | 用户密码 |

#### 返回示例

```
{
      state: 'ok',
      content: '注册成功'
}
```

### 用户退出

#### 请求地址

http://localhost:3000/signOut

#### 请求方式

get

#### 参数类型

无

#### 返回示例

```
{
      state: 'ok',
      content: '退出成功'
}
```

### 更新个人信息

#### 请求地址

http://localhost:3000/user/updateInfo

#### 请求方式

post

#### 参数类型

| 参数  | 是否必须 | 类型   | 说明     |
| ----- | -------- | ------ | -------- |
| phone | N        | Number | 电话号码 |
| email | N        | String | 邮箱     |

#### 返回示例

```
{
      state: 'ok',
      content: '个人信息更新成功'
}
```

## 用户列表

#### 请求地址

http://localhost:3000/user/list

#### 请求方式

get

#### 参数类型

| 参数     | 是否必须 | 类型   | 说明 |
| -------- | -------- | ------ | ---- |
| page     | Y        | Number | 页码 |
| limitNum | Y        | Number | 条数 |

#### 返回示例

```
{
  code: 0,
  msg: 'OK',
  count: 2,
  data: [
    RowDataPacket {
      uid: 8,
      name: 'admin',
      rid: 1,
      phone: '17749991111',
      email: '123456@qq.com',
      del: 'false',
      role: '超级管理员',
      brief: '拥有所有的权限'
    },
    RowDataPacket {
      uid: 16,
      name: 'admin2',
      rid: 0,
      phone: null,
      email: null,
      del: 'false',
      role: '游客',
      brief: '只有浏览的权限'
    }
  ]
}
```

## 查看用户信息

#### 请求地址

http://localhost:3000/user/checkInfo

#### 请求方式

get

#### 参数类型

| 参数 | 是否必须 | 类型   | 说明   |
| ---- | -------- | ------ | ------ |
| name | Y        | String | 用户名 |

#### 返回示例

```
{
  user: RowDataPacket {
    uid: 8,
    name: 'admin',
    rid: 1,
    phone: '17749991111',
    email: '123456@qq.com',
    del: 'false',
    role: '超级管理员',
    brief: '拥有所有的权限'
  },
  _locals: [Object: null prototype] {}
}
```

## 管理员添加用户

#### 请求地址

http://localhost:3000/user/add

#### 请求方式

post

#### 参数类型

| 参数     | 是否必须 | 类型   | 说明   |
| -------- | -------- | ------ | ------ |
| name     | Y        | String | 用户名 |
| password | Y        | String | 密码   |
| phone    | N        | Number | 电话   |
| email    | N        | String | 邮箱   |

#### 返回示例

```
{
state: 'ok',
content: '添加成功'
}
{
state: 'false',
content: '该用户已注销，请激活'
}
```

