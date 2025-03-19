type RequestBody = {
    username: string | null;
    password: string | null;
};

export async function sendPostRequest(url: string, payload: RequestBody) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return response;
        
    } catch (err) {
        console.error(err);
    }
}