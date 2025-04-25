<script lang="ts">
	let { isInstalled = false }: { isInstalled?: boolean } = $props();
</script>

<div class="absolute bottom-2 left-2 flex w-fit flex-col">
	<div class="">New Tab Countdown v2</div>
	<div class="text-[0.65em]">a web extension</div>
	<div class="flex gap-1.5 pt-1.25 text-[0.65em]">
		{#if !isInstalled}
			<a
				class="cursor-pointer no-underline hover:underline"
				href="https://chrome.google.com/webstore/detail/new-tab-countdown/pbeiaielhjhfdpnonbbincehnanaehon"
				target="_blank"
			>
				download
			</a>
			⋮
		{/if}
		<a
			class="cursor-pointer no-underline hover:underline"
			href="https://github.com/sidharthv96/new-tab-countdown"
			target="_blank"
		>
			github
		</a>
		⋮
		<a
			class="cursor-pointer no-underline hover:underline"
			href="https://sidharth.dev/"
			target="_blank"
		>
			about
		</a>
	</div>
</div>
