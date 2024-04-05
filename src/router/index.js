import Vue from 'vue'
import Router from 'vue-router'
import { getMenu } from '@/utils/auth'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { logout } from '@/api/user'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const excRoutes = [
  {
    path: '/form',
    component: Layout,
    meta: { requiresAuth: false, title: 'Form', icon: 'form', roles: ['editor'] }  ,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { requiresAuth: false, title: 'Form', icon: 'form', roles: ['editor'] }  
      }
    ]
  },

  

  {
    path: '/mypath',
    component: Layout,
    meta: {  requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: 'index',
        // name: 'Page1',
        component: () => import('@/views/mypath/index'),
        meta: {  requiresAuth: true, title: '组织机构', icon: 'table', roles: ['admin']  }
      }
    ]
  },

]



export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {  requiresAuth: false, roles: ['admin'] }
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    meta: {  requiresAuth: false, roles: ['admin'] }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {  requiresAuth: false, roles: ['admin'] },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {  requiresAuth: false, title: 'Dashboard', icon: 'dashboard', roles: ['admin'] }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/system',
  //   component: () => import('@/layout'),
  //   meta: { title: '系统管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: '/system/user',
  //       component: () => import('@/views/system/user'),
  //       meta: { title: '用户管理', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       // name: 'Tree',
  //       component: () => import('@/views/system/dept'),
  //       meta: { title: '机构管理', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   meta: { requiresAuth: false, title: 'Form', icon: 'form', roles: ['editor'] }  ,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { requiresAuth: false, title: 'Form', icon: 'form', roles: ['editor'] }  
  //     }
  //   ]
  // },

  

  // {
  //   path: '/mypath',
  //   component: Layout,
  //   meta: {  requiresAuth: true, roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       // name: 'Page1',
  //       component: () => import('@/views/mypath/index'),
  //       meta: {  requiresAuth: true, title: '组织机构', icon: 'table', roles: ['admin']  }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
// export const constantRoutes = getMenu()

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// router.addRoutes([{
//   path: '/form',
//   component: () => import('@/views/form/index'),
//   meta: {  title: '组织机构222', icon: 'table', roles: ['admin']  }
//   }]);

export function resetRouter(roles) {
  
  // const newRouter = createRouter()
  // router.matcher = newRouter.matcher
  const filteredRoutes = excRoutes.filter(route => {  
    // if (!route.meta.requiresAuth) return true; // 公共路由始终返回true  
    return route.meta.roles.some(role => roles.includes(role)); // 检查用户角色  
  });  
  console.log(filteredRoutes);
  // return filteredRoutes; 
  
  // router.addRoutes([{
  //     path: '/form',
  //     component: () => import('@/views/form/index'),
  //     meta: {  title: '组织机构222', icon: 'table'}
  //     }]);
  router.addRoutes(filteredRoutes);
  router.options.routes.push(filteredRoutes)
 
  // router.addRoutes(filteredRoutes);
  
  // router.addRoutes(filteredRoutes); //不返回，直接重置
  // router.matcher = newRouter.matcher // reset router
}

export function resetRouter2() {
  
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  // const filteredRoutes = excRoutes.filter(route => {  
  //   // if (!route.meta.requiresAuth) return true; // 公共路由始终返回true  
  //   return route.meta.roles.some(role => roles.includes(role)); // 检查用户角色  
  // });  
  // console.log(filteredRoutes);
  // return filteredRoutes; 
  
  // router.addRoutes([{
  //     path: '/form',
  //     component: () => import('@/views/form/index'),
  //     meta: {  title: '组织机构222', icon: 'table'}
  //     }]);
  // router.addRoutes(filteredRoutes);
  // router.options.routes = router.options.routes.concat(filteredRoutes);
  // router.addRoutes(filteredRoutes); //不返回，直接重置
  // router.matcher = newRouter.matcher // reset router
}

export default router
