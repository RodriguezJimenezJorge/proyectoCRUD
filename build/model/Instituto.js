"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Institutos = exports.Instituto = void 0;
const mongoose_1 = require("mongoose");
class Instituto {
    constructor(_nombre, _nAulas, _nProfesores, _nAlumnos, _nCiclos) {
        this._nombre = _nombre;
        this._nAulas = _nAulas;
        this._nProfesores = _nProfesores;
        this._nAlumnos = _nAlumnos;
        //this._nCiclos = _nCiclos
    }
    get nombre() {
        return this._nombre;
    }
    get nAulas() {
        return this._nAulas;
    }
    get nProfesores() {
        return this._nProfesores;
    }
    get nAlumnos() {
        return this._nAlumnos;
    }
    get nCiclos() {
        return this._nCiclos;
    }
    set nCiclos(_nCiclos) {
        /*
            Si el centro tiene menos de 5 ciclos
            levantamos una excepción con throw y su mensaje
            En otro caso asignamos el número de ciclos al centro
        */
        if (_nCiclos < 5) {
            throw "Número de ciclos incorrecto, no puede haber menos de 5";
        }
        this._nCiclos = _nCiclos;
    }
    /*
    Si el método no puede hacer su trabajo levanta una excepción con throw
    y se interrumpe su ejecución en ese punto
    */
    totalpersonas() {
        let totalpersonas;
        totalpersonas = this._nProfesores + this._nAlumnos;
        if (totalpersonas < 1) {
            throw "No hay nadie en el instituto";
        }
        return totalpersonas;
    }
    alumporprofesor() {
        let alumporprofesor;
        alumporprofesor = Math.trunc(this._nAlumnos / this._nProfesores);
        if (alumporprofesor <= 5) {
            throw "No puede haber menos de 5 alumnos por profesor";
        }
        return alumporprofesor;
    }
    profesporciclo() {
        let profesporciclo;
        profesporciclo = Math.trunc(this._nProfesores / this._nCiclos);
        if (profesporciclo < 1) {
            throw "No puede haber menos de 1 profesor por cada ciclo";
        }
        return profesporciclo;
    }
    aulasusadas() {
        let aulasusadas;
        /* Suponemos que caben 20 alumnos en cada clase y calculamos
        el número de aulas en uso con los alumnos que hay */
        aulasusadas = Math.trunc(this._nAlumnos / 20);
        if (aulasusadas > this._nAulas) {
            throw "No se pueden usar más aulas de las que hay";
        }
        return aulasusadas;
    }
}
exports.Instituto = Instituto;
// Definimos el Schema
const institutoSchema = new mongoose_1.Schema({
    _nombre: {
        type: String,
        unique: true
    },
    _nAulas: Number,
    _nProfesores: {
        type: Number,
        min: 5,
        max: 100
    },
    _nAlumnos: {
        type: Number,
        min: 100,
    },
    _nCiclos: {
        type: Number,
        max: 30
    }
});
// La colección de la BD: institutos
exports.Institutos = mongoose_1.model('institutos', institutoSchema);