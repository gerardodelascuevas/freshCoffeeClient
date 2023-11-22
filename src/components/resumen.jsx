import formatearDinero from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./resumenProducto";

export default function Resumen(){

    const {pedido, total} = useQuiosco(); 

    const comprobarPedido = ()=> {
       return pedido.length === 0
    }

    return(
        <>
        <aside className="w-72 h-screen overflow-y-scroll p-5">
            <h1 className="text-4xl font-black"> Mi Pedido </h1>
            <p className="text-lg my-5"> Aqui podras vers el resumen y totales de tu Pedido </p>
            <div className="py-10">
               {pedido.length === 0 ? (
                <p> No tienes elementos en tu pedido </p> 
             ) : (
                pedido.map(x=> (
                    <ResumenProducto 
                    key={x.id}
                        producto = {x}
                    />
                ))
             )}
            </div>
            <p className="text-xl mt-10"> Total: {formatearDinero(total)} </p>

            <form className='w-full' action="">
                <div className="mt-5">
                    <input type="submit" 
                        className={` ${comprobarPedido() ?   'bg-indigo-100' : 
                       'bg-indigo-600 hover:bg-indigo-800'
                    } " px-5 py-2 rounded fond-bold text-white
                        text-center cursor-pointer" `} value="Confirmar Pedido"
                        disabled={comprobarPedido()}
                    />
                </div>

            </form>
        </aside>
            
        </>
    )
}