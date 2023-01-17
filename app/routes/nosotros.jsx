import imagen from "../../public/img/nosotros.jpg"
import styles from "~/styles/nosotros.css"

export function meta(){
  return {
    title: "GuitarLA - Sobre Nosotros",
    description : "Venta de guitarras, blog de musica"
  }
}

export function links(){
  return [
    {
      rel : "stylesheet",
      href : styles

    },
    {
      rel : "preload",
      href : imagen,
      as: "image"
    }
  ]
}
function Nosotros() {
  return (
    <main className="contenedor nosotros">
        <h2 className="heading">Nosotros</h2>
        <div className="contenido">
            <img src={imagen} alt="Imagen sobre nosotros" />
            <div>
              <p>
                Cillum ad culpa duis eu. Ullamco incididunt minim fugiat culpa dolore enim eiusmod anim ad pariatur ipsum. Deserunt minim sit dolor velit esse reprehenderit nulla cupidatat laborum. Aliquip et cillum id irure. Eu adipisicing nulla cupidatat magna non amet cillum incididunt mollit Lorem non cillum. Magna ut dolore amet amet commodo ut proident cillum velit commodo in enim enim.
              </p>
              <p>
                Cillum ad culpa duis eu. Ullamco incididunt minim fugiat culpa dolore enim eiusmod anim ad pariatur ipsum. Deserunt minim sit dolor velit esse reprehenderit nulla cupidatat laborum. Aliquip et cillum id irure. Eu adipisicing nulla cupidatat magna non amet cillum incididunt mollit Lorem non cillum. Magna ut dolore amet amet commodo ut proident cillum velit commodo in enim enim.
              </p>
            </div>
        </div>
    </main>
  )
}

export default Nosotros