<template>
  <div>
    <button @click="$emit('toggleAbout')" class="close-about-modal">
      <svg class="close-about-modal svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        role="presentation" focusable="false" style="
                    display: block;
                    fill: none;
                    height: 16px;
                    width: 16px;
                    stroke: currentcolor;
                    stroke-width: 3;
                    overflow: visible;
                  ">
        <path d="m6 6 20 20"></path>
        <path d="m26 6-20 20"></path>
      </svg>
    </button>
    <div class="about-intro">
      <h2>AITexter Tool: Effortlessly Refine Your Text with Customized Styles</h2>
      <p style="text-align: center;">
        AITexter Tool communicates with OpenAI servers to provide re-styled text based on user requests. It can be tailored to suit various text styling needs using ChatGPT's advanced capabilities.
      </p>
    </div>
    <div class="about-us">
      <div class="about-us img-container flex space-even">
        <a href="https://github.com/AvishaiDotan">
          
          <img  src="../../src/assets/avishai.jfif" alt="avatar" />
        </a>
        <a href="https://github.com/Nirosss">
          
          <img  src="../../src/assets/nir.jpg" alt="avatar" />
        </a>
        
      </div>
      <div class="about-us txt-container">
        <h5>Created by Nir Roiter & Avishai Dotan</h5>
      </div>
  </div>
</div></template>
