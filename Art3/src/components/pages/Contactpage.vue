<template>
    <div id="contacts">
      <div class="avatarContainer">
        <div class="iphone-image">
          <img :src="iphoneForm" alt="imgPhone" class="imgPhone" style="height: 90ch" />
  
          <img  alt="avatarImage" :src="avatarImage"  name="NATA AVODES"  title="художник   дизайнер   педагог"/>

          <div id="containerBtn"
            class="d-flex flex-column justify-content-center flex-wrap align-items-center"
            style="height: 50vh; margin-top: 22ch; gap: 1ch"
          >
            <Button class="Btn" :style="styleBtn" href="https://t.me/nataavodes" variant="warning">
              <FaTelegramPlane class="pictButn" />
              <span class="span">Telegram</span>
            </Button>
  
            <Button class="Btn" :style="styleBtn" href="https://vk.com/artmehanikastudio" variant="warning">
              <FaVk class="pictButn" />
              <span class="span">VK</span>
            </Button>
  
            <Button
              class="Btn"
              :style="styleBtn"
              href="mailto:nataliya.mur@mail.ru"
              variant="warning"
              target="_blank"
            >
              <FaEnvelope class="pictButn" />
              <span class="span">E-mail</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
// import { FaEnvelope, FaTelegramPlane, FaVk } from 'vue-icons/fa';
import avatarImage from '../../../public/avatarImage.jpg';
import iphoneForm from '../../../public/iphonForm.png';

  </script> 
    <style>
  </style>
  