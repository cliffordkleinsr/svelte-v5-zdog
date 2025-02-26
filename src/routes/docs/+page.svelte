<script lang="ts">
	import Install from '$lib/components/Install.svelte';
	import Eye from '$lib/components/scenes/Eye.svelte';
	import Guy from '$lib/components/scenes/Guy.svelte';
	import AnimationSnippet from '$lib/components/snippets/AnimationSnippet.svelte';
	import EyeSnippet from '$lib/components/snippets/EyeSnippet.svelte';
	import Animation from '$lib/components/scenes/Animation.svelte';
	import Api from '$lib/components/API.svelte';
	import Github from '$lib/components/Github.svelte';
	import Npm from '$lib/components/snippets/NPM.svelte';
	import NotByAi from '$lib/components/snippets/NotByAI.svelte';
	import Signature from '$lib/components/snippets/Signature.svelte';
</script>

<svelte:head>
	<title>svelte-zdog · docs</title>
</svelte:head>

<main
	class="m-auto flex max-w-full flex-col items-center justify-center overflow-x-hidden px-4 py-16"
>
	<Guy />
	<h1>svelte-zdog</h1>
	<p>svelte components for <a href="https://zzz.dog">zdog</a> 3D renders</p>

	<h2 class="mt-32">🧰 install</h2>
	<Install />

	<h2 class="mt-32">📐 create</h2>
	<Eye />
	<EyeSnippet class="mt-4" />
	<p class="mt-8">
		build using declarative tree-like structs,<br />
		components expose all primitive options as props<br />
	</p>

	<h2 class="mt-32">🎬 animate</h2>
	<Animation />
	<AnimationSnippet class="mt-4" />
	<p class="mt-8">
		props are not reactive,<br />
		components accept an <span class="text-amber-400">update</span> function
	</p>
	<p class="mt-4">
		<span class="text-sky-400">node</span> → primitive reference<br />
		<span class="text-sky-400">delta</span> → ms since last frame<br />
		<span class="text-sky-400">ms</span> → total ms elapsed
	</p>

	<h2 class="mt-32">📦 pkg exports</h2>
	<Api />

	<Github class="mt-32" />
	<Npm class="mt-4" />
	<NotByAi class="mt-4" />

	<Signature class="mt-16" />
</main>
