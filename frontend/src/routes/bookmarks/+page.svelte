<script>
    import { onMount } from 'svelte';
    import { getBookmarks, addBookmark, deleteBookmark } from '$lib/api';
  
    let bookmarks = [];
    let url = '';
  
    // Load bookmarks on page mount
    onMount(async () => {
      try {
        bookmarks = await getBookmarks();
        //console.log('Loaded bookmarks:', bookmarks); // Debug log
      } catch (err) {
        //console.error('Could not load bookmarks:', err);
      }
    });
  
    // Save a new bookmark, with validation & prefixing
    async function save() {
      // 1. Prevent empty URL
      if (!url.trim()) {
        return alert('Please paste a URL before saving.');
      }
  
      // 2. Auto‑prefix https:// if missing
      let fullUrl = url.trim();
      if (!/^https?:\/\//i.test(fullUrl)) {
        fullUrl = 'https://' + fullUrl;
      }
  
      // 3. Call the API and update list
      try {
        const bm = await addBookmark(fullUrl);
        bookmarks = [bm, ...bookmarks];
        url = '';
      } catch (err) {
        //console.error('Save failed:', err);
        alert('Failed to save bookmark: ' + err.message);
      }
    }
  
    // Delete a bookmark with enhanced debugging
    const remove = async (id) => {
      //console.log('Attempting to delete bookmark with ID:', id); // Debug log
      
      try {
        // Call the delete API
        const response = await deleteBookmark(id);
        //console.log('Delete response:', response); // Debug log
        
        // Update the UI - remove from bookmarks array
        const originalLength = bookmarks.length;
        bookmarks = bookmarks.filter((b) => b._id !== id);
        //console.log(`Filtered bookmarks: ${originalLength} -> ${bookmarks.length}`); // Debug log
        
        // Show success message
        //console.log('Bookmark deleted successfully');
        
      } catch (err) {
        //console.error('Delete failed:', err);
        //console.error('Error details:', err.message);
        alert('Failed to delete bookmark: ' + err.message);
      }
    };
  </script>
  
  <div class="max-w-2xl mx-auto mt-10">
    <div class="flex mb-4">
      <input
        bind:value={url}
        placeholder="Paste URL"
        class="border p-2 flex-1"
      />
      <button
        on:click={save}
        class="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded"
      >
        Save
      </button>
    </div>
  
    {#if bookmarks.length === 0}
      <p class="text-center text-gray-500">No bookmarks yet. Paste a URL above to get started!</p>
    {:else}
      <div class="grid gap-4">
        {#each bookmarks as b (b._id)}
          <div class="bg-white p-4 rounded shadow flex items-start">
            <img src={b.favicon} alt="favicon" class="w-6 h-6 mr-3 mt-1" />
            <div class="flex-1">
              <a href={b.url} target="_blank" class="font-bold hover:underline">{b.title}</a>
              <p class="text-sm mt-1">{b.summary}</p>
              <p class="text-xs text-gray-400 mt-1">ID: {b._id}</p> <!-- Debug info -->
            </div>
            <button
              on:click={() => remove(b._id)}
              class="ml-4 text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>