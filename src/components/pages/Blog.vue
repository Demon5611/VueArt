<template>
  <div id="blog" class="containerBlogPage">
    <div class="image-container">
      <img class="blogMainImg" :src="blogMainImg" alt="img" />
      <!-- Наложение тумана -->
      <div class="fog-overlay"></div>
      <div class="text-overlay">
        <h1 class="h_1_blog">Региональный куратор</h1>
        <p>Ассоциация художников-пленэристов в городском округе Королев</p>
      </div>
    </div>
    <div class="textBox1">
      <h5 class="blog_h_5">
        Королёв-космическое сердце России <br />
        Моя семья живет в этом прекрасном городе с первых дней его зарождения и
        потому очень близко знакома с его историей
      </h5>
      <div class="line"></div>
      <h3 class="blog_h_2">
        Став региональным куратором от Ассоциации художников-пленэристов, у меня
        появилась уникальная возможность запечатлеть красоты родного города
        вместе с другими художниками и показать их не только в любимом городе,
        <br />
        но и по всей России...
      </h3>
      <div class="line"></div>
      <h3 class="blog_h_3">
        В 2024 году проведена серия пленэров и выставка посвящена юбилею
        Болшевской трудовой коммуны, расположенной в городском округе Королёв
        Московской области. На экспозиции представлены работы художников
        Ассоциации, которые были выполнены на территории комплекса зданий
        коммуны, спроектированных в стиле конструктивизм, с мая по сентябрь 2024
        года
      </h3>
    </div>
    <img class="stroyBuro" :src="stroyBuro" alt="img" />
    <h3 class="blog_h_3">
      Художественное переосмысление исторических объектов Болшевской трудовой
      коммуны, в том числе изучение художниками архивных фотографий, отразилось
      в широком спектре жанров и техник выполненных художниками работ
    </h3>

    <div class="grid-container-blog">
      <div class="grid-item item1">
        <img class="blogGridLeftImg" :src="blogGridLeftImg" alt="img" />
      </div>
      <div class="grid-item item2">
        <img class="blogGridRightTopImg" :src="blogGridRightTopImg" alt="img" />
      </div>
      <div class="grid-item item3">
        <img
          class="blogGridRighDowntImg"
          :src="blogGridRighDowntImg"
          alt="img"
        />
      </div>
    </div>
    <h3 class="blog_h_3">
      Региональное отделение
      <a
        class="link-no-underline"
        href="https://www.pleinair-russia.ru/pleinair_korolev"
      >
        <span class="highlighted-text">Ассоциация художников-пленэристов</span>
      </a>
      тесно сотрудничает с Администрацией городского округа Королёв: организует
      выставки, проводит экскурсии, творческие встречи и конечно бесплатные
      пленэры, <br />
      участие в которых может принять любой желающий
    </h3>
  </div>
  <div class="line"></div>

  <div class="iconsContact">
    <span class="subscribe">Подписаться на Пленэр Королёв:</span>
    <a
      href="https://vk.com/pleinair_korolev"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img class="pict" :src="vkIcon" alt="VK icon" />
    </a>
    <a
      href="https://t.me/pleinair_korolev"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img class="pict" :src="telegramIcon" alt="Telegram icon" />
    </a>
  </div>
</template>

<script setup>
import blogMainImg from "../../assets/blogMainImg.jpg";
import blogGridLeftImg from "../../assets/blogGridLeft.jpg";
import blogGridRightTopImg from "../../assets/blogGridRightTop.jpg";
import blogGridRighDowntImg from "../../assets/blogGridRightDown.jpg";
import stroyBuro from "../../assets/стройбюро.jpg";
import telegramIcon from "../../assets/telegram.svg";
import vkIcon from "../../assets/vk.svg";
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#blog {
  height: 100%;
  margin: 0;
}

.containerBlogPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(161, 150, 150);
  min-height: 100vh;
}

.image-container {
  position: relative;
  width: 100%;
}
.textBox1{
  width: 70%;
}
.blogMainImg {
  width: 100%;
  display: block;
}
.stroyBuro {
  width: 100%;
}

.line {
  width: 30%;
  height: 1px;
  background-color: black;
  margin: 0 auto;
  margin-top: 2%;
  margin-bottom: 2%;
}

.fog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
}

.h_1_blog {
  font-weight: 600;
  font-size: 2.5rem;
  margin: 0;
}

p {
  margin: 0;
  font-size: 1rem;
}

.blog_h_5,
.blog_h_3 {
  font-size: 1.2rem;
  margin: 0 5%;
  padding: 5% 5% 2% 2%;
}

.link-no-underline {
  text-decoration: none;
  color: inherit;
}

.highlighted-text {
  color: rgb(111, 111, 236);
  text-decoration: underline;
}

.grid-container-blog {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  height: 400px;
}

.grid-item {
  position: relative;
  overflow: hidden;
}

.blogGridLeftImg,
.blogGridRightTopImg,
.blogGridRighDowntImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item1 {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.item2 {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.item3 {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.iconsContact {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 40%;
  margin-bottom: 5%;
  
}

.subscribe {
width: 100%;
}
img {
  max-width: fit-content;
}
.pict {
  width: 25px;
  margin-right: 2%;
  padding-top: 15%;
}

/* Медиазапросы */
@media (max-width: 1300px) {
  .containerBlogPage {
    padding: 0 4%;
  }

  .h_1_blog {
    font-size: 2.3rem;
  }

  .blog_h_5,
  .blog_h_3 {
    font-size: 1.1rem;
  }

  .grid-container-blog {
    max-width: 90%;
  }
}

@media (max-width: 998px) {
  .containerBlogPage {
    padding: 0 3%;
  }

  .h_1_blog {
    font-size: 2rem;
  }

  .blog_h_5,
  .blog_h_3 {
    font-size: 1rem;
  }

  .grid-container-blog {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    height: auto;
  }

  .item1,
  .item2,
  .item3 {
    grid-column: 1 / 2;
  }
}

@media (max-width: 698px) {
  .h_1_blog {
    font-size: 1.8rem;
  }

  .blog_h_5,
  .blog_h_3 {
    font-size: 0.95rem;
  }

  .iconsContact {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 5%;
    padding-right: 5%;
  }
}

@media (max-width: 385px) {
  .h_1_blog {
    font-size: 1.5rem;
  }

  .blog_h_5,
  .blog_h_3 {
    font-size: 0.9rem;
  }

  .iconsContact {
    padding: 0 2%;
  }

  .pict {
    width: 20px;
    padding-top: 10%;
  }
}
</style>
