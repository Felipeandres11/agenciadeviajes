
import { Testimoniales } from '../models/Testimoniales.js'

const guardarTestimoniales = async (req,res) => {
 
    //Validar...
    console.log(req.body)

    const { nombre, correo, mensaje } = req.body

    const errores = [];


    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre esta vacío'})
    }

    if(correo.trim() === '') {
        errores.push({mensaje: 'El correo esta vacío'})
    }

    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje esta vacío'})
    }

    if(errores.length > 0){
        //CONSULTAR TESTIMONIOS
        const testimonios = await Testimoniales.findAll()

        //Mostrar la vista con errores

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        })
    }else {
        //ALMACENAR EN LA BD 
        console.log('hola')
        try {
            const testimonios = await Testimoniales.findAll()

            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            })

            res.render('testimoniales', {
                pagina: 'Testimoniales',
                exito: 'Su testimonio quedo almacenado en nuestra base de datos',
                testimonios
            })

        } catch (error) {
            console.log(error)
        }
    }
}


export  {
    guardarTestimoniales
}