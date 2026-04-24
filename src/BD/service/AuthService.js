
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: correo, contraseña: password })
        });
        const data = await response.json();

        localStorage.setItem("authToken", data.token);

        user = data.usuario;

        console.log(user);

        await fetchStatics();

        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
};

export const getUser = async() => {
    if (!user) {
        const token = localStorage.getItem("authToken");
        if (token) {
            user = parseJwt(token);

            await fetchStatics();
        }
    }
    return user;
};

export const logout = () => {
    localStorage.removeItem("authToken");
    user = null;
};

export const isAdmin = () => {
    if (!user || !roles) return false;

    const rolId = user.rolId;

    console.log(user, roles);

    roles.forEach(element => {
        if (element.Nombre === "Admin") {
            console.log(element.Id === rolId, element);
            return element.Id === rolId;
        }
    });

    return false;
};

const fetchStatics = async () => {
    try {
        roles = await get('roles');
        categorias = await get('categorias');

        console.log("Roles:", roles);
        console.log("Categorías:", categorias);

    } catch (error) {
        console.error('Error geting statistics:', error);
        throw error;
    }
};

const get = async (endpoint = {}) => {
    const token = localStorage.getItem("authToken");

    return (await fetch(`${apiUrl}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })).json();
};

