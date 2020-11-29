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
const menu_1 = require("./vistas/menu");
const lecturaTeclado_1 = require("./vistas/lecturaTeclado");
const Instituto_1 = require("./model/Instituto");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let nombre, nAulas, nProfesores, nAlumnos, nCiclos;
    let instituto = new Instituto_1.Instituto("", 0, 0, 0, 0);
    yield setBD(false); // true BD local; false BD Atlas
    do {
        n = yield menu_1.menuInstituto();
        switch (n) {
            case 1:
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre único del instituto');
                nAulas = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el número de aulas del instituto'));
                nProfesores = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el número de profesores del instituto'));
                nAlumnos = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el número de alumnos del instituto'));
                nCiclos = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el número de ciclos del instituto'));
                instituto = new Instituto_1.Instituto(nombre, nAulas, nProfesores, nAlumnos, nCiclos);
                try {
                    instituto.nCiclos = nCiclos;
                }
                catch (error) {
                    console.log(error);
                    instituto = new Instituto_1.Instituto("", 0, 0, 0, 0);
                }
                break;
            case 2:
                yield database_1.db.conectarBD();
                const dSchema = {
                    _nombre: instituto.nombre,
                    _nAulas: instituto.nAulas,
                    _nProfesores: instituto.nProfesores,
                    _nAlumnos: instituto.nAlumnos,
                    _nCiclos: instituto.nCiclos
                };
                const oSchema = new Instituto_1.Institutos(dSchema);
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch 
                // Con el callback de save salta a la siguiente instrucción 
                // mientras se resuelve el callback y se desconecta y sigue el switch
                yield oSchema.save()
                    .then((doc) => console.log('Salvado Correctamente: ' + doc))
                    .catch((err) => console.log('Error: ' + err));
                // concatenando con cadena muestra sólo el mensaje
                yield database_1.db.desconectarBD();
                break;
            case 3:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre único del instituto');
                yield Instituto_1.Institutos.findOne({ _nombre: nombre }, (error, doc) => {
                    if (error)
                        console.log(error);
                    else {
                        if (doc == null)
                            console.log('El instituto no existe');
                        else {
                            console.log('Existe: ' + doc);
                            instituto =
                                new Instituto_1.Instituto(doc._nombre, doc._nAulas, doc._nProfesores, doc._nAlumnos, doc._nCiclos);
                            //alumno.edad = doc._edad
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 4:
                yield database_1.db.conectarBD();
                // Controlamos el error de validación
                // Recordar que hay que poner la opción useFindAndModify: false
                yield Instituto_1.Institutos.findOneAndUpdate({ _nombre: instituto.nombre }, {
                    _nombre: instituto.nombre,
                    _nAulas: instituto.nAulas,
                    _nProfesores: instituto.nProfesores,
                    _nAlumnos: instituto.nAlumnos,
                    _nCiclos: instituto.nCiclos
                }, {
                    runValidators: true // para que se ejecuten las validaciones del Schema
                })
                    .then(() => console.log('Modificado Correctamente'))
                    .catch((err) => console.log('Error: ' + err)); // concatenando con cadena muestra mensaje
                yield database_1.db.desconectarBD();
                break;
            case 5:
                yield database_1.db.conectarBD();
                yield Instituto_1.Institutos.findOneAndDelete({ _nombre: instituto.nombre }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (doc == null)
                            console.log(`No encontrado`);
                        else
                            console.log('Borrado correcto: ' + doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 6:
                console.log(`Nombre: ${instituto.nombre}`);
                console.log(`Número de aulas: ${instituto.nAulas}`);
                console.log(`Número de profesores: ${instituto.nProfesores}`);
                console.log(`Número de alumnos: ${instituto.nAlumnos}`);
                console.log(`Número de ciclos: ${instituto.nCiclos}`);
                break;
            case 7:
                do {
                    n = yield menu_1.menuInstituto2();
                    switch (n) {
                        case 0:
                            console.log('Gracias por usar el CRUD');
                            break;
                        case 1:
                            try {
                                let totalpersonas = instituto.totalpersonas();
                                console.log(`En el instituto ${instituto.nombre} hay un total de ${totalpersonas} personas`);
                            }
                            catch (e) {
                                console.log("No hemos podido calcular el número de personas." + e); //  Con el "+ e" sacamos el error por consola
                            }
                            break;
                        case 2:
                            try {
                                let alumporprofesor = instituto.alumporprofesor();
                                console.log(`Hay una proporción de ${alumporprofesor} alumnos por cada profesor`);
                            }
                            catch (e) {
                                console.log("No ha sido posible calcular la proporción. " + e);
                            }
                            break;
                        case 3:
                            try {
                                let profesporciclo = instituto.profesporciclo();
                                console.log(`Hay una proporción de ${profesporciclo} profesores por cada ciclo`);
                            }
                            catch (e) {
                                console.log("No ha sido posible calcular la proporción. " + e);
                            }
                            break;
                        case 4:
                            try {
                                let aulasusadas = instituto.aulasusadas();
                                console.log(`Se están usando ${aulasusadas} aulas en todo el instituto`);
                            }
                            catch (e) {
                                console.log("No ha sido posible calcular el número de aulas. " + e);
                            }
                            break;
                    }
                } while (n != 0);
                break;
            case 0:
                console.log('\n--ADIÓS--');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'geometria';
    const conexionLocal = `mongodb://localhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'prueba';
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas');
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas');
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.gwsjm.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
