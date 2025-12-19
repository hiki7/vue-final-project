<template>
    <PageHeader title="Login" subtitle="Access Settings (route guard enabled)." />
  
    <div style="height: 14px;"></div>
  
    <div class="card" style="padding: 14px; max-width: 520px;">
      <form @submit.prevent="submit" class="grid">
        <div>
          <label style="font-size:13px; color: var(--muted);">Email</label>
          <input class="input" v-model="form.email" placeholder="name@example.com" />
          <div v-if="errors.email" style="color: var(--bad); margin-top: 6px; font-size: 13px;">
            {{ errors.email }}
          </div>
        </div>
  
        <div>
          <label style="font-size:13px; color: var(--muted);">Password</label>
          <input class="input" type="password" v-model="form.password" placeholder="at least 6 characters" />
          <div v-if="errors.password" style="color: var(--bad); margin-top: 6px; font-size: 13px;">
            {{ errors.password }}
          </div>
        </div>
  
        <div style="display:flex; gap:10px; justify-content:flex-end;">
          <RouterLink class="btn" to="/">Cancel</RouterLink>
          <button class="btn primary" type="submit">Login</button>
        </div>
  
        <div v-if="errors.form" style="color: var(--bad); font-size: 13px;">
          {{ errors.form }}
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useSessionStore } from "../stores/session";
  import PageHeader from "../components/PageHeader.vue";
  
  const route = useRoute();
  const router = useRouter();
  const session = useSessionStore();
  
  const form = reactive({
    email: "",
    password: ""
  });
  
  const errors = reactive({
    email: "",
    password: "",
    form: ""
  });
  
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  
  const submit = () => {
    errors.email = "";
    errors.password = "";
    errors.form = "";
  
    const email = String(form.email || "").trim();
    const password = String(form.password || "");
  
    if (!email) errors.email = "Email is required.";
    else if (!isEmail(email)) errors.email = "Enter a valid email.";
  
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  
    if (errors.email || errors.password) return;
  
    session.login(email);
  
    const redirect = String(route.query.redirect || "/settings");
    router.push(redirect);
  };
  </script>
  