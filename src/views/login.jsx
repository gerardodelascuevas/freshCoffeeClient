import { Link } from "react-router-dom";

export default function Login(){
    return(
        <>
        <h1 className="text-4xl font-bold"> Login </h1>
        <p>Para Crear un Pedido debes Iniciar Sesión </p>
        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10 w-96">
            <form action="">               

                <div className="mb-4" >
                    <label htmlFor="email"
                        className="text-slate-800"
                    >
                        Email
                    </label>
                    <input 
                        type="email"
                        id='email'
                        className="mt-2 block p-3 bg-gray-100"
                        name="email"
                        placeholder="Escribe tu email"
                    />
                </div>

                <div className="mb-4" >
                    <label htmlFor="password"
                        className="text-slate-800"
                    >
                        Password
                    </label>
                    <input 
                        type="password"
                        id='password'
                        className="mt-2 block p-3 bg-gray-100"
                        name="password"
                        placeholder="Escribe tu Password"
                    />
                </div>
               
                <input type="submit" 
                    value="Iniciar Sesión"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 font-bold cursor-pointer"
                />
            </form>
        </div>

        <nav className="mt-5">
            <Link to="/auth/registro">
                ¿No tienes Cuenta?, ¡Crea una!
            </Link>
        </nav>
    </>
    )
}