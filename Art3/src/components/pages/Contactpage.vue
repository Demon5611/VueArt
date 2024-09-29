<template>
  <div id="contacts">
    <div class="iphone-image">
      <img :src="iphoneForm" alt="imgPhone" class="imgPhone" />
      <div class="ava-btn">
        <img :src="avatarImage" class="avatarImage" alt="avatarImage" />
        <div class="name">
          <h5>NATA AVODES</h5>
          <h5 class="describe">художник дизайнер педагог</h5>
        </div>
        <div class="containerBtn">
          <a
            class="Btn"
            href="https://t.me/nataavodes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img class="pict" :src="telegramIcon" alt="Telegram icon" />
            <span class="span">Telegram</span>
          </a>
          <a
            class="Btn"
            href="https://vk.ru/artkuratorkorolev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img class="pict" :src="vkIcon" alt="VK icon" />
            <span class="span">VK</span>
          </a>
          <a
            class="Btn"
            href="mailto:nataavodes@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img class="pict" :src="mailIcon" alt="Email icon" />
            <span class="span">E-mail</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mailIcon from "../../../public/icons/mail.svg";
import telegramIcon from "../../../public/icons/telegram.svg";
import vkIcon from "../../../public/icons/vk.svg";
import avatarImage from "../../assets/avatarImage.jpg";
import iphoneForm from "../../assets/iphonForm.png";
</script>
