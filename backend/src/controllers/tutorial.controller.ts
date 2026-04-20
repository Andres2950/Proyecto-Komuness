import { Request, Response} from "express";
import { modelTutorial } from "../models/tutorial.model";

/*
 * Crear un tutorial
 * ENTRADA: nombre y url del tutorial a crear 
 * RESTRICCIONES: url es unico, url y nombre son obligatorios
 * SALIDA: si es exitoso una confirmacion, si no se manda mensaje de error
 * */
export const createTutorial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, url } = req.body;

    if (!nombre?.trim() || !url?.trim()) {
      res.status(400).json({ message: "La url y el nombre son obligatorios" });
      return;
    }

    const nuevoTutorial = new modelTutorial({
      nombre: nombre.trim(),
      url: url.trim(),
    });

    const saved = await nuevoTutorial.save();
    res.status(201).json(saved);
  } catch (error: any) {
    console.error(error);
    
    if (error?.code == 11000) {
        res.status(409).json({ message: "Ya existe un tutorial con esa URL" });
        return;
    }

    res.status(500).json({ message: "Error al crear el tutorial" });
  }
};

/*
 * ENTRADA: id mongo de un tutorial 
 * SALIDA: eliminado del tutorial en la BD
 */
export const deleteTutorial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await modelTutorial.findByIdAndDelete(id);

    res.json({ message: "Tutorial eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el tutorial" });
  }
};

/*
 * ENTRADA: nada :)
 * SALIDA: todos los tutoriales
 * */
export const getTutoriales = async (req: Request, res: Response): Promise<void> => {
  try {
    const tutoriales = await modelTutorial.find();
    res.json({
      data: tutoriales
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los tutoriales" });
  }
};
