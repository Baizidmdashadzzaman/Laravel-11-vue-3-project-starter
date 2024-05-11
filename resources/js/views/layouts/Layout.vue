<script setup>
import { RouterLink, RouterView ,useRoute,useRouter } from 'vue-router';
import { onMounted,watch,ref } from 'vue';
import {
  isOpen1,isOpen2,isOpen3,isOpen4,toggleMenu,setuplanguage,openCloseMobileMenu
  ,layoutColopsed,toggolSearch,dpOpen1,dpOpen2,dpOpen3,dpOpen4,toggleDropdown
} from '@/components/lib/admin/layout/menu-child-open-close.js';

import {
  logout,userinfo,checkauth,authorized
} from '@/components/apis/auth';


import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';

import useReuseableData from "@/components/apis/reuseabledata";
const { setting_admin } = useReuseableData();


const backendurl = import.meta.env.VITE_BACKEND_URL;

  const user = ref({});


  onMounted(() => {
    checkauth();
    setTimeout(() => {
      user.value = userinfo;
    //   setuplanguage();
    }, 3000);
  });

  const route = useRoute();
  const router = useRouter();

  watch(userinfo, async (newdata, olddata) => {
    await checkauth();
    user.value = newdata;
  });

  watch(router, async (newdata, olddata) => {
    await checkauth();
    // openCloseMobileMenu();

    console.log('h');
  });

  watch(route, (newValue, oldValue) => {
    console.log('h');
    checkauth();
    // openCloseMobileMenu();
  });

watch(() => router.currentRoute.value, (to, from) => {
  console.log('Page changed from', from.fullPath, 'to', to.fullPath);
});

  const activemenu = ref("Dashboard");

  function changeActive(e) {
    activemenu.value = e;
  }

  function searchData(e) {
    router.push({name: 'admin.search', params: { id: e }});
  }

</script>

