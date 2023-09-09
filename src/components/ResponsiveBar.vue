<template>
    <div :class="['menu-bar', { active: isActive }]">
      <div class="hamburger" @click="toggleMenu">
        <div></div>
        <div></div>
        <div></div>
        Click for more Lists
      </div>
      <a href="#" class="menu-item">Top VCs</a>
      <a href="#" class="menu-item">Top Tech CEOs</a>
      <a href="#" class="menu-item">Create your Own List</a>
      <a href="#" class="menu-item">Contact</a>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isActive: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isActive = !this.isActive;
      },
    },
  };
  </script>
  <style>
  .menu-bar {
    display: flex;
    justify-content: space-between;
    background-color: #333;
    padding: 14px;
    overflow: hidden;
  }
  .menu-item {
    margin: 0 15px;
    color: white;
    text-decoration: none;
  }
  .hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
  }
  .hamburger div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
  }
  @media (max-width: 600px) {
    .menu-bar {
      flex-direction: column;
      align-items: flex-start;
    }
    .menu-item {
      display: none;
      margin: 10px 0; /* Add vertical margin between items */
    }
    .hamburger {
      display: flex;
      margin-bottom: 10px; /* Add some space between the hamburger icon and the menu items */
    }
    .menu-bar.active .menu-item {
      display: block;
    }
  }
  </style>
  