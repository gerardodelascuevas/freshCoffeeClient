import { useContext } from "react"
import QuioscoContext from "../content/quioscoProvider"

const useQuiosco = ()=> {
    return useContext(QuioscoContext);
}

export default useQuiosco;