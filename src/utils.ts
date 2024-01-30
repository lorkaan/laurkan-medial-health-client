
export function fetchData<T>(url: string): Promise<T> {
    return fetch(url, {
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json() as Promise<T>
    })
}

export function sendData<D,T>(url: string, data: D): Promise<T> {
    return fetch(url, {
        mode: 'cors',
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json() as Promise<T>
    })
}

export interface Dictionary<T>{
    [key: string]: T;
}