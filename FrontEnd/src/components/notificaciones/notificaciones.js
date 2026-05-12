import React, { useState } from 'react';
import { X } from "lucide-react";

const Notificaciones = ({ open, setOpen }) => {

    const [ntfs, setNtfs] = useState([
    {
      id: 234,
      nombre: "ntf1",
      descripcion: "test 01",
      fechaCaducidad: "10/05/2026",
      vista: false,
      fechaCreacion: "09/05/2026"
    },
    {
      id: 235,
      nombre: "ntf2",
      descripcion: "test 02",
      fechaCaducidad: "10/05/2026",
      vista: false,
      fechaCreacion: "10/05/2026"
    }

  ]);

  const marcarVista = (id) => {
    setNtfs((prev) =>
      prev.map((ntf) =>
        ntf.id === id
          ? { ...ntf, vista: true }
          : ntf
      )
    );
  };

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-[9999] flex justify-end h-full items-start pt-4 sm:pt-6 md:pt-20 shadow-xl transition-transform duration-300"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-blue-900 border-2 border-slate-600 w-full sm:w-[380px] max-w-[95vwp mr-2 sm:mr-4 shadow-xl max-g-[90vh] overflow-y-auto p-4 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            Notificaciones
          </h2>

          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {ntfs.map((ntf) => (
            <div
              className={`
              p-3 rounded-lg cursor-pointer
              ${ntf.vista
              ? "bg-slate-800"
              : "bg-slate-700 border border-blue-500"}
            `}
              key={ntf.id}
              onClick={() => marcarVista(ntf.id)}
            >
              <p>
                <span className="font-bold">
                  {ntf.nombre}:
                </span>{" "}
                  {ntf.descripcion}
              </p>

              <p className="text-sm">
                Fecha: {ntf.fechaCreacion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notificaciones;
