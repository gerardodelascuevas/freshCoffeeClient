import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import clienteAxios from "../config/axios";
const QuioscoContext = createContext();

function QuioscoProvider({children}){

    const [categorias, setCategorias] = useState([]);

    const [categoriaActual, setCategoriaActual] = useState({});

    const [modal , setModal] = useState(false);

    const [ producto, setProducto ] = useState({});

    const [pedido, setPedido] = useState([]);

    const [total, setTotal] = useState(0);

    const handleClickCategoria = (id)=> {
        const categoria = categorias.filter(x=> x.id === id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = ()=> {
        setModal(!modal);
    }

    const handleSetProducto = (producto)=> {
        setProducto(producto);
    }

    const handleAgregarPedido = ({categoria_id, ...producto})=> {
        
        if(pedido.some(pedidoState=> pedidoState.id === producto.id)){
            const pedidoActualizado = pedido.map(pedidoState=> pedidoState.id === producto.id ? 
                producto : pedidoState)
           setPedido(pedidoActualizado);          
           toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto]);            
            toast.success('Agregado al Pedido')
        }
    }

    const handleEditarCantidad = (id)=> {
        const productoActualizar = pedido.filter(x=> x.id === id)[0]; 
        setProducto(productoActualizar);        
        handleClickModal();
    }

    const handleEliminarProductoPedido = id=> {
        const pedidoActualizado = pedido.filter(x=> x.id !== id); 
        console.log('Pedido actualizdo eliminar', pedidoActualizado)
        setPedido(pedidoActualizado)
        toast.success('Eliminado Correctamente');
    }

    useEffect(()=> {
        const nuevoTotal = pedido.reduce((acc, el)=> (el.precio * el.cantidad) + acc, 0);
        setTotal(nuevoTotal);
    }, [pedido])

    const obtenerCategorias = async()=> {        
        try {
            const categorias = await clienteAxios(`/categorias`)            
            setCategorias(categorias.data.data);
            setCategoriaActual(categorias.data.data[0]);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=> {
        obtenerCategorias()
    }, [])

    const handleSubmitNewOrder = async ()=> {
        const token = localStorage.getItem('AUTH_TOKEN'); 
        //e.preventDefault()
        try {
            const {data} = await clienteAxios.post('/pedidos', {
                total, 
                productos: pedido.map(x=> {
                    return {
                        id: x.id, 
                        cantidad: x.cantidad,
                    }
                }), 

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            })
            toast.success(data.message)
            
        } catch (error) {
            alert('Ha ocurrido un error');
            console.log(error)
            console.error(error) 
        }
    }

    return(
        <QuioscoContext.Provider 
            value={{
                categorias, 
                categoriaActual, 
                handleClickCategoria, 
                modal, 
                handleClickModal,
                producto, 
                handleSetProducto, 
                pedido, 
                handleAgregarPedido, 
                handleEditarCantidad, 
                handleEliminarProductoPedido, 
                total,
                handleSubmitNewOrder
            }}> {children}
        </QuioscoContext.Provider>
    )
}

export{
    QuioscoProvider
}

export default QuioscoContext