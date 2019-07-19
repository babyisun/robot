/**
 * 全局路由配置
 * 规则 父级无对应文件(路由名字不重复)、二级对应列表页、三级对应添加(Create)、编辑(Edit)等操作功能
 *
 * name - 导航展示名称
 * path - 页面 url路由，区分大小写，与你的文件夹命名大小写保持一致
 * folder - 文件目录，区分大小写，与你的文件夹命名大小写保持一致，如果有该属性则会渲染成页面节点，如果没有则认为是父级导航
 * file - 页面文件所在路径，默认为Index
 * defaultStore - 默认加载文件夹下的 store文件作为数据管理，如需替换文件名请重新赋值 如 defaultStore = "model"
 * store - 页面还有其它store时，可接收数组形式传递store注入，同文件夹直接写名称，不同文件夹请写src下的全路径
 * icon - 图标名
 * code - 权限码
 * hide - 是否隐藏菜单  true为隐藏，默认不填为显示
 * link - 如果是外链形式，设置 link: true
 *
 * children - 配置项递归同上
 */
export const Key = {
  Add: 'create',
  Edit: 'edit',
  Detail: 'detail',
  ID: ':id',
  EditID: ':editid'
};

const router = [{
    name: '机器人',
    path: '/robot',
    folder: '/Robot',
    icon: 'robot',
    code: 1,
    children: [{
      name: '添加机器人',
      path: `/robot/${Key.Add}`,
      folder: '/Robot',
      file: 'Create',
      code: 101,
      hide: true,
    }],
  },
  {
    name: '任务档',
    path: '/task',
    folder: '/Task',
    icon: 'task',
    code: 2,
    children: [{
        name: '添加任务',
        path: `/task/${Key.Add}/${Key.ID}`,
        folder: '/Task',
        code: 201,
        file: 'Create',
        // store: ['stores/Common'],
        hide: true,
      },
      {
        name: '查看任务',
        path: `/task/${Key.Detail}/${Key.ID}`,
        folder: '/Task',
        code: 201,
        file: 'Create',
        hide: true,
      }
    ],
  },
  {
    name: '关于我',
    path: '/about',
    folder: '/About',
    code: 3,
    icon: 'donate',
  },
];

// 每个业务根据场景区别自己的路由获取规则
// bpath 值为上级真实跳转值
export const getNode = pathname => {
  const mark = '/';
  const bread = [];
  const p = pathname.toLowerCase();
  const path = p.split(mark);
  if (path.length > 2) {
    // 拿到父级根节点
    const root = router.find(o => o.path.toLowerCase().split(mark).includes(path[1]));
    if (root && root.children && path[2]) {
      bread.push(root);
      // 编辑或添加页，三级
      if (
        (p.includes(Key.Add.toLowerCase()) ||
          p.includes(Key.Edit.toLowerCase()) ||
          p.includes(Key.Detail.toLowerCase())) &&
        root.children
      ) {
        // 先找二级
        const node = root.children.find(o => o.path.toLowerCase().split(mark).includes(path[2]));
        console.log(node, path[3]);
        if (node && path.length > 3 && node.children) {
          // node.bpath = node.path.replace(Key.ID, path[3]);
          node.bpath = node.path;
          bread.push(node);
          const n = node.children.find(o => o.path.toLowerCase().split(mark).includes(path[3]));
          if (n) {
            bread.push(n);
          }
          return bread;
        }
      }
      // 二级
      const n = root.children.find(o => o.path.toLowerCase().split(mark).includes(path[2]));
      if (n) {
        bread.push(n);
      }
      // console.log(bread, 'xxx');
      return bread;
    }
  }
  return null;
};

export default router;
