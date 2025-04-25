<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		value: string;
		shouldDisplay: boolean;
		displayOption: string;
		dropdownOptions: {
			defaultValue: string;
			options: readonly string[];
		};
		onOpen: () => void;
		onClose: () => void;
		children?: Snippet;
	}

	let {
		shouldDisplay,
		displayOption,
		dropdownOptions,
		value = $bindable(),
		onOpen,
		onClose,
		children
	}: Props = $props();
</script>

<div class="relative inline-block">
	<button
		type="button"
		class="cursor-pointer border-b border-dotted text-gray-500"
		onclick={() => {
			shouldDisplay ? onClose() : onOpen();
		}}
		aria-haspopup="true"
		aria-expanded={shouldDisplay}
	>
		{displayOption}
	</button>
	{#if shouldDisplay}
		<div class="absolute z-10 flex w-fit flex-col" role="menu">
			{#each dropdownOptions.options as option (option)}
				<button
					class="cursor-pointer text-left whitespace-nowrap text-gray-500 hover:text-black dark:hover:text-gray-400"
					onclick={() => {
						value = option;
						onClose();
					}}
					role="menuitem"
				>
					{option}
				</button>
			{/each}
			{@render children?.()}
		</div>
	{/if}
</div>
