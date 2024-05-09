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

const CountryAdd = () => import('@/views/pages/NordicPrayer/country/country-add.vue')
const CountryEdit = () => import('@/views/pages/NordicPrayer/country/country-edit.vue')
const CountryList = () => import('@/views/pages/NordicPrayer/country/country-list.vue')

const CitynpAdd = () => import('@/views/pages/NordicPrayer/citynp/citynp-add.vue')
const CitynpEdit = () => import('@/views/pages/NordicPrayer/citynp/citynp-edit.vue')
const CitynpList = () => import('@/views/pages/NordicPrayer/citynp/citynp-list.vue')

const languageAdd = () => import('@/views/pages/NordicPrayer/language/language-add.vue')
const languageEdit = () => import('@/views/pages/NordicPrayer/language/language-edit.vue')
const languageList = () => import('@/views/pages/NordicPrayer/language/language-list.vue')

const masjidAdd = () => import('@/views/pages/NordicPrayer/masjid/masjid-add.vue')
const masjidEdit = () => import('@/views/pages/NordicPrayer/masjid/masjid-edit.vue')
const masjidList = () => import('@/views/pages/NordicPrayer/masjid/masjid-list.vue')

const masjiduserAdd = () => import('@/views/pages/NordicPrayer/masjiduser/masjiduser-add.vue')
const masjiduserEdit = () => import('@/views/pages/NordicPrayer/masjiduser/masjiduser-edit.vue')
const masjiduserList = () => import('@/views/pages/NordicPrayer/masjiduser/masjiduser-list.vue')

const salahtimeAdd = () => import('@/views/pages/NordicPrayer/salahtime/salahtime-add.vue')
const salahtimeEdit = () => import('@/views/pages/NordicPrayer/salahtime/salahtime-edit.vue')
const salahtimeList = () => import('@/views/pages/NordicPrayer/salahtime/salahtime-list.vue')

const aztokenAdd = () => import('@/views/pages/aztoken/aztoken-add.vue')
const aztokenEdit = () => import('@/views/pages/aztoken/aztoken-edit.vue')
const aztokenList = () => import('@/views/pages/aztoken/aztoken-list.vue')


const displaymessageNAdd = () => import('@/views/pages/NordicPrayer/displaymessage/displaymessagen-add.vue')
const displaymessageNEdit = () => import('@/views/pages/NordicPrayer/displaymessage/displaymessagen-edit.vue')
const displaymessageNList = () => import('@/views/pages/NordicPrayer/displaymessage/displaymessagen-list.vue')

const websitepageAdd = () => import('@/views/pages/NordicPrayer/websitepage/websitepage-add.vue')
const websitepageEdit = () => import('@/views/pages/NordicPrayer/websitepage/websitepage-edit.vue')
const websitepageList = () => import('@/views/pages/NordicPrayer/websitepage/websitepage-list.vue')

const pricecodeList = () => import('@/views/pages/ecommerce/pricecode/pricecode-list.vue')

const categoryAdd = () => import('@/views/pages/ecommerce/category/category-add.vue')
const categoryEdit = () => import('@/views/pages/ecommerce/category/category-edit.vue')
const categoryList = () => import('@/views/pages/ecommerce/category/category-list.vue')

const subcategoryAdd = () => import('@/views/pages/ecommerce/subcategory/subcategory-add.vue')
const subcategoryEdit = () => import('@/views/pages/ecommerce/subcategory/subcategory-edit.vue')
const subcategoryList = () => import('@/views/pages/ecommerce/subcategory/subcategory-list.vue')

const subsubcategoryAdd = () => import('@/views/pages/ecommerce/subsubcategory/subsubcategory-add.vue')
const subsubcategoryEdit = () => import('@/views/pages/ecommerce/subsubcategory/subsubcategory-edit.vue')
const subsubcategoryList = () => import('@/views/pages/ecommerce/subsubcategory/subsubcategory-list.vue')

