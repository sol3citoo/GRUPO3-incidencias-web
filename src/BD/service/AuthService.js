
const apiUrl = import.meta.env.REACT_APP_API_URL ?? 'http://localhost:3001/';

export let user = null;
export let users = null;
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
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
};

export const getUser = async () => {
    if (!user) {
        const token = localStorage.getItem("authToken");

        if (token && token !== "undefined") {
            user = parseJwt(token);

            await fetchStatics();
        }
    }

    return user;
};

export const getUsers = async () => {
    if (!users) {
        users = await get('usuarios');
    }
    return users;
};

export const register = async (user) => {
    try {
        const response = await fetch(`${apiUrl}usuarios/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const eliminarUsuario = async (id) => {
    try {
        const response = await fetch(`${apiUrl}usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("authToken")}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("authToken");
    user = null;
};

export const isAdmin = async () => {
    try {
        const currentUser = await getUser();

        const rolId = currentUser.rolId;

        const isUserAdmin = roles.some(element => 
            element.Nombre === "Admin" && element.Id === rolId
        );
        //console.log("IsAdmin result:", isUserAdmin, { rolId, roles });

        return isUserAdmin;
    } catch (error) {
        return false;
    }
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

export const get = async (endpoint = {}) => {
    const token = localStorage.getItem("authToken");

    return (await fetch(`${apiUrl}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })).json();
};

