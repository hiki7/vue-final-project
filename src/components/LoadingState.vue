<template>
    <div class="card" style="padding: 14px;">
      <div class="shimmer" style="height: 14px; width: 140px; border-radius: 8px;"></div>
      <div style="height: 10px;"></div>
      <div class="shimmer" style="height: 44px; border-radius: 14px;"></div>
      <div style="height: 10px;"></div>
      <div class="shimmer" style="height: 44px; border-radius: 14px;"></div>
    </div>
  </template>
  
  <style scoped>
  .shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,.05), rgba(255,255,255,.14), rgba(255,255,255,.05));
    background-size: 200% 100%;
    animation: shimmer 1.1s linear infinite;
    border: 1px solid var(--line);
  }
  @keyframes shimmer {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }
  </style>
  