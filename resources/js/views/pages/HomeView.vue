<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <main>
    <div class="b-overlay position-absolute" style="inset: 0px; z-index: 10;">
       <div class="position-absolute rounded-sm" style="inset: 0px; opacity: 0.71; backdrop-filter: blur(1px);">
       </div>
       <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);text-align: center;">
            <h1><b>Valancias Secret</b> - clothing for women</h1>
            <p>
                Websiteelcome to official Valencia’s Secret page. We pride ourselves on being a business catering to the modern woman. “Classified for Women”. Delivery options are available in Bangladesh.
                <br/><br/>
                Our Product: Nightwear, Bra, Panty, Leggings, Long pant, Trouser, Tops, Tank top, 3 Pcs, Ladies T-shirt, Ladies Shirt, Ladies Half pant, Hizb, Hair, 3 Quarter, Bath towel, Cami, A-shirt, Gown, Gown cover, Bath Gown, Kamiz, Ladies Plazo, Ladies Napkins, Men’s Boxer underwear, Men’s T-shirt, Ladies Shocks, Kamiz, Sports Bra, Sweater, etc.
            </p>
            <br/>
            <RouterLink :to="{name:'admin.dashboard'}" class="btn btn-success">
                Super admin panel
            </RouterLink>
            &nbsp;&nbsp;
            <RouterLink :to="{name:'admin.dashboard'}" class="btn btn-success">
                Customer panel
            </RouterLink>
            &nbsp;&nbsp;
            <RouterLink :to="{name:'admin.dashboard'}" class="btn btn-success">
                Website
            </RouterLink>
       </div>
    </div>
  </main>
</template>
