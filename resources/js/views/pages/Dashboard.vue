<script setup>
import MapDesh from '@/components/lib/admin/dashboard/map.vue';
import useReuseableData from "@/components/apis/reuseabledata";
import Calculator from '@/components/lib/calculator.vue';
import { onMounted, ref } from 'vue';
const { dashboarddata,getDashboardData} = useReuseableData();

const emit = defineEmits(['changeActive'])
onMounted(() => {
  emit('changeActive', 'Dashboard');
  getDashboardData();
});
</script>

<template>
<div class="row">

        <div class="col-lg-8 mb-4">
          <div class="row h-100">
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.Division??0 }}</h5>
                          <small>Language</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.City??0 }}</h5>
                          <small>Country</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.Shongshodashon??0 }}</h5>
                          <small>City</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.Upazila??0 }}</h5>
                          <small>Masjid</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.Upazila??0 }}</h5>
                          <small>Masjid</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.Union??0 }}</h5>
                          <small>Masjid user</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.Shongshodshodosho??0 }}</h5>
                          <small>Salat time</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.Upazilakormotorta??0 }}</h5>
                          <small>Display message</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.Upazilakormotorta??0 }}</h5>
                          <small>Access token</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>

          </div>
        </div>

        <div class="col-lg-4 mb-4">
          <div class="h-100 card card-body" style="padding:10px">
            <center>
              <Calculator />
            </center>
          </div>
        </div>


         <div class="row">
             <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.User??0 }}</h5>
                          <small>Admin</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.User??0 }}</h5>
                          <small>Role</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>
              <div class="col-lg-4 col-sm-6 mb-4">
                 <div class="card ">
                    <div class="card-body d-flex justify-content-between align-items-center">
                       <div class="card-title mb-0">
                          <h5 class="mb-0 me-2" >{{ dashboarddata.User??0 }}</h5>
                          <small>Permission</small>
                       </div>
                       <div class="card-icon"><span class="badge bg-label-success rounded-pill p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></span></div>
                    </div>
                 </div>
              </div>

         </div>

<br/><br/><br/>
<br/><br/><br/>
<br/><br/><br/>
</div>
<br/><br/><br/>

</template>

<style scoped>
</style>
