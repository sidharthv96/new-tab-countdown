<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import CountdownListControls from '$lib/components/CountdownListControls.svelte';
	import { defaultCountdown } from '$lib/constants/DropdownOptions';
	import type { StoredCountdown } from '$lib/utils/types';
	import { onMount } from 'svelte';

	interface Props {
		countdownList: StoredCountdown[];
		intervalDuration: number;
		maxNumCountdown: number;
		displayCountdownListControls: boolean;
	}

	let {
		countdownList = $bindable(),
		intervalDuration,
		maxNumCountdown,
		displayCountdownListControls = false
	}: Props = $props();

	let nextCountdownID = $derived(
		countdownList.length
			? Math.max(...countdownList.map((countdown: StoredCountdown) => countdown.id)) + 1
			: 1
	);

	let now = $state(new Date());
	let countdownBeingModified: number | undefined = $state();
	let shouldHideDropdowns = $state(false);
	let enableDeleteCountdown = $state(false);

	onMount(() => {
		const intervalID = setInterval(() => {
			now = new Date();
		}, intervalDuration);

		return () => {
			clearInterval(intervalID);
		};
	});

	function onCountdownDropdownChange(countdownId: number, isBeingModified: boolean) {
		countdownBeingModified = isBeingModified ? countdownId : undefined;
		shouldHideDropdowns = !isBeingModified;
		enableDeleteCountdown = false;
	}

	function onAddCountdown() {
		if (countdownList.length >= maxNumCountdown) {
			alert('You have reached the maximum number of countdowns');
		}
		countdownList = [
			...countdownList,
			{
				...defaultCountdown,
				id: nextCountdownID
			}
		];
	}

	function toggleEnableDeleteCountdown() {
		countdownBeingModified = undefined;
		shouldHideDropdowns = true;
		enableDeleteCountdown = !enableDeleteCountdown;
	}

	function onDeleteCountdown(countdownID: number) {
		countdownList = countdownList.filter(({ id }) => id !== countdownID);
	}
</script>

{#if displayCountdownListControls}
	<CountdownListControls
		{onAddCountdown}
		{toggleEnableDeleteCountdown}
		disableAddCountdown={countdownList.length >= maxNumCountdown}
	/>
{/if}

<div class="flex w-full flex-col items-center justify-center gap-4 text-2xl">
	{#each countdownList as countdown (countdown.id)}
		<Countdown
			id={countdown.id}
			shouldBlur={countdownBeingModified !== undefined && countdown.id !== countdownBeingModified}
			{shouldHideDropdowns}
			{now}
			{enableDeleteCountdown}
			deleteCountdown={() => onDeleteCountdown(countdown.id)}
			{onCountdownDropdownChange}
			bind:timeOption={countdown.timeOption}
			bind:dateOption={countdown.dateOption}
		/>
	{:else}
		<div>
			ಠ_ಠ You've deleted all the countdowns!
			<button type="button" class="cursor-pointer border-b border-dotted" onclick={onAddCountdown}>
				Add one
			</button>?
		</div>
	{/each}
</div>
