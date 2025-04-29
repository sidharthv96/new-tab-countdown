<script lang="ts">
	import CustomDateInput from '$lib/components/CustomDateInput.svelte';
	import DeleteCountdown from '$lib/components/DeleteCountdown.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { dropdownOptions } from '$lib/constants/DropdownOptions';
	import { precision, type TimeUnit } from '$lib/constants/TimeOptions';
	import CustomDateInputHelper from '$lib/utils/CustomDateInputHelper';
	import DateCalculator from '$lib/utils/DateCalculator';
	import dayjs from 'dayjs';

	interface Props {
		id: number;
		timeOption: TimeUnit;
		dateOption: string;
		now: Date;
		shouldBlur: boolean;
		shouldHideDropdowns: boolean;
		enableDeleteCountdown: boolean;
		onCountdownDropdownChange: (id: number, isBeingModified: boolean) => void;
		deleteCountdown: () => void;
	}

	let {
		id,
		timeOption = $bindable(),
		dateOption = $bindable(),
		now,
		shouldBlur,
		shouldHideDropdowns,
		enableDeleteCountdown,
		onCountdownDropdownChange,
		deleteCountdown
	}: Props = $props();

	let currentOpenDropdown = $state<'time' | 'date' | undefined>(undefined);

	const endDate = $derived(DateCalculator.getEndDateFromDateOption(dateOption));
	const timeRemaining = $derived(
		dayjs(endDate).diff(now, timeOption, true).toFixed(precision[timeOption])
	);

	$effect(() => {
		if (shouldBlur || shouldHideDropdowns) {
			currentOpenDropdown = undefined;
		}
	});

	function handleDropdownToggle(type: 'time' | 'date') {
		currentOpenDropdown = type;
		onCountdownDropdownChange(id, true);
	}

	function handleOptionSelect() {
		currentOpenDropdown = undefined;
		onCountdownDropdownChange(id, false);
	}

	function handleCustomDateSubmit(input: string) {
		const customDate = CustomDateInputHelper.getCustomDate(input);
		if (customDate) {
			dateOption = customDate.displayName;
			handleOptionSelect();
		}
	}
</script>

<div class:opacity-5={shouldBlur}>
	There are
	{timeRemaining}
	<Dropdown
		shouldDisplay={currentOpenDropdown === 'time'}
		displayOption={timeOption}
		dropdownOptions={dropdownOptions.timeOptions}
		bind:value={timeOption}
		onOpen={() => handleDropdownToggle('time')}
		onClose={handleOptionSelect}
	/>
	remaining
	<Dropdown
		shouldDisplay={currentOpenDropdown === 'date'}
		displayOption={dateOption}
		dropdownOptions={dropdownOptions.dateOptions}
		bind:value={dateOption}
		onOpen={() => handleDropdownToggle('date')}
		onClose={handleOptionSelect}
	>
		<CustomDateInput onSubmit={handleCustomDateSubmit} />
	</Dropdown>
	<span class="-ml-4">.</span>
	<span class="inline-block">
		<DeleteCountdown shouldShow={enableDeleteCountdown} onDelete={deleteCountdown} />
	</span>
</div>
