<script>
    import { login } from '$lib/api';
    import { goto } from '$app/navigation';
  
    let email = '', password = '';
  
    async function submit() {
      await login({ email, password });
      await goto('/bookmarks');
    }
  </script>
  
  <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
    <h2 class="text-2xl mb-4">Log In</h2>
    <input
      bind:value={email}
      type="email"
      placeholder="Email"
      class="border p-2 w-full mb-2"
    />
    <input
      bind:value={password}
      type="password"
      placeholder="Password"
      class="border p-2 w-full mb-4"
    />
    <button
    on:click={submit}
    class="w-full bg-green-500 text-white p-2 rounded shadow transition
           hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
  >
    Log In
  </button>
    
  </div>
  <div class="text-center mt-4">
    <a href="/signup" class="text-blue-600 hover:underline">Don't have an account? Sign up</a>
  </div>
  