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
    <div class="about-intro">
    <h2>This OpenAI tool allows you to re-style any text you want</h2>
    <p>
      The converter uses a node.js server to deliver the request prompt to
      OpenAI servers, it can be easily modified to perform any task ChatGpt is
      capable of.
    </p>
    </div>
    <div class="about-info">
      <h4>To create it we used</h4>
      <ul>
        <li>Vue with composition API for the APP</li>
        <li>TypeScript for the ###</li>
        <li>Sass CSS for design</li>
        <li>Node.js for the backend</li>
        <li>Git to collaborate</li>
      </ul>
    </div>
    <div class="about-us">
    <div class="about-us img-container flex space-even">
      <img
  src="https://api.dicebear.com/5.x/big-ears/svg?seed=Avishai%20Dotan"
  alt="avatar" />
      <img
  src="https://api.dicebear.com/5.x/big-ears/svg?seed=Nir%20Roiter"
  alt="avatar" />
    </div>
    <div class="about-us txt-container">
    <h5>Created by Avishai Dotan & Nir Roiter</h5>
    </div>
    </div>
  </div>
</template>
