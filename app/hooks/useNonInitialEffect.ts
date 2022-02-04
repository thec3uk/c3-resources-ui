import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

export const useNonInitialEffect = (
	effect: EffectCallback,
	deps?: DependencyList
): any => {
	const initialRender = useRef(true);

	useEffect(() => {
		let effectReturns: any = () => {
			/* Empty Return fallback */
		};

		if (initialRender.current) {
			initialRender.current = false;
		} else {
			effectReturns = effect();
		}

		if (effectReturns && typeof effectReturns === 'function') {
			return effectReturns;
		}
	}, deps);
};