const bondsizeAdd = () => import('@/views/pages/ecommerce/bondsize/bondsize-add.vue')
const bondsizeEdit = () => import('@/views/pages/ecommerce/bondsize/bondsize-edit.vue')
const bondsizeList = () => import('@/views/pages/ecommerce/bondsize/bondsize-list.vue')

const brandAdd = () => import('@/views/pages/ecommerce/brand/brand-add.vue')
const brandEdit = () => import('@/views/pages/ecommerce/brand/brand-edit.vue')
const brandList = () => import('@/views/pages/ecommerce/brand/brand-list.vue')


const colorAdd = () => import('@/views/pages/ecommerce/color/color-add.vue')
const colorEdit = () => import('@/views/pages/ecommerce/color/color-edit.vue')
const colorList = () => import('@/views/pages/ecommerce/color/color-list.vue')

const cupsizeAdd = () => import('@/views/pages/ecommerce/cupsize/cupsize-add.vue')
const cupsizeEdit = () => import('@/views/pages/ecommerce/cupsize/cupsize-edit.vue')
const cupsizeList = () => import('@/views/pages/ecommerce/cupsize/cupsize-list.vue')

const delivarychargeAdd = () => import('@/views/pages/ecommerce/delivarycharge/delivarycharge-add.vue')
const delivarychargeEdit = () => import('@/views/pages/ecommerce/delivarycharge/delivarycharge-edit.vue')
const delivarychargeList = () => import('@/views/pages/ecommerce/delivarycharge/delivarycharge-list.vue')

const fabricAdd = () => import('@/views/pages/ecommerce/fabric/fabric-add.vue')
const fabricEdit = () => import('@/views/pages/ecommerce/fabric/fabric-edit.vue')
const fabricList = () => import('@/views/pages/ecommerce/fabric/fabric-list.vue')

const origincountryAdd = () => import('@/views/pages/ecommerce/origincountry/origincountry-add.vue')
const origincountryEdit = () => import('@/views/pages/ecommerce/origincountry/origincountry-edit.vue')
const origincountryList = () => import('@/views/pages/ecommerce/origincountry/origincountry-list.vue')

const producttypeAdd = () => import('@/views/pages/ecommerce/producttype/producttype-add.vue')
const producttypeEdit = () => import('@/views/pages/ecommerce/producttype/producttype-edit.vue')
const producttypeList = () => import('@/views/pages/ecommerce/producttype/producttype-list.vue')

const sizeAdd = () => import('@/views/pages/ecommerce/size/size-add.vue')
const sizeEdit = () => import('@/views/pages/ecommerce/size/size-edit.vue')
const sizeList = () => import('@/views/pages/ecommerce/size/size-list.vue')

const productAdd = () => import('@/views/pages/ecommerce/product/product-add.vue')
const productEdit = () => import('@/views/pages/ecommerce/product/product-edit.vue')
const productList = () => import('@/views/pages/ecommerce/product/product-list.vue')

const customerAdd = () => import('@/views/pages/ecommerce/customer/customer-add.vue')
const customerEdit = () => import('@/views/pages/ecommerce/customer/customer-edit.vue')
const customerList = () => import('@/views/pages/ecommerce/customer/customer-list.vue')

const productstockList = () => import('@/views/pages/ecommerce/productstock/productstock-list.vue')
const productreviewList = () => import('@/views/pages/ecommerce/productreview/productreview-list.vue')
const productwishlistList = () => import('@/views/pages/ecommerce/productwishlist/productwishlist-list.vue')

const orderAdd = () => import('@/views/pages/ecommerce/order/order-add.vue')
const orderEdit = () => import('@/views/pages/ecommerce/order/order-edit.vue')
const orderList = () => import('@/views/pages/ecommerce/order/order-list.vue')

/* Authenticated component */

