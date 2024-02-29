<template>
    <div id="contacts">
      <div class="avatarContainer">
        <div class="iphone-image">
    
            <img :src="iphoneForm" alt="imgPhone" class="imgPhone" />  
            <div class="ava-btn">
            <img :src="avatarImage" class="avatarImage" alt="avatarImage" />          
            <div class="name">
            <h5>NATA AVODES</h5>
            <h5 class="describe">художник   дизайнер   педагог</h5>
          </div>
          
          <div class="containerBtn">
            <a class="Btn" href="https://t.me/nataavodes" >
            <img  class="pict" src="../icons/telegram.svg"/>
              <span class="span">Telegram</span>
            </a>
  
            <a class="Btn" href="https://vk.com/artmehanikastudio" >
              <img  class="pict" src="../icons/vk.svg">
              <span class="span">VK</span>
            </a>
  
            <a
              class="Btn"
              href="mailto:nataavodes@gmail.com"          
              target="_blank"
            >
            <img  class="pict" src="../icons//mail.svg"/>
              <span class="span">E-mail</span>
            </a>
          </div>
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
  