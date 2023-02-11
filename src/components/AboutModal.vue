<template>
  <div>
    <button @click="$emit('toggleAbout')" class="close-about-modal">
      <svg
        class="close-about-modal svg"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style="
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
    <h2>This OpenAI tool was created by A.D and N.R</h2>
  </div>
</template>
