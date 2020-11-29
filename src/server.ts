import { menuInstituto, menuInstituto2 } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
import { Instituto, Institutos, tInstituto} from './model/Instituto'
import { db } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let nombre: string, nAulas: number, nProfesores: number, nAlumnos: number, nCiclos: number
    let instituto: Instituto = new Instituto("",0,0,0,0)


    await setBD(false) // Con "true" nos conectamos a BD local; con "false" a BD Atlas

    do {
        n = await menuInstituto()

        switch(n){
            case 1:
                // En esta opción introducimos nuevos institutos
                nombre = await leerTeclado('Introduzca el nombre único del instituto')
                nAulas =  parseInt( await leerTeclado('Introduzca el número de aulas del instituto'))
                nProfesores =  parseInt( await leerTeclado('Introduzca el número de profesores del instituto'))
                nAlumnos =  parseInt( await leerTeclado('Introduzca el número de alumnos del instituto'))
                nCiclos =  parseInt( await leerTeclado('Introduzca el número de ciclos del instituto'))
                instituto = new Instituto(nombre, nAulas, nProfesores, nAlumnos, nCiclos)
                try {
                    instituto.nCiclos = nCiclos
                }catch(error){
                    console.log(error)
                    instituto = new Instituto("",0,0,0,0)
                }
                break
            case 2:
                // En esta opción guardamos los nuevos institutos en la BD
                await db.conectarBD()
                const dSchema = {
                    _nombre: instituto.nombre,
                    _nAulas: instituto.nAulas,
                    _nProfesores: instituto.nProfesores,
                    _nAlumnos: instituto.nAlumnos,
                    _nCiclos: instituto.nCiclos
                }
                const oSchema = new Institutos(dSchema)
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch
                await oSchema.save()
                .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
                .catch( (err: any) => console.log('Error: '+ err)) 

                await db.desconectarBD()
                break
            case 3:
                // En esta opción cargamos un nuevo instituto desde la BD
                await db.conectarBD()
                nombre = await leerTeclado('Introduzca el nombre único del instituto')

                await Institutos.findOne( {_nombre: nombre}, 
                    (error, doc: any) => {
                        if(error) console.log(error)
                        else{
                            if (doc == null) console.log('El instituto no existe')
                            else {
                                console.log('Existe: '+ doc)
                                instituto = 
                                    new Instituto(doc._nombre, doc._nAulas, doc._nProfesores, doc._nAlumnos, doc._nCiclos)
                            }
                        }
                    } )
                await db.desconectarBD()
                break
            case 4:
                // En esta opción modificamos institutos de la BD
                await db.conectarBD()
                // Controlamos el error de validación
                await Institutos.findOneAndUpdate( 
                    { _nombre: instituto.nombre }, 
                    {
                        _nombre: instituto.nombre,
                        _nAulas: instituto.nAulas,
                        _nProfesores: instituto.nProfesores,
                        _nAlumnos: instituto.nAlumnos,
                        _nCiclos: instituto.nCiclos
                    },
                    {
                        runValidators: true // para que se ejecuten las validaciones del Schema
                    }  
                )                
                .then(() => console.log('Modificado Correctamente') )
                await db.desconectarBD()
                break
            case 5:
                // En esta opción borramos institutos de la BD
                await db.conectarBD()
                await Institutos.findOneAndDelete(
                    { _nombre: instituto.nombre }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No encontrado`)
                            else console.log('Borrado correcto: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            case 6:
                // Se muestra un instituto
                console.log(`Nombre: ${instituto.nombre}`)
                console.log(`Número de aulas: ${instituto.nAulas}`)
                console.log(`Número de profesores: ${instituto.nProfesores}`)
                console.log(`Número de alumnos: ${instituto.nAlumnos}`)
                console.log(`Número de ciclos: ${instituto.nCiclos}`)                           
                break
            case 7:
                // Submenú con otras opciones
                do {
                    n = await menuInstituto2()
                    switch(n){
                     case 0:
                        console.log('Gracias por usar el CRUD')
                        break
                    case 1:
                        try{
                            let totalpersonas = instituto.totalpersonas()
                            console.log(`En el instituto ${instituto.nombre} hay un total de ${totalpersonas} personas`)
                        }catch (e){
                            console.log("No hemos podido calcular el número de personas." + e) //  Con el "+ e" sacamos el error por consola
                        }
                        break
                    case 2:
                        try{
                            let alumporprofesor = instituto.alumporprofesor()
                            console.log(`Hay una proporción de ${alumporprofesor} alumnos por cada profesor`)
                        }catch (e){
                            console.log("No ha sido posible calcular la proporción. " + e)
                        }
                        break
                    case 3:
                        try{
                            let profesporciclo = instituto.profesporciclo()
                            console.log(`Hay una proporción de ${profesporciclo} profesores por cada ciclo`)
                        }catch (e){
                            console.log("No ha sido posible calcular la proporción. " + e)
                        }
                        break
                    case 4:
                        try{
                            let aulasusadas = instituto.aulasusadas()
                            console.log(`Se están usando ${aulasusadas} aulas en todo el instituto`)
                        }catch (e){
                            console.log("No ha sido posible calcular el número de aulas. " + e)
                        }
                        break
                } 
            }while (n != 0);
                break
            case 0:
                // Opción para salir del programa
                console.log('\n--ADIÓS--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    }while (n != 0)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'Proyecto'  // Nombre de la base de datos

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'Institutos'    // Nombre de la colección
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.gwsjm.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

main()