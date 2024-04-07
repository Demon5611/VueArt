<template>
    <div id="contacts">
    
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
                        <img  class="pict" src="../../../public/icons/telegram.svg"/>
                          <span class="span">Telegram</span>
                         </a>              
                        <a class="Btn" href="https://vk.com/artmehanikastudio" >
                          <img  class="pict" src="../../../public/icons/vk.svg">
                          <span class="span">VK</span>
                        </a>              
                        <a class="Btn" href="mailto:nataavodes@gmail.com" target="_blank">
                        <img  class="pict" src="../../../public/icons/mail.svg"/>
                          <span class="span">E-mail</span></a>
                      </div>
                  </div>          
              </div>
    
    </div>
  </template>
  
  <script setup>

import avatarImage from '../../assets/avatarImage.jpg';
import iphoneForm from '../../assets/iphonForm.png';

  </script> 

  