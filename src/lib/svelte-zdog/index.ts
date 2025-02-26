import { getContext, onDestroy, onMount, setContext } from 'svelte';
import type {
	Primitive,
	PrimitiveConstructor,
	PrimitiveOptions,
	PrimitiveProps,
	Subscription,
	ZdogContext
} from './types.js';
import Zdog from 'zdog';

// Root context
// ================================

const zdogCtx = Symbol();
/** Returns the main scene anchor */
export const getScene = () => getContext<ZdogContext>(zdogCtx).scene;
/** Zdog context setter */
export const setZdog = (ctx: ZdogContext) => setContext<ZdogContext>(zdogCtx, ctx);
/** Subscribe update function */
export const subscribe = (fn: Subscription) =>
	onDestroy(getContext<ZdogContext>(zdogCtx).subscribe(fn));
// Parent context
// ================================

const parentCtx = Symbol();
/** Get parent node */
export const getParent = () => getContext<Primitive>(parentCtx);
/** Set parent node */
export const setParent = (parent: Primitive) => setContext<Primitive>(parentCtx, parent);
// Reexport your entry components here
export const mount = <P extends Primitive>(
	/** Zdog primitive */
	primitive: PrimitiveConstructor<P>,
	/** Primitive options */
	options: PrimitiveProps<P>
) => {
	const scene = getScene();
	const parent = getParent();
	const { update, ...rest } = options;
	const node = new primitive(rest as PrimitiveOptions<P>);

	setParent(node);
	if (update) subscribe(update(node));

	onMount(() => {
		parent.addChild(node);
		scene.updateGraph();

		return () => {
			parent.removeChild(node);
			parent.updateGraph();
			scene.updateGraph();
		};
	});

	return node;
};

// Re-exports
// ================================

export { default as Illustration } from './Illustration.svelte';
export { default as Anchor } from './primitives/Anchor.svelte';
export { default as Box } from './primitives/Box.svelte';
export { default as Cone } from './primitives/Cone.svelte';
export { default as Cylinder } from './primitives/Cylinder.svelte';
export { default as Ellipse } from './primitives/Ellipse.svelte';
export { default as Group } from './primitives/Group.svelte';
export { default as Hemisphere } from './primitives/Hemisphere.svelte';
export { default as Polygon } from './primitives/Polygon.svelte';
export { default as Rect } from './primitives/Rect.svelte';
export { default as RoundedRect } from './primitives/RoundedRect.svelte';
export { default as Shape } from './primitives/Shape.svelte';

export const { TAU, Vector, easeInOut, lerp, modulo } = Zdog;
