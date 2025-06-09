const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Importar todos los schemas
const Paciente = require('./models/pacientes/pacienteSchema');
const Prestaciones = require('./models/prestaciones/prestacionesSchema');
const Secretaria = require('./models/secretaria/secretariaSchema');
const Tratamiento = require('./models/tratamientos/tratamientosSchema');
const Usuario = require('./models/usuario/usuarioSchema');
const Atencion = require('./models/atenciones/atencionesSchema');
const Cita = require('./models/cita/citaSchema');
const HistoriaClinica = require('./models/historiaClinica/historiaClinicaSchema');
const Medico = require('./models/medicos/medicoSchema');
const Odontograma = require('./models/odontograma/odontogramaSchema');

// URI de conexión
const mongoAtlasUri = "mongodb://lambda2:SamsungTV@179.43.118.101:27018/demo-odontocare?authSource=admin";

// Función principal
async function cargarDatosDemo() {
    try {
        // Conectar a MongoDB
        await mongoose.connect(mongoAtlasUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Conectado a MongoDB');

        // Limpiar colecciones existentes (opcional)
        console.log('🧹 Limpiando colecciones existentes...');
        await Promise.all([
            Paciente.deleteMany({}),
            Prestaciones.deleteMany({}),
            Secretaria.deleteMany({}),
            Tratamiento.deleteMany({}),
            Usuario.deleteMany({}),
            Atencion.deleteMany({}),
            Cita.deleteMany({}),
            HistoriaClinica.deleteMany({}),
            Medico.deleteMany({}),
            Odontograma.deleteMany({})
        ]);

        // 1. Crear Tratamientos
        console.log('📋 Creando tratamientos...');
        const tratamientos = await Tratamiento.insertMany([
            { nombre: 'Limpieza Dental', descripcion: 'Limpieza profunda con ultrasonido', monto: 15000 },
            { nombre: 'Extracción Simple', descripcion: 'Extracción de pieza dental simple', monto: 25000 },
            { nombre: 'Extracción Compleja', descripcion: 'Extracción de muela de juicio o pieza compleja', monto: 45000 },
            { nombre: 'Empaste Simple', descripcion: 'Obturación con resina en cara simple', monto: 18000 },
            { nombre: 'Empaste Compuesto', descripcion: 'Obturación con resina en múltiples caras', monto: 28000 },
            { nombre: 'Endodoncia', descripcion: 'Tratamiento de conducto', monto: 85000 },
            { nombre: 'Corona Porcelana', descripcion: 'Corona de porcelana sobre metal', monto: 120000 },
            { nombre: 'Implante Dental', descripcion: 'Implante de titanio con corona', monto: 250000 },
            { nombre: 'Ortodoncia - Brackets', descripcion: 'Tratamiento completo de ortodoncia', monto: 380000 },
            { nombre: 'Blanqueamiento', descripcion: 'Blanqueamiento dental con luz LED', monto: 35000 },
            { nombre: 'Prótesis Removible', descripcion: 'Prótesis dental parcial removible', monto: 95000 },
            { nombre: 'Consulta General', descripcion: 'Consulta y revisión general', monto: 8000 }
        ]);

        // 2. Crear Médicos
        console.log('👨‍⚕️ Creando médicos...');
        const medicos = await Medico.insertMany([
            {
                nombre: 'juan carlos rodriguez',
                email: 'jrodriguez@odontoclinic.com',
                especialidad: 'odontología general',
                celular: '1145678901',
                nMatricula: 'MP12345',
                clave: 'clinica2024'
            },
            {
                nombre: 'maria fernanda gomez',
                email: 'mgomez@odontoclinic.com',
                especialidad: 'endodoncia',
                celular: '1156789012',
                nMatricula: 'MP23456',
                clave: 'endo2024'
            },
            {
                nombre: 'pablo martinez',
                email: 'pmartinez@odontoclinic.com',
                especialidad: 'cirugía maxilofacial',
                celular: '1167890123',
                nMatricula: 'MP34567',
                clave: 'cirugia2024'
            },
            {
                nombre: 'laura sanchez',
                email: 'lsanchez@odontoclinic.com',
                especialidad: 'ortodoncia',
                celular: '1178901234',
                nMatricula: 'MP45678',
                clave: 'orto2024'
            }
        ]);

        // 3. Crear Secretarias
        console.log('👩‍💼 Creando secretarias...');
        const secretarias = await Secretaria.insertMany([
            {
                nombre: 'ana lucia perez',
                email: 'aperez@odontoclinic.com',
                celular: '1134567890'
            },
            {
                nombre: 'carla mendez',
                email: 'cmendez@odontoclinic.com',
                celular: '1145678901'
            }
        ]);

        // 4. Crear Usuarios del sistema
        console.log('👤 Creando usuarios del sistema...');
        const salt = await bcrypt.genSalt(10);
        const usuarios = await Usuario.insertMany([
            // Admin
            {
                email: 'admin@odontoclinic.com',
                password: await bcrypt.hash('admin2024', salt),
                rol: 'admin'
            },
            // Odontólogos
            {
                email: 'jrodriguez@odontoclinic.com',
                password: await bcrypt.hash('clinica2024', salt),
                rol: 'odontologo'
            },
            {
                email: 'mgomez@odontoclinic.com',
                password: await bcrypt.hash('endo2024', salt),
                rol: 'odontologo'
            },
            {
                email: 'pmartinez@odontoclinic.com',
                password: await bcrypt.hash('cirugia2024', salt),
                rol: 'odontologo'
            },
            {
                email: 'lsanchez@odontoclinic.com',
                password: await bcrypt.hash('orto2024', salt),
                rol: 'odontologo'
            },
            // Secretarias
            {
                email: 'aperez@odontoclinic.com',
                password: await bcrypt.hash('secretaria2024', salt),
                rol: 'secretaria'
            },
            {
                email: 'cmendez@odontoclinic.com',
                password: await bcrypt.hash('secretaria2024', salt),
                rol: 'secretaria'
            }
        ]);

        // 5. Crear Historias Clínicas
        console.log('📁 Creando historias clínicas...');
        const historiasClinicas = await HistoriaClinica.insertMany([
            {
                alergia: 'Penicilina',
                padeceEnfermedad: 'Hipertensión arterial',
                esPacienteCardiaco: true,
                tomaMedicacion: 'Enalapril 10mg diario',
                estadoActualBoca: 'Gingivitis leve, caries en pieza 36',
                anotacionesMedico: 'Paciente requiere profilaxis antibiótica'
            },
            {
                alergia: 'Ninguna',
                padeceEnfermedad: 'Diabetes tipo 2',
                esPacienteCardiaco: false,
                tomaMedicacion: 'Metformina 850mg',
                estadoActualBoca: 'Periodontitis moderada',
                anotacionesMedico: 'Control glucémico antes de procedimientos'
            },
            {
                alergia: 'Látex',
                padeceEnfermedad: 'Ninguna',
                esPacienteCardiaco: false,
                tomaMedicacion: 'Ninguna',
                estadoActualBoca: 'Buena higiene, apiñamiento dental',
                anotacionesMedico: 'Candidata para ortodoncia'
            },
            {
                alergia: 'Ninguna',
                padeceEnfermedad: 'Asma',
                esPacienteCardiaco: false,
                tomaMedicacion: 'Salbutamol inhalador',
                estadoActualBoca: 'Múltiples caries, higiene deficiente',
                anotacionesMedico: 'Requiere educación en higiene bucal'
            },
            {
                alergia: 'Anestésicos locales',
                padeceEnfermedad: 'Ninguna',
                esPacienteCardiaco: false,
                tomaMedicacion: 'Anticonceptivos orales',
                estadoActualBoca: 'Buen estado general',
                anotacionesMedico: 'Usar anestesia sin epinefrina'
            }
        ]);

        // 6. Crear Pacientes
        console.log('🦷 Creando pacientes...');
        const pacientes = await Paciente.insertMany([
            {
                nombre: 'roberto carlos mendez',
                dni: '30456789',
                telefono: '1123456789',
                areaCode: '+54',
                mail: 'rmendez@gmail.com',
                historiaClinica: historiasClinicas[0]._id
            },
            {
                nombre: 'sofia alejandra torres',
                dni: '35678901',
                telefono: '1134567890',
                areaCode: '+54',
                mail: 'storres@hotmail.com',
                historiaClinica: historiasClinicas[1]._id
            },
            {
                nombre: 'valentina lopez',
                dni: '40123456',
                telefono: '1145678901',
                areaCode: '+54',
                mail: 'vlopez@yahoo.com',
                historiaClinica: historiasClinicas[2]._id
            },
            {
                nombre: 'martin eduardo garcia',
                dni: '28901234',
                telefono: '1156789012',
                areaCode: '+54',
                mail: 'mgarcia@gmail.com',
                historiaClinica: historiasClinicas[3]._id
            },
            {
                nombre: 'luciana belen fernandez',
                dni: '38765432',
                telefono: '1167890123',
                areaCode: '+54',
                mail: 'lfernandez@outlook.com',
                historiaClinica: historiasClinicas[4]._id
            },
            {
                nombre: 'diego armando silva',
                dni: '25678901',
                telefono: '1178901234',
                areaCode: '+54',
                mail: null
            },
            {
                nombre: 'camila andrea ruiz',
                dni: '42345678',
                telefono: '1189012345',
                areaCode: '+54',
                mail: 'cruiz@gmail.com'
            },
            {
                nombre: 'fernando jose diaz',
                dni: '31234567',
                telefono: '1190123456',
                areaCode: '+54',
                mail: null
            },
            {
                nombre: 'natalia romero',
                dni: '37890123',
                telefono: '1101234567',
                areaCode: '+54',
                mail: 'nromero@hotmail.com'
            },
            {
                nombre: 'gabriel herrera',
                dni: '29012345',
                telefono: '1112345678',
                areaCode: '+54',
                mail: 'gherrera@yahoo.com'
            }
        ]);

        // 7. Crear Prestaciones y Pagos
        console.log('💰 Creando prestaciones y pagos...');
        const fechaActual = new Date();
        const hace3Meses = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 3, fechaActual.getDate());
        const hace2Meses = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 2, fechaActual.getDate());
        const hace1Mes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, fechaActual.getDate());

        const prestaciones = await Prestaciones.insertMany([
            // Prestación pagada completa
            {
                pacienteId: pacientes[0]._id,
                tratamientoId: tratamientos[0]._id, // Limpieza
                precio: 15000,
                pagos: [{
                    monto: 15000,
                    fecha: hace2Meses,
                    odontologoId: medicos[0]._id.toString(),
                    nombreOdontologo: 'juan carlos rodriguez'
                }],
                creadoPor: medicos[0]._id.toString(),
                nombreCreador: 'juan carlos rodriguez'
            },
            // Prestación con pagos parciales
            {
                pacienteId: pacientes[1]._id,
                tratamientoId: tratamientos[5]._id, // Endodoncia
                precio: 85000,
                pagos: [
                    {
                        monto: 30000,
                        fecha: hace1Mes,
                        odontologoId: medicos[1]._id.toString(),
                        nombreOdontologo: 'maria fernanda gomez'
                    },
                    {
                        monto: 25000,
                        fecha: new Date(),
                        odontologoId: medicos[1]._id.toString(),
                        nombreOdontologo: 'maria fernanda gomez'
                    }
                ],
                creadoPor: medicos[1]._id.toString(),
                nombreCreador: 'maria fernanda gomez'
            },
            // Prestación sin pagos
            {
                pacienteId: pacientes[2]._id,
                tratamientoId: tratamientos[8]._id, // Ortodoncia
                precio: 380000,
                pagos: [],
                creadoPor: medicos[3]._id.toString(),
                nombreCreador: 'laura sanchez'
            },
            // Más prestaciones...
            {
                pacienteId: pacientes[3]._id,
                tratamientoId: tratamientos[3]._id, // Empaste Simple
                precio: 18000,
                pagos: [{
                    monto: 18000,
                    fecha: hace1Mes,
                    odontologoId: medicos[0]._id.toString(),
                    nombreOdontologo: 'juan carlos rodriguez'
                }],
                creadoPor: medicos[0]._id.toString(),
                nombreCreador: 'juan carlos rodriguez'
            }
        ]);

        // 8. Crear Citas
        console.log('📅 Creando citas...');
        const mañana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + 1, 10, 0);
        const pasadoMañana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + 2, 15, 30);
        const enUnaSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + 7, 11, 0);

        const citas = await Cita.insertMany([
            {
                pacienteId: pacientes[0]._id,
                medicoId: medicos[0]._id,
                fecha: mañana,
                motivo: 'Control post-limpieza',
                estado: 'pendiente',
                notas: 'Revisar estado de encías',
                monto: 8000
            },
            {
                pacienteId: pacientes[1]._id,
                medicoId: medicos[1]._id,
                fecha: pasadoMañana,
                motivo: 'Continuación tratamiento de conducto',
                estado: 'pendiente',
                notas: 'Segunda sesión de endodoncia',
                monto: 0
            },
            {
                pacienteId: pacientes[2]._id,
                medicoId: medicos[3]._id,
                fecha: enUnaSemana,
                motivo: 'Colocación de brackets',
                estado: 'pendiente',
                notas: 'Traer radiografías panorámicas',
                monto: 100000
            },
            // Citas completadas
            {
                pacienteId: pacientes[3]._id,
                medicoId: medicos[0]._id,
                fecha: hace1Mes,
                motivo: 'Empaste molar',
                estado: 'completada',
                notas: 'Empaste realizado sin complicaciones',
                monto: 18000
            },
            {
                pacienteId: pacientes[4]._id,
                medicoId: medicos[2]._id,
                fecha: hace2Meses,
                motivo: 'Extracción muela de juicio',
                estado: 'completada',
                notas: 'Extracción exitosa, control en 7 días',
                monto: 45000
            }
        ]);

        // 9. Crear Atenciones
        console.log('📝 Creando atenciones...');
        const atenciones = await Atencion.insertMany([
            {
                paciente: pacientes[0]._id,
                fecha: hace2Meses,
                notaDelDia: 'Se realizó limpieza dental completa con ultrasonido. Paciente presenta gingivitis leve. Se recomienda mejorar técnica de cepillado y uso de hilo dental diario.',
                profesional: 'juan carlos rodriguez'
            },
            {
                paciente: pacientes[1]._id,
                fecha: hace1Mes,
                notaDelDia: 'Primera sesión de endodoncia en pieza 26. Se realizó apertura cameral y limpieza de conductos. Paciente tolera bien el procedimiento. Se cita para segunda sesión.',
                profesional: 'maria fernanda gomez'
            },
            {
                paciente: pacientes[3]._id,
                fecha: hace1Mes,
                notaDelDia: 'Empaste con resina en pieza 36, cara oclusal. Se eliminó caries y se aplicó base protectora. Oclusión verificada y ajustada.',
                profesional: 'juan carlos rodriguez'
            },
            {
                paciente: pacientes[4]._id,
                fecha: hace2Meses,
                notaDelDia: 'Extracción de tercer molar inferior derecho (48) impactado. Procedimiento sin complicaciones. Se prescribe amoxicilina 500mg c/8h por 7 días e ibuprofeno 400mg c/8h.',
                profesional: 'pablo martinez'
            }
        ]);

        // 10. Crear Odontogramas
        console.log('🦷 Creando odontogramas...');
        const odontogramas = await Odontograma.insertMany([
            {
                idPaciente: pacientes[0]._id,
                dientes: [
                    {
                        numeroDiente: '16',
                        superficie: 'central',
                        tratamiento: 'Caries',
                        origen: 'propio',
                        isPrimary: true,
                        notas: 'Caries oclusal profunda'
                    },
                    {
                        numeroDiente: '36',
                        superficie: 'central',
                        tratamiento: 'Arreglo',
                        origen: 'propio',
                        isPrimary: false,
                        notas: 'Empaste realizado'
                    },
                    {
                        numeroDiente: '11',
                        superficie: 'superior',
                        tratamiento: 'Arreglo filtrado',
                        origen: 'otro',
                        isPrimary: false,
                        notas: 'Revisar filtración mesial'
                    }
                ]
            },
            {
                idPaciente: pacientes[1]._id,
                dientes: [
                    {
                        numeroDiente: '26',
                        superficie: 'completo',
                        tratamiento: 'T.C',
                        origen: 'propio',
                        isPrimary: true,
                        notas: 'Endodoncia en proceso'
                    },
                    {
                        numeroDiente: '47',
                        superficie: 'completo',
                        tratamiento: 'Corona',
                        origen: 'otro',
                        isPrimary: false
                    }
                ]
            },
            {
                idPaciente: pacientes[3]._id,
                dientes: [
                    {
                        numeroDiente: '36',
                        superficie: 'central',
                        tratamiento: 'Arreglo',
                        origen: 'propio',
                        isPrimary: false,
                        notas: 'Empaste oclusal reciente'
                    },
                    {
                        numeroDiente: '46',
                        superficie: 'central',
                        tratamiento: 'Caries',
                        origen: 'propio',
                        isPrimary: true,
                        notas: 'Caries incipiente'
                    }
                ]
            }
        ]);

        console.log('✅ Datos de demostración cargados exitosamente!');
        
        // Mostrar resumen
        console.log('\n📊 RESUMEN DE DATOS CARGADOS:');
        console.log(`   - ${medicos.length} Médicos`);
        console.log(`   - ${secretarias.length} Secretarias`);
        console.log(`   - ${usuarios.length} Usuarios del sistema`);
        console.log(`   - ${pacientes.length} Pacientes`);
        console.log(`   - ${historiasClinicas.length} Historias Clínicas`);
        console.log(`   - ${tratamientos.length} Tratamientos`);
        console.log(`   - ${prestaciones.length} Prestaciones`);
        console.log(`   - ${citas.length} Citas`);
        console.log(`   - ${atenciones.length} Atenciones`);
        console.log(`   - ${odontogramas.length} Odontogramas`);
        
        console.log('\n🔐 USUARIOS DE PRUEBA:');
        console.log('   Admin: admin@odontoclinic.com / admin2024');
        console.log('   Odontólogo: jrodriguez@odontoclinic.com / clinica2024');
        console.log('   Secretaria: aperez@odontoclinic.com / secretaria2024');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        // Cerrar conexión
        await mongoose.connection.close();
        console.log('\n👋 Conexión cerrada');
    }
}

// Ejecutar el script
cargarDatosDemo();