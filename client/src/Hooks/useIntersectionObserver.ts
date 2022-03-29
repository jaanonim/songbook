import React from "react";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";

interface UseIntersectionObserverInterface {
	root?: any;
	target: any;
	onIntersect: (
		options?: FetchNextPageOptions | undefined
	) => Promise<InfiniteQueryObserverResult<any, unknown>>;
	threshold?: number;
	rootMargin?: string;
	enabled: boolean;
}

export default function useIntersectionObserver({
	root,
	target,
	onIntersect,
	threshold = 1.0,
	rootMargin = "0px",
	enabled = true,
}: UseIntersectionObserverInterface): any {
	React.useEffect(() => {
		if (!enabled) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) =>
				entries.forEach(
					(entry) => entry.isIntersecting && onIntersect()
				),
			{
				root: root && root.current,
				rootMargin,
				threshold,
			}
		);

		const el = target && target.current;

		if (!el) {
			return;
		}

		observer.observe(el);

		return () => {
			observer.unobserve(el);
		};
	}, [target.current, enabled]);
}