const sitename = import.meta.env.VITE_SITE_NAME;
const router = createRouter({
  history: createWebHistory(null),
  routes: [

    { path: "/admin/order/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.order.add",path: '/admin/order/add',component: orderAdd,meta: { title: `Order add`}
    }]},
    { path: "/admin/order/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.order.edit",path: '/admin/order/edit/:id',component: orderEdit,meta: { title: `Order edit`}
    }]},
    { path: "/admin/order/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.order.list",path: '/admin/order/list',component: orderList,meta: { title: `Order list`}
    }]},


    { path: "/admin/search/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.search",path: '/admin/search/:id',component: search,meta: { title: `Search`}
    }]},

    { path: "/admin/productwishlist/list/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.productwishlist.list",path: '/admin/productwishlist/list/:id',component: productwishlistList,meta: { title: `Product wishlist`}
    }]},

    { path: "/admin/productreview/list/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.productreview.list",path: '/admin/productreview/list/:id',component: productreviewList,meta: { title: `Product review`}
    }]},

    { path: "/admin/productstock/list/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.productstock.list",path: '/admin/productstock/list/:id',component: productstockList,meta: { title: `Product stock`}
    }]},

    { path: "/admin/customer/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.customer.add",path: '/admin/customer/add',component: customerAdd,meta: { title: `Customer add`}
    }]},
    { path: "/admin/customer/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.customer.edit",path: '/admin/customer/edit/:id',component: customerEdit,meta: { title: `Customer edit`}
    }]},
    { path: "/admin/customer/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.customer.list",path: '/admin/customer/list',component: customerList,meta: { title: `Customer list`}
    }]},

    { path: "/admin/product/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.product.add",path: '/admin/product/add',component: productAdd,meta: { title: `Product add`}
    }]},
    { path: "/admin/product/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.product.edit",path: '/admin/product/edit/:id',component: productEdit,meta: { title: `Product edit`}
    }]},
    { path: "/admin/product/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.product.list",path: '/admin/product/list',component: productList,meta: { title: `Product list`}
    }]},


    { path: "/admin/size/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.size.add",path: '/admin/size/add',component: sizeAdd,meta: { title: `Size add`}
    }]},
    { path: "/admin/size/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.size.edit",path: '/admin/size/edit/:id',component: sizeEdit,meta: { title: `Size edit`}
    }]},
    { path: "/admin/size/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.size.list",path: '/admin/size/list',component: sizeList,meta: { title: `Size list`}
    }]},

    { path: "/admin/producttype/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.producttype.add",path: '/admin/producttype/add',component: producttypeAdd,meta: { title: `Producttype add`}
    }]},
    { path: "/admin/producttype/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.producttype.edit",path: '/admin/producttype/edit/:id',component: producttypeEdit,meta: { title: `Producttype edit`}
    }]},
    { path: "/admin/producttype/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.producttype.list",path: '/admin/producttype/list',component: producttypeList,meta: { title: `Producttype list`}
    }]},

    { path: "/admin/origincountry/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.origincountry.add",path: '/admin/origincountry/add',component: origincountryAdd,meta: { title: `Origincountry add`}
    }]},
    { path: "/admin/origincountry/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.origincountry.edit",path: '/admin/origincountry/edit/:id',component: origincountryEdit,meta: { title: `Origincountry edit`}
    }]},
    { path: "/admin/origincountry/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.origincountry.list",path: '/admin/origincountry/list',component: origincountryList,meta: { title: `Origincountry list`}
    }]},

    { path: "/admin/fabric/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.fabric.add",path: '/admin/fabric/add',component: fabricAdd,meta: { title: `Fabric add`}
    }]},
    { path: "/admin/fabric/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.fabric.edit",path: '/admin/fabric/edit/:id',component: fabricEdit,meta: { title: `Fabric edit`}
    }]},
    { path: "/admin/fabric/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.fabric.list",path: '/admin/fabric/list',component: fabricList,meta: { title: `Fabric list`}
    }]},

    { path: "/admin/delivarycharge/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.delivarycharge.add",path: '/admin/delivarycharge/add',component: delivarychargeAdd,meta: { title: `Delivarycharge add`}
    }]},
    { path: "/admin/delivarycharge/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.delivarycharge.edit",path: '/admin/delivarycharge/edit/:id',component: delivarychargeEdit,meta: { title: `Delivarycharge edit`}
    }]},
    { path: "/admin/delivarycharge/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.delivarycharge.list",path: '/admin/delivarycharge/list',component: delivarychargeList,meta: { title: `Delivarycharge list`}
    }]},

    { path: "/admin/cupsize/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.cupsize.add",path: '/admin/cupsize/add',component: cupsizeAdd,meta: { title: `Cupsize add`}
    }]},
    { path: "/admin/cupsize/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.cupsize.edit",path: '/admin/cupsize/edit/:id',component: cupsizeEdit,meta: { title: `Cupsize edit`}
    }]},
    { path: "/admin/cupsize/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.cupsize.list",path: '/admin/cupsize/list',component: cupsizeList,meta: { title: `Cupsize list`}
    }]},

    { path: "/admin/color/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.color.add",path: '/admin/color/add',component: colorAdd,meta: { title: `Color add`}
    }]},
    { path: "/admin/color/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.color.edit",path: '/admin/color/edit/:id',component: colorEdit,meta: { title: `Color edit`}
    }]},
    { path: "/admin/color/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.color.list",path: '/admin/color/list',component: colorList,meta: { title: `Color list`}
    }]},


    { path: "/admin/brand/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.brand.add",path: '/admin/brand/add',component: brandAdd,meta: { title: `Brand add`}
    }]},
    { path: "/admin/brand/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.brand.edit",path: '/admin/brand/edit/:id',component: brandEdit,meta: { title: `Brand edit`}
    }]},
    { path: "/admin/brand/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.brand.list",path: '/admin/brand/list',component: brandList,meta: { title: `Brand list`}
    }]},


    { path: "/admin/bondsize/add",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.bondsize.add",path: '/admin/bondsize/add',component: bondsizeAdd,meta: { title: `Bond size add`}
    }]},
    { path: "/admin/bondsize/edit/:id",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.bondsize.edit",path: '/admin/bondsize/edit/:id',component: bondsizeEdit,meta: { title: `Bond size edit`}
    }]},
    { path: "/admin/bondsize/list",component: Layout,meta: {middleware: "auth"},
    children: [{
      name: "admin.bondsize.list",path: '/admin/bondsize/list',component: bondsizeList,meta: { title: `Bond size list`}
    }]},

    { path: "/admin/subsubcategory/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.subsubcategory.add",path: '/admin/subsubcategory/add',component: subsubcategoryAdd,meta: { title: `Sub sub category add`}
    }]},
    { path: "/admin/subsubcategory/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.subsubcategory.edit",path: '/admin/subsubcategory/edit/:id',component: subsubcategoryEdit,meta: { title: `Sub sub category edit`}
    }]},
    { path: "/admin/subsubcategory/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.subsubcategory.list",path: '/admin/subsubcategory/list',component: subsubcategoryList,meta: { title: `Sub subcategory list`}
    }]},


    { path: "/admin/subcategory/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.subcategory.add",path: '/admin/subcategory/add',component: subcategoryAdd,meta: { title: `Sub category add`}
    }]},
    { path: "/admin/subcategory/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.subcategory.edit",path: '/admin/subcategory/edit/:id',component: subcategoryEdit,meta: { title: `Sub category edit`}
    }]},
    { path: "/admin/subcategory/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.subcategory.list",path: '/admin/subcategory/list',component: subcategoryList,meta: { title: `Sub category list`}
    }]},

    { path: "/admin/category/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.category.add",path: '/admin/category/add',component: categoryAdd,meta: { title: `Category add`}
    }]},
    { path: "/admin/category/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.category.edit",path: '/admin/category/edit/:id',component: categoryEdit,meta: { title: `Category edit`}
    }]},
    { path: "/admin/category/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.category.list",path: '/admin/category/list',component: categoryList,meta: { title: `Category list`}
    }]},


    { path: "/admin/pricecode/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.pricecode.list",path: '/admin/pricecode/list',component: pricecodeList,meta: { title: `Price code`}
    }]},


    { path: "/admin/websitepage/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.websitepage.add",path: '/admin/websitepage/add',component: websitepageAdd,meta: { title: `Websitepage add`}
    }]},
    { path: "/admin/websitepage/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.websitepage.edit",path: '/admin/websitepage/edit/:id',component: websitepageEdit,meta: { title: `Websitepage edit`}
    }]},
    { path: "/admin/websitepage/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.websitepage.list",path: '/admin/websitepage/list',component: websitepageList,meta: { title: `Websitepage list`}
    }]},


    { path: "/admin/displaymessage/add/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.displaymessage.add",path: '/admin/displaymessage/add/:id',component: displaymessageNAdd,meta: { title: `Display message add`}
    }]},
    { path: "/admin/displaymessage/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.displaymessage.edit",path: '/admin/displaymessage/edit/:id',component: displaymessageNEdit,meta: { title: `Display message edit`}
    }]},
    { path: "/admin/displaymessage/list/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.displaymessage.list",path: '/admin/displaymessage/list/:id',component: displaymessageNList,meta: { title: `Display message list`}
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

    { path: "/admin/salahtime/add/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.salahtime.add",path: '/admin/salahtime/add/:id',component: salahtimeAdd,meta: { title: `Masjid salat time add`}
    }]},
    { path: "/admin/salahtime/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.salahtime.edit",path: '/admin/salahtime/edit/:id',component: salahtimeEdit,meta: { title: `Masjid salat time edit`}
    }]},
    { path: "/admin/salahtime/list/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.salahtime.list",path: '/admin/salahtime/list/:id',component: salahtimeList,meta: { title: `Masjid salat time list`}
    }]},


    { path: "/admin/masjiduser/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.masjiduser.add",path: '/admin/masjiduser/add',component: masjiduserAdd,meta: { title: `Masjid user add`}
    }]},
    { path: "/admin/masjiduser/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.masjiduser.edit",path: '/admin/masjiduser/edit/:id',component: masjiduserEdit,meta: { title: `Masjid user edit`}
    }]},
    { path: "/admin/masjiduser/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.masjiduser.list",path: '/admin/masjiduser/list',component: masjiduserList,meta: { title: `Masjid user list`}
    }]},


    { path: "/admin/masjid/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.masjid.add",path: '/admin/masjid/add',component: masjidAdd,meta: { title: `Masjid add`}
    }]},
    { path: "/admin/masjid/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.masjid.edit",path: '/admin/masjid/edit/:id',component: masjidEdit,meta: { title: `Masjid edit`}
    }]},
    { path: "/admin/masjid/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.masjid.list",path: '/admin/masjid/list',component: masjidList,meta: { title: `Masjid list`}
    }]},


    { path: "/admin/language/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.language.add",path: '/admin/language/add',component: languageAdd,meta: { title: `Language add`}
    }]},
    { path: "/admin/language/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.language.edit",path: '/admin/language/edit/:id',component: languageEdit,meta: { title: `Language edit`}
    }]},
    { path: "/admin/language/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.language.list",path: '/admin/language/list',component: languageList,meta: { title: `Language list`}
    }]},

    { path: "/admin/citynp/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.citynp.add",path: '/admin/citynp/add',component: CitynpAdd,meta: { title: `City add`}
    }]},
    { path: "/admin/citynp/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.citynp.edit",path: '/admin/citynp/edit/:id',component: CitynpEdit,meta: { title: `City edit`}
    }]},
    { path: "/admin/citynp/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.citynp.list",path: '/admin/citynp/list',component: CitynpList,meta: { title: `City list`}
    }]},


    { path: "/admin/country/add",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.country.add",path: '/admin/country/add',component: CountryAdd,meta: { title: `Country add`}
    }]},
    { path: "/admin/country/edit/:id",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.country.edit",path: '/admin/country/edit/:id',component: CountryEdit,meta: { title: `Country edit`}
    }]},
    { path: "/admin/country/list",component: Layout,meta: {middleware: "auth"},
      children: [{
        name: "admin.country.list",path: '/admin/country/list',component: CountryList,meta: { title: `Country list`}
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
        title: `পৃষ্ঠা খুঁজে পাওয়া যায়নি`
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
