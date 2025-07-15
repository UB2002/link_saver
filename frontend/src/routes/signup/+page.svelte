<script>
    import { signup } from '$lib/api';
    import { goto } from '$app/navigation';
  
    let email = '', password = '';
  
    async function submit() {
      await signup({ email, password });
      await goto('/login');
    }
  </script>
  
  <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
    <h2 class="text-2xl mb-4">Sign Up</h2>
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
    <button on:click={submit} class="w-full bg-blue-500 text-white p-2 rounded">
      Sign Up
    </button>
  </div>
  