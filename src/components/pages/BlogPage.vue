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

