<script lang="ts">
	let { shouldShow, onDelete } = $props<{
		shouldShow: boolean;
		onDelete: () => void;
	}>();
</script>

{#if shouldShow}
	<button
		type="button"
		class="text-hover:text-dark relative bottom-0.75 cursor-pointer border-none bg-transparent p-0 pl-1.25 text-[0.65em]"
		onclick={onDelete}
		aria-label="Delete countdown"
	>
		[&times;]
	</button>
{/if}
