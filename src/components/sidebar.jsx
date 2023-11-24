import { useAuth } from "../hooks/useAuth";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";


export default function Sidebar(){

    const { categorias } = useQuiosco();

    const {logout, user} = useAuth({middleware: 'auth'})

    return(
        <aside className="w-72">
            <div className="p-4">
                <img src="/img/logo.svg" alt="logo" className="w-40"/>
            </div>
                <p className="my-10 text-xl text-center"> Hola {user?.name} </p>
            <div className="mt-10">
                { categorias.map(x=> (                 
                    <Categoria 
                    key={x.id}
                        categoria = {x}
                    />
                )) }
            </div>
                    
            <div className="my-5 px-5">
                <button className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                    onClick={logout}
                >
                    Cancelar Orden</button>

            </div>
        </aside>
    )
}