<template>
  <LoadingDiv message="Please wait , reload the page if not load properly" v-if="authorized==false"/>

  <div class="layout-wrapper layout-content-navbar" v-else>
      <div class="layout-container">

        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
          <div class="app-brand demo">
            <RouterLink :to="{name:'admin.dashboard'}" class="app-brand-link">
              <span class="">
                <img :src="$backendurl+'/resources/setting/'+setting_admin?.logo_backend" style="width: 30px;"/>
              </span>
              <span class="app-brand-text demo menu-text fw-bold" style="font-size: 18px;padding-left: 10px;">
                <!-- &nbsp;&nbsp;&nbsp; -->
                {{ setting_admin?.site_name }}
              </span>
            </RouterLink>
            <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
              <i @click="layoutColopsed" class="bx bx-log-out-circle menu-toggle-icon d-none d-xl-block ti-sm align-middle" style="padding-left: 2px;padding-top: 1px;"></i>
              <i @click="openCloseMobileMenu" class="bx bx-x d-block d-xl-none ti-sm align-middle" style="padding-left: 2px;padding-top: 1px;"></i>
            </a>
          </div>

          <div class="menu-inner-shadow"></div>

          <perfect-scrollbar>
          <ul class="menu-inner py-1">

            <li :class="activemenu == 'Dashboard' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.dashboard'}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Dashboard">Dashboard</div>
              </RouterLink>
            </li>
            <li :class="activemenu == 'setting' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.setting'}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-cog"></i>
                <div data-i18n="Setting">Setting</div>
              </RouterLink>
            </li>

            <li :class="isOpen1?('menu-item open'):('menu-item')" >
              <a  @click="toggleMenu('isOpen1')" href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons bx bx-slider-alt"></i>
                <div data-i18n="System">System</div>
                <div class="badge bg-primary rounded-pill ms-auto">3</div>
              </a>
              <ul class="menu-sub">
                <li class="menu-item ">
                  <a href="#" class="menu-link">
                    <div data-i18n="Permission">Permission</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="#" class="menu-link">
                    <div data-i18n="User role">User role</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="#" class="menu-link">
                    <div data-i18n="Admin">Admin</div>
                  </a>
                </li>
              </ul>
            </li>
            <li :class="activemenu == 'aztoken' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.aztoken.list'}" class="menu-link">
                <i class="menu-icon tf-icons bx bx-key"></i>
                <div data-i18n="Access token">Access token</div>
              </RouterLink>
            </li>

            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Basic information</span>
            </li>
            <li :class="isOpen2?('menu-item open'):('menu-item')">
              <a @click="toggleMenu('isOpen2')" href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons bx bx-info-circle"></i>
                <div data-i18n="Basic information">Basic info</div>
                <div class="badge bg-primary rounded-pill ms-auto">13</div>
              </a>
              <ul class="menu-sub">
                <li :class="activemenu == 'category' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.category.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Category">Category</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'subcategory' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.subcategory.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Subcategory">Subcategory</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'subsubcategory' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.subsubcategory.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Subsubcategory">Subsubcategory</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'bondsize' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.bondsize.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Bond size">Bond size</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'brand' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.brand.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Brand">Brand</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'color' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.color.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Color">Color</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'cupsize' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.cupsize.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Cup size">Cup size</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'delivarycharge' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.delivarycharge.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Delivary charge">Delivary charge</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'fabric' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.fabric.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Fabric">Fabric</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'origincountry' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.origincountry.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Origin country">Origin country</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'producttype' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.producttype.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Product type">Product type</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'size' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.size.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Size">Size</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'pricecode' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.pricecode.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Price code">Price code</div>
                  </RouterLink>
                </li>
              </ul>
            </li>

            <!-- <li :class="isOpen3?('menu-item open'):('menu-item')">
              <a @click="toggleMenu('isOpen3')" href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons ti ti-layers-union"></i>
                <div data-i18n="Product info">Product info</div>
                <div class="badge bg-primary rounded-pill ms-auto">1</div>
              </a>
              <ul class="menu-sub">
                <li :class="activemenu == 'product' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.product.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Product">Product</div>
                  </RouterLink>
                </li>
                <li :class="activemenu == 'customer' ? ('menu-item active'):('menu-item')">
                  <RouterLink :to="{name:'admin.customer.list'}" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-language"></i>
                    <div data-i18n="Customer">Customer</div>
                  </RouterLink>
                </li>
              </ul>
            </li> -->


            <li :class="activemenu == 'product' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.product.list'}" class="menu-link">
                <i class="menu-icon tf-icons ti ti-shopping-bag"></i>
                <div data-i18n="Product information">Product information</div>
              </RouterLink>
            </li>
            <li :class="activemenu == 'customer' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.customer.list'}" class="menu-link">
                <i class="menu-icon tf-icons ti ti-users"></i>
                <div data-i18n="Customer">Customer</div>
              </RouterLink>
            </li>


            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Order management</span>
            </li>

            <li :class="activemenu == 'order' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.order.list'}" class="menu-link">
                <i class="menu-icon tf-icons ti ti-box"></i>
                <div data-i18n="Orders">Orders</div>
              </RouterLink>
            </li>

            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Report management</span>
            </li>
            <li :class="activemenu == 'masjiduser' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.masjiduser.list'}" class="menu-link">
                <i class="menu-icon tf-icons ti ti-users"></i>
                <div data-i18n="Product report">Product report</div>
              </RouterLink>
            </li>
            <li :class="activemenu == 'salahtime' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.masjid.list'}" class="menu-link">
                <i class="menu-icon tf-icons ti ti-calendar-time"></i>
                <div data-i18n="Customer report">Customer report</div>
              </RouterLink>
            </li>
            <li :class="activemenu == 'displaymessage' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.masjid.list'}" class="menu-link">
                <i class="menu-icon tf-icons ti ti-message"></i>
                <div data-i18n="Sales report">Sales report</div>
              </RouterLink>
            </li>
            <li :class="activemenu == 'displaymessage' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.masjid.list'}" class="menu-link">
                <i class="menu-icon tf-icons ti ti-message"></i>
                <div data-i18n="Profit report">Profit report</div>
              </RouterLink>
            </li>

            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Frontend management</span>
            </li>
            <li :class="activemenu == 'websitepage' ? ('menu-item active'):('menu-item')">
              <RouterLink :to="{name:'admin.websitepage.list'}" class="menu-link">
                <i class="menu-icon tf-icons ti ti-app-window"></i>
                <div data-i18n="Website pages">Website pages</div>
              </RouterLink>
            </li>

            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Others</span>
            </li>
            <li class="menu-item">
              <a @click="logout" href="javascript:void(0);" class="menu-link">
                <i class="menu-icon tf-icons bx bx-log-in-circle"></i>
                <div data-i18n="Logout">Logout</div>
              </a>
            </li>
            <li class="menu-item">
               <br/>
            </li>

          </ul>
          </perfect-scrollbar>
        </aside>

        <div class="layout-page">

          <nav
            class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar">
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a @click="openCloseMobileMenu" class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="ti ti-menu-2 ti-sm"></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

              <div class="navbar-nav align-items-center">
                <div class="nav-item navbar-search-wrapper mb-0">
                  <a class="nav-item nav-link search-toggler d-flex align-items-center px-0" href="javascript:void(0);">
                    <i @click="toggolSearch" class="ti ti-search ti-md me-2"></i>
                    <span class="d-none d-md-inline-block text-muted">Enter here to search</span>
                  </a>
                </div>
              </div>

              <ul class="navbar-nav flex-row align-items-center ms-auto">

                <li class="nav-item dropdown-language dropdown me-2 me-xl-0 show">
                  <a @click="toggleDropdown('dpOpen1')" class="nav-link dropdown-toggle hide-arrow show" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <i class="ti ti-language-hiragana rounded-circle ti-md"></i>
                  </a>
                  <ul v-if="dpOpen1" class="dropdown-menu dropdown-menu-end show" data-bs-popper="static">
                    <li>
                      <a className="dropdown-item" href="javascript:void(0);" data-language="en">
                         <div id="google_translate_element" style="width: 140px;"></div>
                      </a>
                    </li>
                  </ul>
                </li>


                <li class="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0 show">
                  <a
                    @click="toggleDropdown('dpOpen2')"
                    class="nav-link dropdown-toggle hide-arrow show"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false">
                    <i class="bx bx-list-ul ti-md"></i>
                  </a>
                  <div v-if="dpOpen2" class="dropdown-menu dropdown-menu-end py-0 show" data-bs-popper="static">
                    <div class="dropdown-menu-header border-bottom">
                      <div class="dropdown-header d-flex align-items-center py-3">
                        <h5 class="text-body mb-0 me-auto">Shortcut</h5>
                        <a
                          href="javascript:void(0)"
                          class="dropdown-shortcuts-add text-body"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Add shortcuts"
                          ><i class="ti ti-sm ti-apps"></i
                        ></a>
                      </div>
                    </div>
                    <div class="dropdown-shortcuts-list scrollable-container">
                      <div class="row row-bordered overflow-visible g-0">
                        <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon rounded-circle mb-2">
                            <i class="ti ti-calendar fs-4"></i>
                          </span>
                          <a href="#" class="stretched-link">Calendar</a>
                          <small class="text-muted mb-0">Appointments</small>
                        </div>
                        <div class="dropdown-shortcuts-item col">
                          <span class="dropdown-shortcuts-icon rounded-circle mb-2">
                            <i class="ti ti-file-invoice fs-4"></i>
                          </span>
                          <a href="#" class="stretched-link">Invoice App</a>
                          <small class="text-muted mb-0">Manage Accounts</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1 show">
                  <a
                    @click="toggleDropdown('dpOpen3')"
                    class="nav-link dropdown-toggle hide-arrow show"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false">
                    <i class="bx bx-envelope ti-md"></i>
                    <span class="badge bg-primary rounded-pill badge-notifications">0</span>
                  </a>
                  <ul v-if="dpOpen3" class="dropdown-menu dropdown-menu-end py-0 show" data-bs-popper="static">
                    <li class="dropdown-menu-header border-bottom">
                      <div class="dropdown-header d-flex align-items-center py-3">
                        <h5 class="text-body mb-0 me-auto">Notification</h5>
                        <a
                          href="javascript:void(0)"
                          class="dropdown-notifications-all text-body"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Mark all as read"
                          ><i class="ti ti-mail-opened fs-4"></i
                        ></a>
                      </div>
                    </li>
                    <li class="dropdown-notifications-list scrollable-container">
                      <perfect-scrollbar>
                      <ul class="list-group list-group-flush" style="height: 300px;">

                        <!-- <li class="list-group-item list-group-item-action dropdown-notifications-item">
                          <div class="d-flex">
                            <div class="flex-shrink-0 me-3">
                              <div class="avatar">
                                <span class="avatar-initial rounded-circle bg-label-danger">CF</span>
                              </div>
                            </div>
                            <div class="flex-grow-1">
                              <h6 class="mb-1">Charles Franklin</h6>
                              <p class="mb-0">Accepted your connection</p>
                              <small class="text-muted">12hr ago</small>
                            </div>
                            <div class="flex-shrink-0 dropdown-notifications-actions">
                              <a href="javascript:void(0)" class="dropdown-notifications-read"
                                ><span class="badge badge-dot"></span
                              ></a>
                              <a href="javascript:void(0)" class="dropdown-notifications-archive"
                                ><span class="ti ti-x"></span
                              ></a>
                            </div>
                          </div>
                        </li> -->

                      </ul>
                     </perfect-scrollbar>
                    </li>
                    <li class="dropdown-menu-footer border-top">
                      <a
                        href="javascript:void(0);"
                        class="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center">
                        view all notification
                      </a>
                    </li>
                  </ul>
                </li>


                <li class="nav-item navbar-dropdown dropdown-user dropdown show" >
                  <a @click="toggleDropdown('dpOpen4')" class="nav-link dropdown-toggle hide-arrow show" href="javascript:void(0);" ><!--data-bs-toggle="dropdown"-->
                     <div class="avatar me-2 avatar-online">
                      <span class="avatar-initial rounded-circle bg-label-primary">
                        <font style="font-family: 'Nunito';">{{ user?.name?.substring(0, 2) }}</font>
                      </span>
                     </div>
                  </a>

                  <ul v-if="dpOpen4" class="dropdown-menu dropdown-menu-end show" data-bs-popper="static">
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar avatar-online">
                              <span class="avatar-initial rounded-circle bg-label-primary">
                                <font style="font-family: 'Nunito';">{{ user?.name?.substring(0, 2) }}</font>
                              </span>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <span class="fw-medium d-block">
                              <font style="font-family: 'Nunito';">{{ userinfo?.name }}</font>
                            </span>
                            <small class="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                  <perfect-scrollbar style="height: 120px;">
                    <li>
                      <a class="dropdown-item" href="#">
                        <i class="bx bx-user-circle me-2 ti-sm"></i>
                        <span class="align-middle">My Profile</span>
                      </a>
                    </li>
                  </perfect-scrollbar>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>

                    <li>
                      <a class="dropdown-item" @click="logout" href="javascript:void(0);">
                        <i class="bx bx-log-in-circle me-2 ti-sm"></i>
                        <span class="align-middle">Logout</span>
                      </a>
                    </li>

                  </ul>
                </li>

              </ul>
            </div>


            <div class="navbar-search-wrapper search-input-wrapper d-none" id="searchdiv">
              <input
                type="text"
                class="form-control search-input container-xxl border-0"
                placeholder="Search..."
                aria-label="Search..."
                @keyup="searchData($event.target.value)"
              />
              <i @click="toggolSearch" class="bx bx-x ti-sm search-toggler cursor-pointer"></i>
            </div>
          </nav>

          <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">

              <RouterView v-on:changeActive="changeActive" />

            </div>

            <footer class="content-footer footer bg-footer-theme">
              <div class="container-xxl">
                <div
                  class="footer-container d-flex align-items-center justify-content-between py-2 flex-md-row flex-column">
                  <div>
                    © 2024 Developed by
                    <!-- <a href="https://softscandic.com/" target="_blank" class="fw-medium">
                        <img :src="$frontendurl+'/logo-developer2.png'" style="width: 100px;">
                    </a> -->
                  </div>

                  <div class="d-none d-lg-inline-block">
                    <a href="#" class="footer-link me-4" target="_blank"
                      >Licence</a
                    >

                    <a
                      href="#"
                      target="_blank"
                      class="footer-link me-4"
                      >Documentation</a
                    >

                    <a href="#" target="_blank" class="footer-link d-none d-sm-inline-block"
                      >Support</a
                    >
                  </div>
                </div>
              </div>
            </footer>

            <div class="content-backdrop fade"></div>
          </div>

        </div>

      </div>

      <div class="layout-overlay layout-menu-toggle"></div>

      <div class="drag-target"></div>
    </div>

</template>

<style scoped>

</style>
