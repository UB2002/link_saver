<script>
    import '$lib/api';          // ensure env is loaded
    import '../app.css';        // global Tailwind styles
    import { logout } from '$lib/api';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';


    onMount(() => {
      // Only redirect if not already on /login or /signup
      const currentPath = get(page).url.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup') {
        goto('/login');
      }
    });

    async function doLogout() {
      await logout();
      await goto('/login');
    }
  </script>
  
  <nav class="bg-white shadow p-4 flex justify-between">
    <div class="font-bold text-xl">Link Saver</div>

    <button
      on:click={doLogout}
      class="px-4 py-2 bg-red-500 text-white rounded shadow transition hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transform active:scale-95"
    >
      Logout
    </button>
  </nav>
  
  <slot />
  