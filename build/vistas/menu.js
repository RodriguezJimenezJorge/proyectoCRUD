"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuInstituto2 = exports.menuInstituto = void 0;
const lecturaTeclado_1 = require("../vistas/lecturaTeclado");
exports.menuInstituto = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Introducir instituto');
    console.log('2.- Salvar en BD');
    console.log('3.- Cargar instituto de la BD');
    console.log('4.- Modificar instituto de la BD');
    console.log('5.- Borrar instituto de la BD');
    console.log('6.- Mostrar instituto');
    console.log('7.- Cálculos del instituto');
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
exports.menuInstituto2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Total de personas');
    console.log('2.- Proporción de alumnos por profesor');
    console.log('3.- Proporción de profesores por ciclo');
    console.log('4.- Número de aulas en uso');
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
