<template>
    <div id="contacts">
      <div class="avatarContainer">
        <div class="iphone-image">
          <img :src="iphoneForm" alt="imgPhone" class="imgPhone" />  
          <img :src="avatarImage" class="avatarImage" alt="avatarImage" />
          
          <div class="name">
          <h5>NATA AVODES</h5>
          <h5>художник   дизайнер   педагог</h5>
          </div>
          
          <div id="containerBtn">
            <Button class="Btn" href="https://t.me/nataavodes" >
            <img  class="pict" src="../icons/telegram.svg" style= "color:white"/>
              <span class="span">Telegram</span>
            </Button>
  
            <Button class="Btn" href="https://vk.com/artmehanikastudio" >
              <FaVk class="pictButn" />
              <span class="span">VK</span>
            </Button>
  
            <Button
              class="Btn"
              href="mailto:nataliya.mur@mail.ru"          
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

import avatarImage from '../../../public/avatarImage.jpg';
import iphoneForm from '../../../public/iphonForm.png';

  </script> 
    <style>
  </style>
  