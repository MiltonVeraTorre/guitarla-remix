import {useState,useEffect} from "react"
import {
    Meta,// Nos permite añadir la información meta del proyecto
    Links,// Nos permite añadir todos los links como son las hojas de estilos, google fonts, fontawesome y otros
    Outlet,// Nos permite inyectar el contenido en el document
    Scripts,// Contiene las optimizaciones de remix
    LiveReload,
    useCatch,//Hace que la app se refresque automaticamente
    Link


} from "@remix-run/react"


import styles from "~/styles/index.css"
import Header from "~/components/header"
import Footer from "~/components/footer"

export function meta(){
    return (
        {
            charset: "utf-8",
            title: "GuitarLA - Remix",
            viewport : "width=device-width, initial-scale=1"
        }
    )
}


export function links(){
    return (
        {
            rel : "stylesheet",
            href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        },
        {
            rel : "preconnect",
            href : "https://fonts.googleapis.com"
        },
        {
            rel : "preconnect",
            href : "https://fonts.gstatic.com",
            crossOrigin : "true"
        },
        {
            rel: "stylesheet",
            href : "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
        },
        {
            rel: "stylesheet",
            href : styles
        }
    )
}
export default function App(){
    // el typeof window !== undefined se usa para que detecte si se esta corriendo en el servidor o en el cliente
    const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)
    useEffect(()=>{
        //Se mete dentro del useEffect para que se ejecute en la parte del cliente
        localStorage.setItem("carrito",JSON.stringify(carrito))
    },[carrito])

    const agregarCarrito = guitarra => {
       if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            // Iterar sobre el arreglo e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState =>{
                if(guitarraState.id === guitarra.id){
                    //Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                    // En lugar de sobreescribir sumarlo
                    //guitarraState.cantidad += guitarra.cantidad

                }
                return guitarraState
            })
            setCarrito(carritoActualizado)
       }else{
        //Registro nuevo agregar al carrito
        setCarrito([...carrito,guitarra])
       }
    }
    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }
    const eliminarGuitarra = id =>{
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }
    return (<Document>
                <Outlet 
                    context={{
                        agregarCarrito,
                        carrito,
                        actualizarCantidad,
                        eliminarGuitarra
                    }}
                />
            </Document>)
}
function Document({children}){
    return (
        <html lang="es">
            <head>
                <Meta></Meta>
                <Links></Links>
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
// Manejo de errores

export function CatchBoundary(){
    const error = useCatch();
    return (
        <Document>
            <p className="error">{error.status} {error.statusText}</p>
            <Link className="error-enlace" to="/">Talvez quieras volver a la página principal</Link>
        </Document>
    )
}
export function ErrorBoundary({error}){
    return (
        <Document>
            <p className="error">{error.status} {error.statusText}</p>
            <Link className="error-enlace" to="/">Talvez quieras volver a la página principal</Link>
        </Document>
    ) 
}