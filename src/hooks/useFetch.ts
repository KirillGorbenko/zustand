import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .finally(() => setIsLoading(false));
    }, [url]);

    return {isLoading, data};
};

export default useFetch;