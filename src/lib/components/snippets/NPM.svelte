<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<a href="https://npm.im/svelte-zdog" target="_blank" class={[className]}>
	<img
		alt="npm"
		class="rounded-full ring-amber-400 hover:ring-2"
		src="https://img.shields.io/npm/v/svelte-zdog?logo=npm&style=flat-square"
	/>
</a>
