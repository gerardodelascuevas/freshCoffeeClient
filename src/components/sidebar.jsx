import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";


export default function Sidebar(){

    const { categorias } = useQuiosco();

    return(
        <aside className="w-72">
            <div className="p-4">
                <img src="/img/logo.svg" alt="logo" className="w-40"/>
            </div>
            
            <div className="mt-10">
                { categorias.map(x=> (                 
                    <Categoria 
                    key={x.id}
                        categoria = {x}
                    />
                )) }
            </div>

            <div className="my-5 px-5">
                <button className="text-center bg-red-500 w-full p-3 font-bold text-white truncate">
                    Cancelar Orden</button>

            </div>
        </aside>
    )
}