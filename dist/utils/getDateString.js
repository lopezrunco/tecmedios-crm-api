"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = void 0;
const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];
const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];
const getDateString = (timestamp) => {
    const date = new Date(timestamp);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${day} de ${month} de ${year}, ${hours}:${minutes} hs.`;
};
exports.getDateString = getDateString;
//# sourceMappingURL=getDateString.js.map