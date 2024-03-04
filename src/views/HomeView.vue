<template>
  <div>
    <div class="container">
      <!-- Banner -->
      <swiper
        :spaceBetween="30"
        :centeredSlides="true"
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        @autoplayTimeLeft="onAutoplayTimeLeft"
        class="mySwiper mb-3"
      >
        <swiper-slide>
          <img
            src="../assets/banner/vn-50009109-caf492df4c6c650efad2e50e103067ef_xxhdpi.jpg"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="../assets/banner/vn-50009109-410a6f80d8253f7c0a1a5efa4c507a73_xxhdpi.jpg"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="../assets/banner/vn-50009109-77f88d063dd1f881849e303e518b3c25_xxhdpi.jpg"
            alt=""
          />
        </swiper-slide>
      </swiper>

      <!-- Danh mục -->
      <div class="shadow">
        <h3 class="p-3">Danh mục</h3>
        <swiper
          :slidesPerView="1"
          :spaceBetween="0"
          :navigation="true"
          :pagination="{
            clickable: true,
          }"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
            },
            '768': {
              slidesPerView: 3,
            },
            '1024': {
              slidesPerView: 4,
            },
          }"
          :modules="modules"
          class="mySwiper p-3"
        >
          <swiper-slide
            class="d-flex flex-wrap"
            v-for="page in Math.ceil(totalElementsCategory / 4)"
            :key="page"
          >
            <div
              v-for="number in 4"
              :key="number"
              class="col-6 border"
              style="height: 203px; font-size: 16px"
            >
              <div v-if="categorys[(page - 1) * 4 + number - 1]">
                <router-link
                  :to="`/shop/${categorys[(page - 1) * 4 + number - 1].id}`"
                  style="text-decoration: none"
                >
                  <img
                    :src="
                      baseUrl +
                      '/file/category/' +
                      categorys[(page - 1) * 4 + number - 1].imgUrl
                    "
                    alt=""
                    class=""
                  />
                  {{ categorys[(page - 1) * 4 + number - 1].categoryName }}
                </router-link>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      categorys: [],
      totalElementsCategory: 0,
    };
  },

  props: ["baseUrl"],

  methods: {
    async getListCategory() {
      try {
        const response = await axios.get(
          this.baseUrl + "/product/category?parent=1&size=100&page=0",
          {
            headers: {
              "ngrok-skip-browser-warning": "ngrok",
            },
          }
        );
        this.totalElementsCategory = response.data.totalElements;
        return response.data.content;
      } catch (error) {
        console.error(error);
      }
    },

    async loadImageWithHeader() {
      setTimeout(function () {
        const allImages = document.querySelectorAll("img");
        allImages.forEach((img) => {
          const url = img.src;
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.setRequestHeader("ngrok-skip-browser-warning", "ngrok");

          xhr.responseType = "blob";

          xhr.onload = () => {
            if (xhr.status === 200) {
              const blob = xhr.response;
              const objectURL = URL.createObjectURL(blob);
              img.src = objectURL;
            }
          };

          xhr.send();
        });
      }, 1000);
    },
  },

  async created() {
    this.categorys = await this.getListCategory();
  },

  async mounted() {
    this.loadImageWithHeader();
  },

  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 739px) {
}
</style>
