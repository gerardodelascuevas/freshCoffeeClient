import useSWR from 'swr';
import Producto from '../components/producto'
import {productos as vale } from '../data/products'
import useQuiosco from '../hooks/useQuiosco'
import clienteAxios from '../config/axios';

export default function Inicio(){

    const { categoriaActual } = useQuiosco();

    const fetcher = ()=> clienteAxios('/productos').then(data => data.data)  
    const { data, error, isLoading } = useSWR('/productos', fetcher, {
        refreshInterval: 1000
    });

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const productos = data.data.filter(x=> x.categoria_id === categoriaActual.id);
 


    return(
        <div>            
            <h1 className='text-4xl font-black'> {categoriaActual.nombre} </h1>
            <p className='text-2xl my-10'> Elige y Personaliza tu pedito: </p>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 '>
                {productos.map(x=> (
                    <Producto key={x.imagen} producto={x}/>
                ))}
            </div>
        </div>
    )
}