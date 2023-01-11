<template>
  <div class="flex flex-col min-h-screen">
    <SeoKit />
    <OgImageScreenshot />
    <header class="h-20 bg-blue-400 text-white flex items-center justify-center px-4">
      <nav class="flex items-center justify-between container">
        <NuxtLink to="/">Nuxt Site</NuxtLink>
        <ul class="flex items-center justify-between gap-11">
          <li>
            <WWKLink class="" to="/">Home</WWKLink>
          </li>
          <li>
            <WWKLink to="/about/">About</WWKLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="max-w-5xl mx-auto my-1">
      <slot />
    </main>
    <footer class="flex justify-between mt-auto px-4 bg-gray-400">
      <p>Nuxt site &copy;</p>
      <p>All rigths reserved.</p>
    </footer>
  </div>
</template>
