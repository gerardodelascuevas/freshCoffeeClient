import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Resumen from "../components/resumen";
import useQuiosco from "../hooks/useQuiosco";
import Modal from 'react-modal';
import ModalProducto from "../components/modalProducto";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";


const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement('#root')

export default function Layout(){

    const {modal, handleClickModal} = useQuiosco(); 

    const { user, error } = useAuth({middleware: 'auth'});

    

    return (
        <>
            < div className="md:flex" >
                <Sidebar />

                <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
                    <Outlet />
                </main>
                

                <Resumen />
            </div>

            
                <Modal isOpen={modal} style={customStyles}> 
                   <ModalProducto />
                   
                </Modal>
            
            <ToastContainer />
        </>        
    )
}