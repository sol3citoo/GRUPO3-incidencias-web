
const apiUrl = import.meta.env.REACT_APP_API_URL ?? 'http://localhost:3001/';

export let user = null;
export let roles = null;
export let categorias = null;

export const login = async (correo, password) => {
    try {
        console.log(apiUrl);

        const response = await fetch(`${apiUrl}usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: null
            },
            body: JSON.stringify({ email: correo, contraseña: password })
        });
        const data = await response.json();

        localStorage.setItem("authToken", data.token);

        //user = data.usuario;

        //fetchStatistics();

        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

const fetchStatistics = async () => {
    try {
        roles = await fetch('roles');
        categorias = await fetch('categorias');

        console.log("Roles:", roles);
        console.log("Categorías:", categorias);

    } catch (error) {
        console.error('Error fetching statistics:', error);
        throw error;
    }
};

const fetch = async (endpoint = {}) => {
    const token = localStorage.getItem("authToken");

    return await window.fetch(`${apiUrl}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

