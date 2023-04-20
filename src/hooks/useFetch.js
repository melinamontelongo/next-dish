import { useState, useEffect } from "react";

export const useFetch = ( url, key ) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        if(!sessionStorage.getItem(key)){
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    sessionStorage.setItem(key, JSON.stringify(data));
                })
                .finally(() => setLoading(false));
        } else {
            const localData = JSON.parse(sessionStorage.getItem(key));
            setData(localData);
            setLoading(false);
        }
    }, []);
    
    return { data, loading }
}