<template>
  <section id="blog" class="blog" v-bind="$attrs">
    <div class="hero">
      <img
        class="hero__img"
        :src="blogMainImg"
        alt="Пейзаж Королёва"
        loading="eager"
      />
      <div class="hero__overlay" aria-hidden="true"></div>
    </div>

    <div class="content">
      <header class="content__intro">
        <h1 class="title">Королёв — космическое сердце России</h1>
        <p class="lead">
          Моя семья живёт в этом прекрасном городе с первых дней его зарождения
          и потому очень близко знакома с его историей.
        </p>
      </header>

      <div class="divider" role="separator" aria-hidden="true"></div>

      <p class="text">
        Став региональным куратором от Ассоциации художников-пленэристов, у меня
        появилась уникальная возможность запечатлеть красоты родного города
        вместе с другими художниками и показать их не только в любимом городе,
        но и по всей России…
      </p>

      <div class="divider" role="separator" aria-hidden="true"></div>

      <h2 class="subtitle">
        Серия пленэров и выставка к юбилею Болшевской трудовой коммуны
      </h2>
      <p class="text">
        В 2024 году проведена серия пленэров и выставка, посвящённая юбилею
        Болшевской трудовой коммуны, расположенной в городском округе Королёв
        Московской области. На экспозиции представлены работы художников
        Ассоциации, выполненные на территории комплекса зданий коммуны (стиль
        конструктивизм) с мая по сентябрь 2024 года.
      </p>
    </div>

    <figure class="figure">
      <img
        class="figure__img"
        :src="stroyBuro"
        alt="Здание стройбюро, Королёв"
        loading="lazy"
      />
      <figcaption class="sr-only">
        Исторический объект Болшевской трудовой коммуны
      </figcaption>
    </figure>

    <p class="text">
      Художественное переосмысление исторических объектов Болшевской трудовой
      коммуны, в том числе изучение художниками архивных фотографий, отразилось
      в широком спектре жанров и техник выполненных работ.
    </p>

    <div class="grid">
      <div class="grid__item grid__item--main">
        <img
          class="grid__img"
          :src="blogGridLeftImg"
          alt="Работа слева"
          loading="lazy"
        />
      </div>
      <div class="grid__item">
        <img
          class="grid__img"
          :src="blogGridRightTopImg"
          alt="Работа справа сверху"
          loading="lazy"
        />
      </div>
      <div class="grid__item">
        <img
          class="grid__img"
          :src="blogGridRighDowntImg"
          alt="Работа справа снизу"
          loading="lazy"
        />
      </div>
    </div>

    <p class="text">
      Региональное отделение
      <a
        class="link"
        href="https://www.pleinair-russia.ru/pleinair_korolev"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ассоциации художников-пленэристов
      </a>
      тесно сотрудничает с Администрацией городского округа Королёв: организует
      выставки, проводит экскурсии, творческие встречи и, конечно, бесплатные
      пленэры, участие в которых может принять любой желающий.
    </p>

    <div class="social">
      <span class="social__label">Подписаться на Пленэр Королёв:</span>
      <a
        href="https://vk.com/pleinair_korolev"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Группа во ВКонтакте"
      >
        <img class="social__icon" :src="vkIcon" alt="" />
      </a>
      <a
        href="https://t.me/pleinair_korolev"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Канал в Telegram"
      >
        <img class="social__icon" :src="telegramIcon" alt="" />
      </a>
    </div>
  </section>
</template>

<script setup>
import blogMainImg from "@/assets/blog/blogMainImg.webp";
import blogGridLeftImg from "@/assets/blog/blogGridLeft.jpg";
import blogGridRightTopImg from "@/assets/blog/blogGridRightTop.jpg";
import blogGridRighDowntImg from "@/assets/blog/blogGridRightDown.jpg";
import stroyBuro from "@/assets/blog/стройбюро.jpg";
import telegramIcon from "@/assets/contactPage/telegram.svg";
import vkIcon from "@/assets/contactPage/vk.svg";
</script>

<style scoped>
/* Базовые утилиты */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* Контейнер */
.blog {
  display: grid;
  gap: 1.5rem;
  color: #6e6767;
  min-height: 100vh;
}

.hero {
  position: relative;
  width: 100%;
}
.title {
  font-weight: 400;
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  letter-spacing: 0.02em;
  margin: 0;
}
.text {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  line-height: 1.6;
  margin: 0;
}
.hero__img {
  width: 100%;
  height: auto;
  display: block;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.content {
  width: min(70ch, 90%);
  margin-inline: auto;
  display: grid;
  gap: 1rem;
  text-align: left;
}

.lead {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  letter-spacing: 0.02em;
  margin: 0.5rem 0 0;
}

.subtitle {
  font-weight: 400;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  margin: 0;
}

.divider {
  width: min(30%, 240px);
  height: 1px;
  background-color: #000;
  margin: 1rem auto;
}

.figure {
  display: grid;
  justify-items: center;
  margin: 0.5rem 0;
}
.figure__img {
  width: min(70%, 1000px);
  height: auto;
  display: block;
}

/* Галерея */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(180px, 1fr) minmax(180px, 1fr);
  gap: 10px;
  width: min(800px, 90%);
  margin: 2rem auto;
}

.grid__item {
  position: relative;
  overflow: hidden;
}
.grid__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.grid__item--main {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

/* Соцсети */
.social {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 0 5%;
  width: 100%;
  font-size: 0.9rem;
}

.social__label {
  margin-right: 0.25rem;
}
.social__icon {
  width: 24px;
  height: 24px;
  display: block;
}

@media (max-width: 1024px) {
  .content {
    width: 85%;
  }
  .figure__img {
    width: 80%;
  }
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    width: 92%;
  }
  .grid__item--main {
    grid-column: auto;
    grid-row: auto;
  }
}

@media (max-width: 380px) {
  .social__icon {
    width: 18px;
    height: 18px;
  }
}
</style>
