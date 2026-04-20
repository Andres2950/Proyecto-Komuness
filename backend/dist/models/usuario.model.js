"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelUsuario = void 0;
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tipoUsuario: { type: Number, required: true }, // 0=super-admin, 1=admin, 2=básico, 3=premium
    codigo: { type: String, required: true },
    fechaVencimientoPremium: { type: Date, required: false }, // Fecha de vencimiento para usuarios premium
    limitePublicaciones: { type: Number, required: false }, // Límite personalizado (opcional)
    plan: {
        type: String,
        enum: ['mensual', 'anual', null],
        default: null,
        required: false
    },
});
exports.modelUsuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
