import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { API_URL } from "../../utils/api";

const Notificaciones = ({ open, setOpen }) => {
  const [ntfs, setNtfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaCaducidad: ""
  });

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, [open]);

  const token = localStorage.getItem("token");
  const esAdmin = Boolean(user && (user.tipoUsuario === 0 || user.tipoUsuario === 1));

  const cargarNotificaciones = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/notificaciones`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });

      if (!response.ok) {
        throw new Error("Error al cargar notificaciones");
      }

      const data = await response.json();
      const lista = Array.isArray(data.data) ? data.data : [];
      const ahora = new Date();

      const filtradas = lista.filter((ntf) => {
        if (!ntf.fechaCaducidad) return true;
        const fecha = new Date(ntf.fechaCaducidad);
        return !Number.isNaN(fecha.getTime()) && fecha >= ahora;
      });

      setNtfs(filtradas);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
      setError("No se pudieron cargar las notificaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      cargarNotificaciones();
    }
  }, [open]);

  const notificacionesOrdenadas = useMemo(() => {
    return [...ntfs].sort((a, b) => {
      const fechaA = new Date(a.createdAt || a.fechaCreacion || 0).getTime();
      const fechaB = new Date(b.createdAt || b.fechaCreacion || 0).getTime();
      return fechaB - fechaA;
    });
  }, [ntfs]);

  const esVista = (ntf) => {
    if (!user?._id) return false;
    return Array.isArray(ntf.vistoPor) && ntf.vistoPor.includes(user._id);
  };

  const marcarVista = async (ntf) => {
    if (!user?._id || !token) return;
    if (esVista(ntf)) return;

    try {
      const response = await fetch(`${API_URL}/notificaciones/${ntf._id}/visto`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ vistoPor: user._id })
      });

      if (response.ok) {
        setNtfs((prev) =>
          prev.map((item) =>
            item._id === ntf._id
              ? { ...item, vistoPor: [...(item.vistoPor || []), user._id] }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error al marcar notificacion como vista:", err);
    }
  };

  const formatearFecha = (value) => {
    if (!value) return "Sin fecha";
    const fecha = new Date(value);
    if (Number.isNaN(fecha.getTime())) return "Sin fecha";
    return fecha.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleEnviar = async (event) => {
    event.preventDefault();
    if (!esAdmin) return;

    if (!formData.nombre.trim() || !formData.descripcion.trim()) {
      setError("Nombre y descripcion son obligatorios.");
      return;
    }

    setEnviando(true);
    setError("");

    try {
      const payload = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim()
      };

      if (formData.fechaCaducidad) {
        payload.fechaCaducidad = new Date(formData.fechaCaducidad).toISOString();
      }

      const response = await fetch(`${API_URL}/notificaciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar la notificacion");
      }

      setFormData({ nombre: "", descripcion: "", fechaCaducidad: "" });
      toast.success("Notificacion enviada a todos los usuarios.");
      await cargarNotificaciones();
    } catch (err) {
      console.error("Error al enviar notificacion:", err);
      setError(err.message || "No se pudo enviar la notificacion.");
    } finally {
      setEnviando(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-[9999] flex justify-end h-full items-start pt-4 sm:pt-6 md:pt-20 shadow-xl transition-transform duration-300"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-blue-900 border-2 border-slate-600 w-full sm:w-[380px] max-w-[95vwp mr-2 sm:mr-4 shadow-xl max-h-[90vh] overflow-y-auto p-4 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Notificaciones</h2>

          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {esAdmin && (
          <form
            onSubmit={handleEnviar}
            className="mb-4 bg-slate-800/60 p-3 rounded-lg border border-slate-600"
          >
            <h3 className="text-sm font-semibold mb-2">Enviar notificacion general</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Titulo"
                className="w-full rounded-md px-3 py-2 text-sm text-black"
              />
              <textarea
                rows="3"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Mensaje para todos los usuarios"
                className="w-full rounded-md px-3 py-2 text-sm text-black"
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="date"
                  value={formData.fechaCaducidad}
                  onChange={(e) => setFormData({ ...formData, fechaCaducidad: e.target.value })}
                  className="w-full rounded-md px-3 py-2 text-sm text-black"
                />
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
                >
                  {enviando ? "Enviando..." : "Enviar"}
                </button>
              </div>
              <p className="text-xs text-slate-200">
                La notificacion se mostrara a todos los usuarios y quedara activa hasta la fecha de caducidad.
              </p>
            </div>
          </form>
        )}

        {error && (
          <div className="mb-3 text-xs text-red-200 bg-red-900/60 border border-red-500/40 p-2 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-sm text-slate-200">Cargando notificaciones...</div>
        ) : (
          <div className="flex flex-col gap-2">
            {notificacionesOrdenadas.length === 0 && (
              <div className="text-sm text-slate-300">No hay notificaciones.</div>
            )}
            {notificacionesOrdenadas.map((ntf) => {
              const vista = esVista(ntf);
              return (
                <div
                  className={`p-3 rounded-lg cursor-pointer ${
                    vista ? "bg-slate-800" : "bg-slate-700 border border-blue-500"
                  }`}
                  key={ntf._id}
                  onClick={() => marcarVista(ntf)}
                >
                  <p>
                    <span className="font-bold">{ntf.nombre}:</span>{" "}
                    {ntf.descripcion}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Fecha: {formatearFecha(ntf.createdAt)}
                    {ntf.fechaCaducidad ? ` · Caduca: ${formatearFecha(ntf.fechaCaducidad)}` : ""}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notificaciones;
