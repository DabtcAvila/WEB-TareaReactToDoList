import { useEffect, useState } from "react";

// Componente para el formulario de nuevos elementos
function NewItemsForm({ onAddTask }) {
  const [nuevoTexto, setNuevoTexto] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (nuevoTexto.trim() !== "") {
      onAddTask(nuevoTexto.trim());
      setNuevoTexto("");
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        value={nuevoTexto}
        onChange={(e) => setNuevoTexto(e.target.value)}
        placeholder="Añadir nueva tarea..."
      />
      <button type="submit">Añadir</button>
    </form>
  );
}

// Componente para representar un ítem de la lista
// Creado como funcion con declaración clásica
function ListItem({ id, completado, texto, cambiaValor }) {
  return (
    <li>
      <input
        className="form-check-input"
        type="checkbox"
        checked={completado}
        id={`check-${id}`}
        // Cuando cambia el estado del checkbox, se llama a la función cambiaValor
        onChange={() => cambiaValor()}
      />
      <span>{texto}</span>
    </li>
  );
}

// Componente principal de la lista de tareas
// Creado como función con expresión de función flecha
export const TodoList = () => {
  // Estado para las tareas. Se usa useState para manejar la variable de estado 'tareas'
  // El usar useState permite que se recuerde el valor entre renderizados y que al cambiar el valor
  // se vuelva a renderizar el componente
  const [tareas, setTareas] = useState([
    { id: 1, completado: true, texto: "Aprender HTML" },
    { id: 2, completado: false, texto: "Aprender CSS" },
  ]);

  // Estado para la última hora de cambios
  const [ultimaHoraDeCambios, setUltimaHoraDeCambios] = useState("");

  // Efecto secundario para actualizar la última hora de cambios cuando las tareas cambian
  useEffect(() => {
    const cambio = new Date().toLocaleTimeString();
    setUltimaHoraDeCambios(cambio);
  }, [tareas]);

  // Función para cambiar el estado de una tarea por su ID
  // Usando map para una implementación más funcional y eficiente
  const cambiaTareaPorId = (id) => {
    setTareas((arregloPrevio) => {
      return arregloPrevio.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completado: !tarea.completado }
          : tarea
      );
    });
  };

  // Función para añadir una nueva tarea
  const agregarTarea = (textoNuevo) => {
    const nuevaTarea = {
      id: Math.max(...tareas.map(t => t.id), 0) + 1,
      completado: false,
      texto: textoNuevo
    };
    setTareas(tareasAnteriores => [...tareasAnteriores, nuevaTarea]);
  };

  return (
    <>
      <div>
        <h1>Todo list</h1>
        <NewItemsForm onAddTask={agregarTarea} />
        {tareas.map((tarea) => (
          <ListItem
            key={tarea.id}
            id={tarea.id}
            completado={tarea.completado}
            texto={tarea.texto}
            cambiaValor={() => cambiaTareaPorId(tarea.id)}
          />
        ))}
      </div>
      <div>Ultimo cambio: {ultimaHoraDeCambios}</div>
    </>
  );
};
export default TodoList;
