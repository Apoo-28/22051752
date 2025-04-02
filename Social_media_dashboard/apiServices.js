const API_URL = 'http://localhost:3000/posts';

export const fetchData = async () => {
    try {
        const response =await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');

        return await response.json();
    }
    catch(error) {
        console.error(error);
        return [];
    }
};