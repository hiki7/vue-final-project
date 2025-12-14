<template>
  <section class="card p">
    <h1 class="h">About this app</h1>
    <p class="sub">
      The focus is the required Vue features: directives, props/emit, Composition API, router (dynamic + nested + guards + 404),
      Pinia store (state/getters/actions), form validation, API integration, scoped styles, transitions, and Vitest tests.
    </p>

    <div class="list">
      <div class="item">
        <div class="k">Router</div>
        <div class="v">Dynamic route: <code>/tasks/:id</code>, nested settings routes, lazy loading, guard.</div>
      </div>
      <div class="item">
        <div class="k">Pinia</div>
        <div class="v">Tasks module with filtered getters and actions. Session module for a simple guard.</div>
      </div>
      <div class="item">
        <div class="k">API</div>
        <div class="v">Fetches users from JSONPlaceholder with loading/error UI.</div>
      </div>
    </div>

    <RouterLink class="btn" to="/tasks">Open Tasks</RouterLink>
  </section>
</template>

<script setup>
</script>

<style scoped>
.p{ padding: 18px; }
.h{ margin:0; font-size: 22px; }
.sub{ margin: 10px 0 0; color: var(--muted); line-height: 1.55; }
.list{ margin: 14px 0; display:grid; gap: 10px; }
.item{
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 12px;
  background: color-mix(in srgb, var(--panel), transparent 0%);
}
.k{ color: var(--muted); font-size: 12px; }
.v{ margin-top: 6px; font-weight: 600; }
code{
  padding: 2px 6px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--muted);
}
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: transparent;
}
.btn:hover{ border-color: color-mix(in srgb, var(--accent), transparent 55%); }
</style>
