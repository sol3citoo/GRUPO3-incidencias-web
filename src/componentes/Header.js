import { useNavigate } from "react-router-dom"
import "../App.css"

export default function Header() {
    const navigate = useNavigate();

    return (
        <div>
            <header className="bg-dark text-white p-3 shadow">
                <a onClick={() => navigate('/')}><div className="container"><strong>Página de Incidencias</strong></div></a>
            </header>
        </div>
    )
}