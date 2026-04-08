import React, { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../components/context/AuthContext"
import { toast } from 'react-hot-toast';
import { API_URL } from '../utils/api'


export const Tutoriales = () => {
    const { user } = useAuth()
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nombreTutorial, setNombreTutorial] = useState("");
    const [urlTutorial, setUrlTutorial] = useState("");
    const [tutoriales, setTutoriales] = useState([]);

    useEffect(()=>{
       fetchTutoriales(); 
    }, []);
   
    const handleCrearTutorial = async () => {
        try {
            
            // evita enviar problemas a back, aunque back tambien valida esto
            if (!nombreTutorial.trim() || !urlTutorial.trim()){
                toast.error("Nombre y URL son obligatorios para crear un tutorial");
                return;
            }

            const res = await fetch(`${API_URL}/tutoriales/create-tutorial`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    nombre: nombreTutorial.trim(),
                    url: urlTutorial.trim(),
                })
            });

          if (res.ok) {
            toast.success('Tutorial creado');
            setNombreTutorial("");
            setUrlTutorial("");
            setMostrarModal(false);
            fetchTutoriales();
          } else {
            const errorData = await res.json();
            toast.error(errorData.message || 'Error al guardar el tutorial');
          }
        } catch (error) {
            console.error('Error: ', error);
            toast.error('Error al crear el tutorial');
        }
    }

    const fetchTutoriales = async () => {
        try {
          const response = await fetch(`${API_URL}/tutoriales/get-tutoriales`);
          if (!response.ok) {
            console.log(response);
            throw new Error('Error al cargar tutoriales');
          }
          
          const data = await response.json();
          setTutoriales(data.data || []);
        } catch (error) {
          console.error('Error:', error);
          toast.error('Error al cargar tutoriales');
        }
    };

    return (
    <div className="flex flex-col items-center gap-4 bg-gray-800/80 pt-16 min-h-screen p-4 sm:p-8">
      
      {/* Título */}
      <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
        <span className="text-gray-200">Tutoriales</span>
      </h1>

      {/*Boton para agregar un tutorial, solo para admin*/}
      {(user) && (user.tipoUsuario === 0 || user.tipoUsuario === 1) && (
      <div className="w-full max-w-6xl px-4 py-2 text-white">
        <button
            onClick={() => setMostrarModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium p-4 rounded-lg shadow"
        >
            + Agregar tutorial
        </button>
        
        {/*Modal bien perron para agregar tutoriales*/}
        {mostrarModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Nuevo tutorial
                </h3>
                <input
                  type="text"
                  value={nombreTutorial}
                  onChange={(e) => setNombreTutorial(e.target.value)}
                  placeholder="Nombre del tutorial"
                  className="w-full px-4 py-2 mb-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={urlTutorial}
                  onChange={(e) => setUrlTutorial(e.target.value)}
                  placeholder="Link al tutorial"
                  className="w-full px-4 py-2 mb-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setMostrarModal(false)}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCrearTutorial}
                    className="px-4 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Crear
                  </button>
                </div>
              </div>
            </div>
        )}

      </div>
      )}

    {tutoriales.map( (tutorial, i) => (
        <div>
            <div>{tutorial.nombre}</div>
            <a 
                href={tutorial.url}
                className="text-blue-300 hover:text-blue-200 underline" 
                target="_blank" 
            >
                {tutorial.url}
            </a>

        </div>
    ))}
    </div>
    )
}

export default Tutoriales;
