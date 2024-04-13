export default [
  {path: '/', name: '主页', icon: 'smile', component: './Index'},
  {path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './InterfaceInfo', hideInMenu: true},

  {
    name: '登录',
    path: '/user',
    layout: false,
    routes: [{path: '/user/login', component: './User/Login'}],
  },

  {
    path: '/admin',
    name: '管理页页面',
    icon: 'crown',
    // 权限控制可以去看 and design pro 的官方文档
    access: 'canAdmin',
    routes: [
      {name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo'},
      {name: '接口分析', icon: 'analysis', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis'}
    ],
  },
  // {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
