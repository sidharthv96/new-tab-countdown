<script lang="ts">
	import CustomDateInputHelper from '$lib/utils/CustomDateInputHelper';
	import DateCalculator from '$lib/utils/DateCalculator';

	let { onSubmit } = $props<{
		onSubmit: (input: string) => void;
	}>();

	let input = $state('');
	let isValidDate = $state(true);
	let placeholder = $state('a custom date');
	let helperMessage = $state('');
	let isOnFocus = $state(false);

	function handleFocus(): void {
		// TODO: Use locale based date format
		placeholder = 'description + mm/dd/yyyy';
		helperMessage = 'press "enter" to submit';
		isOnFocus = true;
	}

	function handleBlur(): void {
		placeholder = 'custom date';
		helperMessage = '';
		isOnFocus = false;
	}

	function handleInput(event: Event): void {
		input = (event.target as HTMLInputElement).value;
	}

	function validateDate(input: string): boolean {
		const customDate = CustomDateInputHelper.getCustomDate(input);
		if (!customDate) {
			helperMessage = `invalid date (example: 'vacation ${DateCalculator.getExampleDateString()}')`;
			return false;
		}

		const endDate = new Date(customDate.endDate);
		const now = new Date();
		const timeDiff = endDate.getTime() - now.getTime();

		if (timeDiff < 0) {
			helperMessage = `'${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}' has already passed`;
			return false;
		}

		if (timeDiff > Number.MAX_SAFE_INTEGER) {
			helperMessage = `'${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}' is too far into the future`;
			return false;
		}

		return true;
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (event.key.toLowerCase() === 'enter') {
			if (!validateDate(input)) {
				isValidDate = false;
			} else {
				helperMessage = '';
				onSubmit(input);
			}
		} else {
			isValidDate = true;
			helperMessage = 'press "enter" to submit';
		}
	}
</script>

<div class="flex w-fit flex-col text-left whitespace-nowrap">
	<input
		class="w-fit min-w-fit cursor-pointer text-gray-500 placeholder:text-gray-500 hover:text-black hover:placeholder:text-black focus:cursor-auto focus:border-b focus:border-dotted focus:outline-none dark:hover:text-gray-400 dark:hover:placeholder:text-gray-400"
		type="text"
		maxLength={35}
		{placeholder}
		onfocus={handleFocus}
		onblur={handleBlur}
		oninput={handleInput}
		onkeydown={handleKeyDown}
		bind:value={input}
	/>
	{#if helperMessage}
		<p class="text-sm" class:text-red-800={!isValidDate}>
			{helperMessage}
		</p>
	{/if}
</div>
