<script lang="ts">
	import Moon from '$lib/icons/moon.svelte';
	import Sun from '$lib/icons/sun.svelte';
	import { mode, toggleMode } from 'mode-watcher';
</script>

<button
	type="button"
	class="absolute top-2 right-2 size-6 cursor-pointer opacity-50 hover:opacity-100"
	onclick={toggleMode}
	aria-label="Toggle dark mode"
>
	{#if mode.current === 'dark'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>
