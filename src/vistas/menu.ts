import { leerTeclado } from '../vistas/lecturaTeclado'

export const menuInstituto= async () => {
    let n: number
    console.log('\n')
    console.log('1.- Introducir instituto')
    console.log('2.- Salvar en BD')
    console.log('3.- Cargar instituto de la BD')
    console.log('4.- Modificar instituto de la BD')
    console.log('5.- Borrar instituto de la BD')
    console.log('6.- Mostrar instituto')   
    console.log('7.- Cálculos del instituto') 
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

export const menuInstituto2 = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Total de personas')
    console.log('2.- Proporción de alumnos por profesor')
    console.log('3.- Proporción de profesores por ciclo')
    console.log('4.- Número de aulas en uso')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}