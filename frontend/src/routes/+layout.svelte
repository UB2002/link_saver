<script>
    import '$lib/api';          // ensure env is loaded
    import '../app.css';        // global Tailwind styles
    import { logout } from '$lib/api';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';


    onMount(() => {
      // Only redirect if not already on /login or /signup
        goto('/login');
      
    });

    async function doLogout() {
      await logout();
      await goto('/login');
    }
  </script>
  
  <nav class="bg-white shadow p-4 flex justify-between">
    <div class="font-bold text-xl">Link Saver</div>

      <button on:click={doLogout} class="text-red-500">Logout</button>
  </nav>
  
  <slot />
  