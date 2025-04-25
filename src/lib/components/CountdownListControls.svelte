<script lang="ts">
	interface Props {
		onAddCountdown: () => void;
		toggleEnableDeleteCountdown: () => void;
		disableAddCountdown: boolean;
	}

	let { onAddCountdown, toggleEnableDeleteCountdown, disableAddCountdown }: Props = $props();
</script>

<div class="absolute top-2 left-2 flex flex-col items-start text-sm">
	<div class="flex items-center">
		<button
			class={[
				'group opacity-50 hover:opacity-100',
				disableAddCountdown ? 'cursor-not-allowed' : 'cursor-pointer'
			]}
			onclick={onAddCountdown}
			disabled={disableAddCountdown}
		>
			[+]
			{#if disableAddCountdown}
				<span class="hidden group-hover:inline"> maximum of 5 countdowns </span>
			{/if}
		</button>
	</div>
	<button class="cursor-pointer opacity-50 hover:opacity-100" onclick={toggleEnableDeleteCountdown}>
		[&minus;]
	</button>
</div>
