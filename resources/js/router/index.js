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


/* Authenticated component */

const sitename = import.meta.env.VITE_SITE_NAME;
const router = createRouter({
  history: createWebHistory(null),
  routes: [



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






    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middleware: "front",
        title: `your mosque`
      }
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
  if (to.meta.middleware == "guest") {
      if (store.state.auth.authenticated) {
          next({ name: "admin.dashboard" })
      }
      next();
  }
  else if (to.meta.middleware == "front") {
    next()
  }
  else {
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
