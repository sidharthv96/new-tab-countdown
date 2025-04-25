<script lang="ts">
	import About from '$lib/components/About.svelte';
	import CountdownList from '$lib/components/CountdownList.svelte';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import { defaultCountdown } from '$lib/constants/DropdownOptions';
	import { storage } from '$lib/utils/Storage';
	import type { StoredCountdown } from '$lib/utils/types';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';

	const COUNTDOWN_INTERVAL_DURATION = 100;
	const MAX_NUM_COUNTDOWN = 5;
	const IS_INSTALLED = typeof window?.chrome?.storage !== 'undefined';

	let countdownList = $state<StoredCountdown[]>([]);
	let isInstalled = $state(IS_INSTALLED);
	let isInitialized = $state(false);

	$effect(() => {
		if (isInitialized && countdownList.length > 0) {
			storage.set('countdownList', countdownList);
			console.log('countdownList', countdownList);
		}
	});

	onMount(() => {
		storage.get('countdownList', [defaultCountdown], (items) => {
			if (Array.isArray(items) && items.length > 0) {
				countdownList = items;
			}
			isInitialized = true;
		});
	});
</script>

<ModeWatcher />

<div
	class="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden p-4 tracking-wider dark:text-gray-400"
>
	<DarkModeToggle />
	{#if !isInstalled}
		<About />
	{/if}
	<CountdownList
		bind:countdownList
		intervalDuration={COUNTDOWN_INTERVAL_DURATION}
		maxNumCountdown={MAX_NUM_COUNTDOWN}
		displayCountdownListControls
	/>
</div>
