export default function formatearDinero(varo){
    return varo.toLocaleString('en-US', {
        style: 'currency', 
        currency: 'USD'
    })
}