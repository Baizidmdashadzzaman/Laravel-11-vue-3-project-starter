<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('crud', ['paginatedItems', 'totalPages', 'currentPage']),
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    ...mapActions('crud', ['fetchItems', 'deleteItem', 'setSearchQuery', 'setCurrentPage']),
    editItem(item) {
      this.$emit('edit-item', item);
    },
    deleteItemFromList(itemId) {
      this.deleteItem(itemId);
    //   if (confirm('Are you sure you want to delete this item?')) {

    //   }
    },
    searchItems() {
      this.setSearchQuery(this.searchQuery);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.setCurrentPage(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.setCurrentPage(this.currentPage + 1);
      }
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<template>
<div style="margin-bottom: 100px;">
   <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }} / list</h4>
   <div class="row">
      <div class="col-lg-12">
         <div class="card h-100">
            <div class="table-responsive card-datatable">
               <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="row ms-2 me-3 b">
                     <div class="card-header border-bottom">
                        <h5 class="card-title mb-3">{{ pagename }}</h5>
                        <div class="d-flex justify-content-between align-items-center row pb-2 gap-3 gap-md-0">
                           <div class="col-md-4 user_role"></div>
                           <div class="col-md-4 user_plan"></div>
                           <div class="col-md-4 user_status"></div>
                        </div>
                     </div>
                     <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
                        <div class="dataTables_length" id="DataTables_Table_0_length"></div>
                        <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
                           <div class="dt-buttons btn-group flex-wrap">
                              <label>
                              <input v-model="searchQuery" placeholder="Search items..." @input="searchItems" type="search" class="form-control" />
                              </label>
                           </div>
                        </div>
                     </div>
                     <div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">
                        <div id="DataTables_Table_0_filter" class="dataTables_filter">
                           <!-- <RouterLink  :to="{name:'admin.'+url_data+'.add'}" class="btn btn-secondary btn-primary" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-square-rounded-plus me-md-2"></i><span class="d-md-inline-block d-none">Add data</span></span>
                           </RouterLink> -->
                        </div>
                        <div class="invoice_status mb-3 mb-md-0"></div>
                     </div>
                  </div>
                  <div class="table-responsive text-nowrap border-bottom">
                     <table class="table table-hover ">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                           <tr v-for="singledata in paginatedItems" :key="singledata.id" >
                              <td>
                                 <strong >{{ singledata.id }}</strong>
                              </td>
                              <td><b>{{ singledata.name }}</b></td>
                              <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <button @click.prevent="editItem(singledata.id, index)" type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light">
                                       <i class="bx bx-edit me-md-2"></i>
                                    </button>
                                    <button @click.prevent="deleteItemFromList(singledata.id, index)" type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light">
                                       <i class="bx bx-trash-alt me-md-2"></i>
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <br/>
                  <div class="row mx-2">
                     <div class="col-sm-12 col-md-6">
                        <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite" >
                           Showing <font style="font-family: 'Nunito';">{{ paginatedItems?.length }}</font> data
                        </div>
                     </div>
                     <div class="col-sm-12 col-md-6">
                        <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                           <ul class="pagination ">
                            <li class="page-item first active">
                              <a @click="prevPage" :disabled="currentPage === 1" class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-left"></i></a>
                            </li>
                            <li class="page-item ">
                              <a class="page-link " href="javascript:void(0);">
                                Page {{ currentPage }} of {{ totalPages }}
                              </a>
                            </li>
                            <li class="page-item last active">
                              <a @click="nextPage" :disabled="currentPage === totalPages" class="page-link" href="javascript:void(0);"><i class="tf-icon bx bx-chevrons-right"></i></a>
                            </li>
                          </ul>
                        </div>
                     </div>
                  </div>
                  <!-- <LoadingDiv v-if="loading" /> -->
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>
