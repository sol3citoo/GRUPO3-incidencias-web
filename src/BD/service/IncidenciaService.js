import { get } from "./AuthService";

let incidencias = null;
let categorias = null;
let ubicaciones = null;
let urgencias = null;
let estados = null;

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

export function cambiarEstado(incidencia, estado) {
    try {
        const response = fetch(`${apiUrl}incidencias/${incidencia.Id}/cambiarEstado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify({ estado: estado })
        });
        return response;
    } catch (error) {
        console.error('Error changing estado:', error);
        throw error;
    }
}

export function cambiarAbierto(incidencia, abierto) {
    try {
        const response = fetch(`${apiUrl}incidencias/${incidencia.Id}/cambiarAbierto`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify({ abierto: abierto })
        });
        return response;
    } catch (error) {
        console.error('Error changing abierto:', error);
        throw error;
    }
}

export async function getIncidencias(refetch = false) {
    if (!incidencias || refetch) {
        const token = localStorage.getItem("authToken");
        incidencias = get('incidencias');
    }
    return incidencias;
}


export async function getIncidenciasWithfilter(body) {
    const token = localStorage.getItem("authToken");

    return (await fetch(`${apiUrl}incidencias/filter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })).json();
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

export function getEstados() {
    if (!estados) {
        const token = localStorage.getItem("authToken");

        estados = get('estados');
    }

    return estados;
}
