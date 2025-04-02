import Ajv from "ajv";
import addFormats from "ajv-formats";
import schema from "./current.json"; // Asegúrate de que este archivo es el esquema que creaste

// Definición del tipo de datos para la respuesta de la API
export type CurrentWeather = {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  
}

// Inicialización de AJV y adición de formatos (para validar "date-time")
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = ajv.compile(schema);

// Función de validación usando AJV
export const validateCurrentWeather = (data: any): boolean => {
  const valid = validate(data);
  if (!valid) {
    console.error("Errores de validación:", validate.errors);
    return false;
  }
  return true;
};