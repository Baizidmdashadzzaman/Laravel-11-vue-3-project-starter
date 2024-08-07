import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Developer = () => import('@/views/pages/Developer.vue')
const HomeView = () => import('@/views/pages/HomeView.vue')
const About = () => import('@/views/pages/AboutView.vue')
const setting = () => import('@/views/pages/setting/setting.vue')
const search = () => import('@/views/pages/basemodule/search/search.vue')

/* Layouts */
const Layout = () => import('@/views/layouts/Layout.vue')
/* Layouts */

/* Guest component */
const Login = () => import('@/views/pages/auth/Login.vue')
const Pagenotfound = () => import('@/views/pages/Pagenotfound.vue')
/* Guest component */

/* Authenticated component */
const Dashborad = () => import('@/views/pages/Dashboard.vue')

const aztokenAdd = () => import('@/views/pages/aztoken/aztoken-add.vue')
const aztokenEdit = () => import('@/views/pages/aztoken/aztoken-edit.vue')
const aztokenList = () => import('@/views/pages/aztoken/aztoken-list.vue')

const roleAdd = () => import('@/views/pages/admin/role/role-add.vue')
const roleEdit = () => import('@/views/pages/admin/role/role-edit.vue')
const roleList = () => import('@/views/pages/admin/role/role-list.vue')
const rolePermission = () => import('@/views/pages/admin/role/role-permission.vue')

const permissionAdd = () => import('@/views/pages/admin/permission/permission-add.vue')
const permissionEdit = () => import('@/views/pages/admin/permission/permission-edit.vue')
const permissionList = () => import('@/views/pages/admin/permission/permission-list.vue')

const adminList = () => import('@/views/pages/admin/admin/admin-list.vue');

const aiChat = () => import('@/views/pages/basemodule/ai-chat/ai-chat.vue')

const vuexcrudAdd = () => import('@/views/pages/modules/vuex-crud/vuex-crud-add.vue')
const vuexcrudEdit = () => import('@/views/pages/modules/vuex-crud/vuex-crud-edit.vue')
const vuexcrudList = () => import('@/views/pages/modules/vuex-crud/vuex-crud-list.vue')

const realtimechat = () => import('@/views/pages/modules/realtimechat/realtimechat.vue')
const realtimechatChat = () => import('@/views/pages/modules/realtimechat/realtimechat-chat.vue')

/* Authenticated component */

const sitename = import.meta.env.VITE_SITE_NAME;
const router = createRouter({
  history: createWebHistory(null),
  routes: [


    {path: '/',name: 'home',component: HomeView,meta: {middleware: "front",title: `Laravel11 vue3`}},


    { path: "/admin/search/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.search",path: '/admin/search/:id',component: search,meta: { title: `Search`}
    }]},



    { path: "/admin/aztoken/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.aztoken.add",path: '/admin/aztoken/add',component: aztokenAdd,meta: { title: `Token add`}
    }]},
    { path: "/admin/aztoken/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.aztoken.edit",path: '/admin/aztoken/edit/:id',component: aztokenEdit,meta: { title: `Token edit`}
    }]},
    { path: "/admin/aztoken/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.aztoken.list",path: '/admin/aztoken/list',component: aztokenList,meta: { title: `Token list`}
    }]},


    { path: "/",component: Layout,meta: {middleware: "auth"},
      children: [
        { name: "admin.role.add",path: '/admin/role/add',component: roleAdd,meta: { title: `Role add`}},
        { name: "admin.role.list",path: '/admin/role/list',component: roleList,meta: { title: `Role list`}},
        { name: "admin.role.edit",path: '/admin/role/edit/:id',component: roleEdit,meta: { title: `Role edit`}},
        { name: "admin.role.permission",path: '/admin/role/permission/:id',component: rolePermission,meta: { title: `Role permission`}},

        { name: "admin.permission.add",path: '/admin/permission/add',component: permissionAdd,meta: { title: `Permission add`}},
        { name: "admin.permission.list",path: '/admin/permission/list',component: permissionList,meta: { title: `Permission list`}},
        { name: "admin.permission.edit",path: '/admin/permission/edit/:id',component: permissionEdit,meta: { title: `Permission edit`}},

        { name: "admin.admin.list",path: '/admin/admin/list',component: adminList,meta: { title: `Admin list`}},

        { name: "admin.ai.chat",path: '/admin/ai/chat',component: aiChat,meta: { title: `AI chat`}},

        { name: "admin.vuexcrud.add",path: '/admin/vuex-crud/add',component: vuexcrudAdd,meta: { title: `Vuex crud add`}},
        { name: "admin.vuexcrud.list",path: '/admin/vuex-crud/list',component: vuexcrudList,meta: { title: `Vuex crud list`}},
        { name: "admin.vuexcrud.edit",path: '/admin/vuex-crud/edit/:id',component: vuexcrudEdit,meta: { title: `Vuex crud edit`}},

        { name: "admin.realtimechat.list",path: '/admin/realtimechat/list',component: realtimechat,meta: { title: `Real time chat`}},
        { name: "admin.realtimechat.chat",path: '/admin/realtimechat/chat/:id',component: realtimechatChat,meta: { title: `Real time chat`}},

      ]
    },

    {
      path: '/admin/login',
      name: 'admin.login',
      component: Login,
      meta: {
        middleware: "guest",
        title: `Login`
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        middleware: "auth",
        title: `About`
      }
    },
    {
      path: "/admin/dashboard",
      component: Layout,
      meta: {
          middleware: "auth"
      },
      children: [
          {
              name: "admin.dashboard",
              path: '/admin/dashboard',
              component: Dashborad,
              meta: {
                  title: `Dashboard`
              }
          }
      ]
    },
    {
        path: "/admin/setting",
        component: Layout,
        meta: {
            middleware: "auth"
        },
        children: [
            {
                name: "admin.setting",
                path: '/admin/setting',
                component: setting,
                meta: {
                    title: `Setting`
                }
            }
        ]
      },



    {
      path: '/:pathMatch(.*)*',
      name: 'pagenotfound',
      component: Pagenotfound,
      meta: {
        middleware: "front",
        title: `Page not found`
      }
    },
    {
        path: '/admin/developer',
        name: 'admin.developer',
        component: Developer,
        meta: {
          middleware: "front",
          title: `System developer`
        }
      },

  ]
})

router.beforeEach((to, from, next) => {
  document.title = sitename+' : '+to.meta.title
  window.scrollTo(0, 0);

  console.log(to.meta.middleware)
  if (to.meta.middleware == "front") {
      next();
  }
  else if (to.meta.middleware == "guest") {
    console.log('hi2');
    if (store.state.auth.authenticated) {
        next({ name: "admin.dashboard" })
    }else{
        next()
    }
  }
  else {
    console.log('hi3');
      if (store.state.auth.authenticated) {
          next()
      } else {
        next({ name: "admin.login" })
        Swal.fire({
          icon: 'warning',
          text: 'Please login',
          showConfirmButton: false,
          timer: 2000
        });
      }
  }
})

export default router
