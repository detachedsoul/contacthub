/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useSWR from "swr";

const useFetch = <T>(
	key: string | any[],
	fetcher: (...args: any[]) => Promise<T>,
	options?: {
		revalidateOnFocus?: boolean;
		refreshInterval?: number;
	},
) => {
	const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher, options);

	return {
		data,
		error,
		isLoading,
		mutate,
	};
};

export default useFetch;
