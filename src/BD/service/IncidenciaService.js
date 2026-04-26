import { get } from "./AuthService";

let incidencias = null;
let categorias = null;
let ubicaciones = null;
let urgencias = null;

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/';


export async function postIncidencia(incidencia) {
    try {
        const response = await fetch(`${apiUrl}incidencias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify(incidencia)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering incidencia:', error);
        throw error;
    }
}

export async function getIncidencias() {
    if (!incidencias) {
        const token = localStorage.getItem("authToken");
        incidencias = get('incidencias');
    }
    return incidencias;
}
            

export function getCategorias() {
    if (!categorias) {
        const token = localStorage.getItem("authToken");

        categorias = get('categorias');
    }

    return categorias;
}

export function getUbicaciones() {
    if (!ubicaciones) {
        const token = localStorage.getItem("authToken");

        ubicaciones = get('ubicaciones');
    }

    return ubicaciones;
}

export function getUrgencias() {
    if (!urgencias) {
        const token = localStorage.getItem("authToken");

        urgencias = get('urgencias');
    }

    return urgencias;
}

