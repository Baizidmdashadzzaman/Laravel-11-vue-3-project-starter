<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>

    <div data-bs-spy="scroll" class="scrollspy-example">
      <!-- Hero: Start -->
      <section id="hero-animation">
        <div id="landingHero" class="landing-hero position-relative" style="padding-top: 2.2rem;">
          <div class="container">
            <div class="hero-text-box text-center">
                <h2 class="hero-sub-title h6">
                System developer information
              </h2>
              <h1 class="text-success hero-title display-6 fw-bold" style="font-size: 35px" >
                Baizid MD Ashadzzaman
                <br/>
              </h1>
              <h2 class="hero-sub-title h6 mb-4 pb-1">
                Software engineer / developer / programmer.
              </h2>
              <div class="landing-hero-btn d-inline-block position-relative">
                <span class="hero-btn-item position-absolute d-none d-md-flex text-heading">Checkout now
                  <img :src="$frontendurl+'/assets/img/front-pages/icons/Join-community-arrow.png'" alt="Join community arrow" class="scaleX-n1-rtl"></span>
                <a href="https://drive.google.com/file/d/1HuLXxOB6dL58AcupKZ9qhRr7739EXLML/view" target="_blank" class="btn btn-success btn-lg waves-effect waves-light">
                    Download my cv
                </a>
                &nbsp;&nbsp;
                <a href="https://baizidmdashadzzaman-next.vercel.app/" target="_blank" class="btn btn-success btn-lg waves-effect waves-light">
                    Visit my protfolio
                </a>
              </div>
            </div>
            <div id="heroDashboardAnimation" class="hero-animation-img">
              <a href="#" target="_blank">
                <div id="heroAnimationImg" class="position-relative hero-dashboard-img" >
                    <br/><br/>


                  <br/><br/><br/><br/>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="landing-hero-blank"></div>
      </section>
      <!-- Hero: End -->

      <!-- Useful features: Start -->
      <section id="landingFeatures" class="section-py landing-features">
        <div class="container">
          <div class="text-center mb-3 pb-1">
            <span class="badge bg-label-success">Welcome</span>
          </div>
          <h3 class="text-center mb-1">
            <span class="section-title">
                Engr Baizid MD Ashadzzaman
            </span>
          </h3>
          <p class="text-center mb-3 mb-md-5 pb-3">
            Hello! I'm Baizid MD Ashadzzaman, a passionate and versatile software engineer with a strong foundation in Computer Science and Engineering. With a deep love for coding and an insatiable curiosity, I've embarked on a journey that encompasses a wide spectrum of technologies and skills. My experience spans the realms of Laravel, React.js, Vue.js, Next.js, Django, image processing, and even extends to the creative domain of graphics design.
          </p>
          <div class="row gy-3">

            <iframe class="animation-img" style="border-radius: 10px" src="https://baizidmdashadzzaman-next.vercel.app/" height="700" width="100%" title="Baizid MD Ashadzzaman"></iframe>

          </div>

        </div>
      </section>
      <!-- Useful features: End -->



    </div>

</template>
