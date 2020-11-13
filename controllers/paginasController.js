import { Viaje } from '../models/Viaje.js'
import { Testimoniales } from '../models/Testimoniales.js'

const paginaInicio = async (req, res) => {
    //consultar tres viajes del modelo viaje

    const promiseDB = []

    promiseDB.push(Viaje.findAll({ limit:4 }))
    promiseDB.push(Testimoniales.findAll({limit:4}))

    try {

        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado [1]
         }); 

    } catch (error) {
        console.log(error)
    }
    
   


}

const paginaNosotros = (req, res) => {
    
    res.render('nosotros', {
       pagina: 'Nosotros'
    }); 
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimonios = await Testimoniales.findAll()

        res.render('testimoniales', {
            pagina: 'testimonialestestimoniales',
            testimonios
         }); 
         
    } catch (error) {
        console.log(error)
    }
   
   
    
}


const paginaDetalleViaje = async (req, res) => {
    
    const { slug } = req.params;

    try {

        const viaje = await Viaje.findOne( { where : {slug: slug} } )

        console.log(viaje)

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })

    } catch (error) {
        console.log(error)    
    }
    
}




const paginaViajes = async (req, res) => {

    //CONSULTAR BD
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes', {
        pagina: 'viajes',
        viajes
    });
}





export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaDetalleViaje
}