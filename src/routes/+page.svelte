<script lang="ts">
	import Castle from '$lib/components/scenes/castle/Castle.svelte';
	import Guy from '$lib/components/scenes/Guy.svelte';
	import Animation from '$lib/components/scenes/Animation.svelte';

	const sketches = [Guy, Castle, Animation];

	let pointer = $state(0);
	let selected = $derived(sketches[pointer]);

	const SvelteComponent = $derived(selected);
</script>

<main class="min-h-mobile m-auto flex w-full flex-col items-center justify-center overflow-hidden">
	<SvelteComponent />

	<button
		onclick={() => (pointer = ++pointer % sketches.length)}
		class="mt-4 rounded p-0.5 text-2xl transition hover:bg-stone-800"
	>
		⏩
	</button>

	<h1 class="relative">
		<small class="absolute text-sm text-amber-400">made with</small>
		svelte-zdog
	</h1>

	<a
		href="/docs"
		class="rounded px-4 text-2xl ring-2 ring-amber-400 transition hover:bg-amber-400 hover:text-stone-800"
	>
		docs
	</a>
</main>
