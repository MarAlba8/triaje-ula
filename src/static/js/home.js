
    class Pila {
        elementos = [];

        push = (elemento) => {
            return this.elementos.push(elemento);
        }
        pop = () => {
            return this.elementos.pop();
        }
        isempty = () => {
            return this.elementos.length === 0;
        }
        empty = () => {
            this.elementos.length = 0;
        }
        size = () => {
            return this.elementos.length;;
        }
        Ver_ultimo = () => {
            return this.elementos[this.elementos.length - 1];

        }

        Pertenece = (elementos) => {
            return this.elementos.includes(elementos);

        }

    }





    var pila_div = new Pila();
    var pila_RadioButtons = new Pila();
    //var pila_textArea = new Pila();


    var pila = new Pila();
    var Data = new Object();
    var InformacionPersonal = new Object();
    var InformacionCovid = [];
    var Preguntas_Triaje = [];


    function MostrarTriaje() {

        document.getElementById("div_Triaje").style.display = "";
        //document.getElementById("div_BotonEmpezar2").style.display = "";

        document.getElementById("div_BotonEmpezar").style.display = "none";


    }
    function ValidacionInforPersonal() {

        // x[i].classList.remove('is-invalid')

        var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;


        document.getElementById("Nombre").classList.remove('is-invalid')
        document.getElementById("Apellido").classList.remove('is-invalid')
        document.getElementById("Cedula").classList.remove('is-invalid')
        document.getElementById("Telefono").classList.remove('is-invalid')
        document.getElementById("Email").classList.remove('is-invalid')



        var Nombre = document.getElementById("Nombre").value;
        var Apellido = document.getElementById("Apellido").value;
        var Cedula = document.getElementById("Cedula").value;
        var Telefono = document.getElementById("Telefono").value;
        var Email = document.getElementById('Email').value;


        if (Nombre.length < 3) {

            document.getElementById("Nombre").classList.add('is-invalid')
            alert("Complete correctamente el campo 'Nombres'")
            return false;


        } else if (Apellido.length < 3) {

            document.getElementById("Apellido").classList.add('is-invalid')
            alert("Complete correctamente el campo 'Apellidos'")
            return false;


        } else if ((Cedula.length < 1) || (Cedula.length > 10)) {

            document.getElementById("Cedula").classList.add('is-invalid')
            alert("El Campo 'Cedula' debe tener los formatos VXXXXXXXX o EXXXXXXXX")
    

            return false;


        } else if (Telefono.length < 2) {

            document.getElementById("Telefono").classList.add('is-invalid')
            alert("Error Campo Telefono: Debe contener el formato 041XXXXXXXX")
            return false;

        } else if ( !(validEmail.test(Email))) {

            document.getElementById("Email").classList.add('is-invalid')
            alert("Error Campo Email: Debe introducir un email con formato valido")
            return false;

        } else {

            console.log("FINISH")
            return true;

        }



    }


    function FunctionInforPersonal() {

    
        if (ValidacionInforPersonal() == true) {

            document.getElementById("Nombre").classList.remove('is-invalid')
            document.getElementById("Apellido").classList.remove('is-invalid')
            document.getElementById("Cedula").classList.remove('is-invalid')
            document.getElementById("Telefono").classList.remove('is-invalid')
            document.getElementById("Email").classList.remove('is-invalid')




            document.getElementById("div_InformacionPersonal").style.display = "none";
            document.getElementById("div_InformacionCovid").style.display = "";

            var targetElm = document.querySelector('#Titulo')  // reference to scroll target
            targetElm.scrollIntoView();

            InformacionPersonal.Nombre = document.getElementById("Nombre").value;

            InformacionPersonal.Apellido = document.getElementById("Apellido").value;
            InformacionPersonal.Cedula = document.getElementById("TipoCedula").value + document.getElementById("Cedula").value;
            InformacionPersonal.Telefono = document.getElementById("Telefono").value;
            InformacionPersonal.Email = document.getElementById("Email").value;

            Data.inf_Personal = InformacionPersonal;

            console.log(InformacionPersonal)
            console.log(Data)
        }
    }


    function FunctionInforCovid() {


            document.getElementById("div_InformacionCovid").style.display = "none";
            document.getElementById("div_InformacionConsulta").style.display = "";

            var targetElm = document.querySelector('#Titulo')  // reference to scroll target
            targetElm.scrollIntoView();


            InformacionCovid.push({
                    Pregunta: "¿Ha sido diagnosticado con COVID-19 en los últimos 15 días?",
                    Respuesta: document.getElementById("Select_Covid_1").value,
                })

            InformacionCovid.push({
                Pregunta: "¿Has estado con alguien que ha tenido COVID-19 en los ultimos dias?",
                Respuesta: document.getElementById("Select_Covid_2").value,
            })

            InformacionCovid.push({
                Pregunta: "Fiebre o escalofríos",
                Respuesta: document.getElementById("Select_Covid_3A").value,
            })

            InformacionCovid.push({
                Pregunta: "Nauseas o vomito",
                Respuesta: document.getElementById("Select_Covid_3B").value,
            })

            InformacionCovid.push({
                Pregunta: "dificultad de respirar / Fatiga",
                Respuesta: document.getElementById("Select_Covid_3C").value,
            })

            InformacionCovid.push({
                Pregunta: "Dolor de garganta",
                Respuesta: document.getElementById("Select_Covid_3D").value,
            })

            InformacionCovid.push({
                Pregunta: "Tos",
                Respuesta: document.getElementById("Select_Covid_3E").value,
            })

            InformacionCovid.push({
                Pregunta: "Perdida del gusto/olfato",
                Respuesta: document.getElementById("Select_Covid_3F").value,
            })




            Data.inf_Covid = InformacionCovid;

            console.log(InformacionCovid)
            console.log(Data)

    }


    /* FUNCIONES DE CANCELAR, RETROCEDER EN FORMULARIOS */

    function FunctionCancelar_1() {

        document.getElementById("div_InformacionPersonal").style.display = "";
        document.getElementById("div_InformacionCovid").style.display = "none";

        delete Data.inf_Personal;
        console.log(Data)
    }

    function FunctionCancelar_2() {

        document.getElementById("div_InformacionCovid").style.display = "";
        document.getElementById("div_InformacionConsulta").style.display = "none";
        ResetRespuestas();
        delete Data.inf_Covid;
        InformacionCovid=[];
        console.log(Data)
    }

    function Enviar() {


        document.getElementById("boton1").style.display = "none";
        document.getElementById("boton2").style.display = "";

        


        console.log(Data)

        /*alert("revisar consola web, DOM \n" + JSON.stringify(Data));*/
        $.ajax({
            type: 'POST',
            url: "/triage/save",
            dataType: 'json',
            data : {
                'request_data': JSON.stringify(Data),
                'csrfmiddlewaretoken': '{{ csrf_token }}',
            } ,
            success : function(json) {
                
                console.log("requested access complete");

                document.getElementById('closeModal').click();

                var SuccessModal = new bootstrap.Modal(document.getElementById('SuccessModal'), {
                keyboard: false
                })

                
                SuccessModal.show()
                document.getElementById("boton2").style.display = "none";
                document.getElementById("boton1").style.display = "";

            },

            error : function(xhr, status, error) {
                console.log(xhr)
                console.log(status)
                console.log(error)

                document.getElementById('ErrorModalLabel').innerHTML='ERROR <i class="bi bi-x-circle-fill"></i>: </br>' +  xhr.responseText;

                //if(xhr.responseText == "Error_email")
                //{
                //    document.getElementById('ErrorModalLabel').innerHTML='ERROR <i class="bi bi-x-circle-fill"></i>: </br>  Correo actualmente en uso por otro paciente';
                //
                //}
                //else{
                //    document.getElementById('ErrorModalLabel').innerHTML='ERROR <i class="bi bi-x-circle-fill"></i>: </br>  xhr.responseText';

               // }

                var ErrorModal = new bootstrap.Modal(document.getElementById('ErrorModal'), {
                keyboard: false
                })

                document.getElementById('closeModal').click();
                ErrorModal.show()
                document.getElementById("boton2").style.display = "none";
                document.getElementById("boton1").style.display = "";
            }




        })
    }

    function Desactivar_Opciones(Div_Actual) {

        var x = document.getElementsByClassName(`${Div_Actual}`);
        //console.log(x)
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].disabled = true;
        }

    }

    function Activar_Opciones(Div_Actual) {

        var x = document.getElementsByClassName(`${Div_Actual}`);
        //console.log(x)
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].disabled = false;
            x[i].checked = false;
        }

    }

    function Activar_Opciones(Div_Actual) {

        var x = document.getElementsByClassName(`${Div_Actual}`);
        //console.log(x)
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].disabled = false;
            x[i].checked = false;
        }

    }


    function Reset_OpcionesTextArea() {

        var x = document.getElementsByClassName(`TextArea_question`);
        //console.log(x)
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].disabled = false;
            x[i].value = "";
            x[i].classList.remove('is-invalid')

        }

    }


    function ResetRespuestas() {

        while (pila_div.size() != 0) {
            aux = pila_div.Ver_ultimo();
            //console.log(aux)
            document.getElementById(`${aux}`).style.display = "none";
            pila_div.pop()


        }

        while (pila_RadioButtons.size() != 0) {
            aux = pila_RadioButtons.Ver_ultimo();
            Activar_Opciones(aux);
            pila_RadioButtons.pop()


        }



        Reset_OpcionesTextArea()
        document.getElementById("Boton_Enviar").style.display = "none";
        Preguntas_Triaje = [];


        var targetElm = document.querySelector('#Titulo')  // reference to scroll target
        targetElm.scrollIntoView();


    }



    var select_1 = document.getElementById('Select_1');
    select_1.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'inlineRadioOptions') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Siente dolor?",
                    Respuesta: target.value,
                });


                Desactivar_Opciones("RadioOptions_1");
                pila_div.push("Select_1_SI");
                pila_RadioButtons.push("RadioOptions_1");


                document.getElementById("Select_1_NO_A").style.display = "none";
                document.getElementById("Select_1_P1").style.display = "";
                //document.getElementById("Select_1_SI").style.display = "";

            } else {


                Preguntas_Triaje.push({
                    Pregunta: "¿Siente dolor?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("RadioOptions_1");
                pila_div.push("Select_1_NO_A");
                pila_RadioButtons.push("RadioOptions_1");

                //document.getElementById("Select_1_SI").style.display = "none";
                document.getElementById("Select_1_P1").style.display = "none";
                document.getElementById("Select_1_NO_A").style.display = "";
            }
        }
    });


    /* ##########  NUEVAS PREGUNTAS ################ */

    var select_1_P1 = document.getElementById('Select_1_P1');
    select_1_P1.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select_1_P1') {

            

            Preguntas_Triaje.push({
                Pregunta: "¿Cuando empezo el dolor?",
                Respuesta: target.value,
            });


            Desactivar_Opciones("Options_Select_1_P1");
            pila_div.push("Select_1_P1");
            pila_RadioButtons.push("Options_Select_1_P1");
            document.getElementById("Select_1_P2").style.display = "";


        }
    });


    var select_1_P2 = document.getElementById('Select_1_P2');
    select_1_P2.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select_1_P2') {

            

            Preguntas_Triaje.push({
                Pregunta: "¿Cual ha sido la intencidad del dolor?",
                Respuesta: target.value,
            });


            Desactivar_Opciones("Options_Select_1_P2");
            pila_div.push("Select_1_P2");
            pila_RadioButtons.push("Options_Select_1_P2");
            document.getElementById("Select_1_SI").style.display = "";

        }
    });


    /*########### fIN NUEVAS PREGUNTAS ################# */

    /* divs se la rama select1_SI */

    var Select_1_SI_Options = document.getElementById('Select_1_SI_Options');
    Select_1_SI_Options.addEventListener('change', ({ target }) => {


            if (target.getAttribute('name') === 'Options_Select1_SI') {


                Preguntas_Triaje.push({
                    Pregunta: "Localizacion: ¿El dolor esta asociacio a..?",
                    Respuesta: target.value,
                });


                if (target.value == "Dientes") {

                    Desactivar_Opciones("Options_Select1_SI");
                    pila_RadioButtons.push("Options_Select1_SI");
                    pila_div.push("Dientes_1");

                    document.getElementById("Dientes_1").style.display = "";


                } else if (target.value == "Encias") {


                    Desactivar_Opciones("Options_Select1_SI");
                    pila_RadioButtons.push("Options_Select1_SI");
                    pila_div.push("Encias_1");

                    document.getElementById("Encias_1").style.display = "";


                } else if (target.value == "Traumatismo") {


                    Desactivar_Opciones("Options_Select1_SI");
                    pila_RadioButtons.push("Options_Select1_SI");
                    pila_div.push("Traumatismo_1");

                    document.getElementById("Traumatismo_1").style.display = "";


                } else if (target.value == "Infeccion") {


                    Desactivar_Opciones("Options_Select1_SI");
                    pila_RadioButtons.push("Options_Select1_SI");
                    pila_div.push("Infeccion_1");

                    document.getElementById("Infeccion_1").style.display = "";


                } else if (target.value == "Paladar") {


                    Desactivar_Opciones("Options_Select1_SI");
                    pila_RadioButtons.push("Options_Select1_SI");

                    Data.PreguntasTriaje = Preguntas_Triaje;
                    Data.ClinicaSugerida = "Estomatología";
                    document.getElementById("Boton_Enviar").style.display = "";


                } else if (target.value == "Imposibilidad") {


                    Desactivar_Opciones("Options_Select1_SI");
                    pila_RadioButtons.push("Options_Select1_SI");

                    Data.PreguntasTriaje = Preguntas_Triaje;
                    Data.ClinicaSugerida = "Integral del Adulto";
                    document.getElementById("Boton_Enviar").style.display = "";


                } else if (target.value == "Extraccion") {


                    Desactivar_Opciones("Options_Select1_SI");
                    pila_RadioButtons.push("Options_Select1_SI");

                    Data.PreguntasTriaje = Preguntas_Triaje;
                    Data.ClinicaSugerida = "Cirugia";
                    document.getElementById("Boton_Enviar").style.display = "";


                }
            }


        

    });


    /* RAMA OPCION DIENTES */

    var Dientes_1 = document.getElementById('Dientes_1');
    Dientes_1.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Dientes_1') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Esta en la ultima muela?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Dientes_1");
                pila_RadioButtons.push("Options_Dientes_1");
                pila_div.push("Dientes_2");                         // El siguiente Divs
                document.getElementById("Dientes_2").style.display = "";



            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Esta en la ultima muela?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Dientes_1");
                pila_RadioButtons.push("Options_Dientes_1");
                pila_div.push("Dientes_3");                         // El siguiente Divs
                document.getElementById("Dientes_3").style.display = "";

            }
        }
    });



    var Dientes_2 = document.getElementById('Dientes_2');
    Dientes_2.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Dientes_2') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Está cubierta por encía?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Dientes_2");
                pila_RadioButtons.push("Options_Dientes_2");

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Cirugia";
                document.getElementById("Boton_Enviar").style.display = "";



            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Está cubierta por encía??",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Dientes_2");
                pila_RadioButtons.push("Options_Dientes_2");
                pila_div.push("Dientes_3");                         // El siguiente Divs
                document.getElementById("Dientes_3").style.display = "";

            }
        }
    });



    var Dientes_3 = document.getElementById('Dientes_3');
    Dientes_3.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Dientes_3') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿El dolor es intenso y/o constante?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Dientes_3");
                pila_RadioButtons.push("Options_Dientes_3");
                pila_div.push("Dientes_4");                         // El siguiente Divs
                document.getElementById("Dientes_4").style.display = "";


            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿El dolor es intenso y/o constante?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Operatoria Dental";

                Desactivar_Opciones("Options_Dientes_3");
                pila_RadioButtons.push("Options_Dientes_3");
                document.getElementById("Boton_Enviar").style.display = "";

            }
        }
    });




    var Dientes_4 = document.getElementById('Dientes_4');
    Dientes_4.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Dientes_4') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Se agudiza con frio, calor o dulce?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Endodoncia";

                Desactivar_Opciones("Options_Dientes_4");
                pila_RadioButtons.push("Options_Dientes_4");
                document.getElementById("Boton_Enviar").style.display = "";


            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Se agudiza con frio, calor o dulce?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Operatoria Dental";

                Desactivar_Opciones("Options_Dientes_4");
                pila_RadioButtons.push("Options_Dientes_4");
                document.getElementById("Boton_Enviar").style.display = "";
            }
        }
    });



    /* RAMA OPCION ENCIAS */

    var Encias_1 = document.getElementById('Encias_1');
    Encias_1.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Encias_1') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Hay una capa blanca sobre la lesion?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Periodoncia";

                Desactivar_Opciones("Options_Encias_1");
                pila_RadioButtons.push("Options_Encias_1");
                document.getElementById("Boton_Enviar").style.display = "";




            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Hay una capa blanca sobre la lesion?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Periodoncia";

                Desactivar_Opciones("Options_Encias_1");
                pila_RadioButtons.push("Options_Encias_1");
                document.getElementById("Boton_Enviar").style.display = "";

            }
        }
    });



    /* RAMA OPCION TRAUMATISMO */

    var Traumatismo_1 = document.getElementById('Traumatismo_1');
    Traumatismo_1.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Traumatismo_1') {

            if (target.value == "Oseo") {

                Preguntas_Triaje.push({
                    Pregunta: "Tipo de Trauma",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Cirugia";


                Desactivar_Opciones("Options_Traumatismo_1");
                pila_RadioButtons.push("Options_Traumatismo_1");
                document.getElementById("Boton_Enviar").style.display = "";


            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Hay una capa blanca sobre la lesion?",
                    Respuesta: target.value,
                });


                Desactivar_Opciones("Options_Traumatismo_1");
                pila_RadioButtons.push("Options_Traumatismo_1");

                pila_div.push("Traumatismo_2");                         // El siguiente Divs
                document.getElementById("Traumatismo_2").style.display = "";

            }
        }
    });



    var Traumatismo_2 = document.getElementById('Traumatismo_2');
    Traumatismo_2.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Traumatismo_2') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Hubo sangrado?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Endodoncia";


                Desactivar_Opciones("Options_Traumatismo_2");
                pila_RadioButtons.push("Options_Traumatismo_2");
                document.getElementById("Boton_Enviar").style.display = "";


            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Hubo sangrado?",
                    Respuesta: target.value,
                });


                Desactivar_Opciones("Options_Traumatismo_2");
                pila_RadioButtons.push("Options_Traumatismo_2");

                pila_div.push("Traumatismo_3");                         // El siguiente Divs
                document.getElementById("Traumatismo_3").style.display = "";

            }
        }
    });




    var Traumatismo_3 = document.getElementById('Traumatismo_3');
    Traumatismo_3.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Traumatismo_3') {

            if (target.value == "Con_ExposicionPulpar") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Perdida de extructura dental?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Endodoncia";


                Desactivar_Opciones("Options_Traumatismo_3");
                pila_RadioButtons.push("Options_Traumatismo_3");
                document.getElementById("Boton_Enviar").style.display = "";


            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Perdida de extructura dental?",
                    Respuesta: target.value,
                });


                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Operatoria Dental";


                Desactivar_Opciones("Options_Traumatismo_3");
                pila_RadioButtons.push("Options_Traumatismo_3");
                document.getElementById("Boton_Enviar").style.display = "";

            }
        }
    });



    /* RAMA OPCION Infeccion */

    var Infeccion_1 = document.getElementById('Infeccion_1');
    Infeccion_1.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Infeccion_1') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Dificultad para abrir la boca o tragar?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Cirugia";

                Desactivar_Opciones("Options_Infeccion_1");
                pila_RadioButtons.push("Options_Infeccion_1");
                document.getElementById("Boton_Enviar").style.display = "";



            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Dificultad para abrir la boca o tragar?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Estomatología";

                Desactivar_Opciones("Options_Infeccion_1");
                pila_RadioButtons.push("Options_Infeccion_1");
                document.getElementById("Boton_Enviar").style.display = "";

            }
        }
    });







    /* divs se la rama select1_NO */

    var select1_NO_A = document.getElementById('Select_1_NO_A');
    select1_NO_A.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_A') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Presenta alguna lesión en tejido blando?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_A");
                pila_RadioButtons.push("Options_Select1_NO_A");

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Estomatología";
                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Desactivar_Opciones("Options_Select1_NO_A");
                pila_div.push("Select_1_NO_B");
                pila_RadioButtons.push("Options_Select1_NO_A");

                Preguntas_Triaje.push({
                    Pregunta: "¿Presenta alguna lesión en tejido blando?",
                    Respuesta: target.value,
                });


                document.getElementById("Select_1_NO_B").style.display = "";



            }
        }
    });



    var select1_NO_B = document.getElementById('Select_1_NO_B');
    select1_NO_B.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_B') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿El motivo de la consulta está asociado al uso de prótesis dental removible?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_B");
                pila_RadioButtons.push("Options_Select1_NO_B");


                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Integral del Adulto";


                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿El motivo de la consulta está asociado al uso de prótesis dental removible?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_B");
                pila_RadioButtons.push("Options_Select1_NO_B");
                pila_div.push("Select_1_NO_C");                         // El siguiente Divs
                document.getElementById("Select_1_NO_C").style.display = "";

            }
        }
    });



    var select1_NO_C = document.getElementById('Select_1_NO_C');
    select1_NO_C.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_C') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Requiere una prótesis dental?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Integral del Adulto";


                Desactivar_Opciones("Options_Select1_NO_C");
                pila_RadioButtons.push("Options_Select1_NO_C");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Requiere una prótesis dental?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_C");
                pila_RadioButtons.push("Options_Select1_NO_C");
                pila_div.push("Select_1_NO_D");                         // El siguiente Divs
                document.getElementById("Select_1_NO_D").style.display = "";

            }
        }
    });



    var select1_NO_D = document.getElementById('Select_1_NO_D');
    select1_NO_D.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_D') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita una extracción dental?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Cirugia";


                Desactivar_Opciones("Options_Select1_NO_D");
                pila_RadioButtons.push("Options_Select1_NO_D");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita una extracción dental?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_D");
                pila_RadioButtons.push("Options_Select1_NO_D");
                pila_div.push("Select_1_NO_E");                         // El siguiente Divs
                document.getElementById("Select_1_NO_E").style.display = "";

            }
        }
    });




    var select1_NO_E = document.getElementById('Select_1_NO_E');
    select1_NO_E.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_E') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita realizar un proceso quirurgico?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Cirugia";


                Desactivar_Opciones("Options_Select1_NO_E");
                pila_RadioButtons.push("Options_Select1_NO_E");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita realizar un proceso quirurgico?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_E");
                pila_RadioButtons.push("Options_Select1_NO_E");
                pila_div.push("Select_1_NO_F");                         // El siguiente Divs
                document.getElementById("Select_1_NO_F").style.display = "";

            }
        }
    });



    var select1_NO_F = document.getElementById('Select_1_NO_F');
    select1_NO_F.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_F') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿El motivo de la consulta está asociado a caries dental?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Operativa Dental";


                Desactivar_Opciones("Options_Select1_NO_F");
                pila_RadioButtons.push("Options_Select1_NO_F");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿El motivo de la consulta está asociado a caries dental?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_F");
                pila_RadioButtons.push("Options_Select1_NO_F");
                pila_div.push("Select_1_NO_G");                         // El siguiente Divs
                document.getElementById("Select_1_NO_G").style.display = "";

            }
        }
    });


    var select1_NO_G = document.getElementById('Select_1_NO_G');
    select1_NO_G.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_G') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita cambiar o reponer una restauración o calza?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Operativa Dental";


                Desactivar_Opciones("Options_Select1_NO_G");
                pila_RadioButtons.push("Options_Select1_NO_G");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita cambiar o reponer una restauración o calza?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_G");
                pila_RadioButtons.push("Options_Select1_NO_G");
                pila_div.push("Select_1_NO_H");                         // El siguiente Divs
                document.getElementById("Select_1_NO_H").style.display = "";

            }
        }
    });


    var select1_NO_H = document.getElementById('Select_1_NO_H');
    select1_NO_H.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_H') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Presenta sangrado al cepillarse?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Periodoncia";


                Desactivar_Opciones("Options_Select1_NO_H");
                pila_RadioButtons.push("Options_Select1_NO_H");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Presenta sangrado al cepillarse?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_H");
                pila_RadioButtons.push("Options_Select1_NO_H");
                pila_div.push("Select_1_NO_I");                         // El siguiente Divs
                document.getElementById("Select_1_NO_I").style.display = "";

            }
        }
    });



    var select1_NO_I = document.getElementById('Select_1_NO_I');
    select1_NO_I.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_I') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Requiere una limpieza dental?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Periodoncia";


                Desactivar_Opciones("Options_Select1_NO_I");
                pila_RadioButtons.push("Options_Select1_NO_I");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Requiere una limpieza dental?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_I");
                pila_RadioButtons.push("Options_Select1_NO_I");
                pila_div.push("Select_1_NO_J");                         // El siguiente Divs
                document.getElementById("Select_1_NO_J").style.display = "";

            }
        }
    });



    var select1_NO_J = document.getElementById('Select_1_NO_J');
    select1_NO_J.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_J') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita realizar un procedimiento estético?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Operativa Dental";


                Desactivar_Opciones("Options_Select1_NO_J");
                pila_RadioButtons.push("Options_Select1_NO_J");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita realizar un procedimiento estético?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_J");
                pila_RadioButtons.push("Options_Select1_NO_J");
                pila_div.push("Select_1_NO_K");                         // El siguiente Divs
                document.getElementById("Select_1_NO_K").style.display = "";

            }
        }
    });



    var select1_NO_K = document.getElementById('Select_1_NO_K');
    select1_NO_K.addEventListener('change', ({ target }) => {

        if (target.getAttribute('name') === 'Options_Select1_NO_K') {

            if (target.value == "si") {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita realizar una revisión y consulta para referir?",
                    Respuesta: target.value,
                });

                Data.PreguntasTriaje = Preguntas_Triaje;
                Data.ClinicaSugerida = "Estomatología";


                Desactivar_Opciones("Options_Select1_NO_K");
                pila_RadioButtons.push("Options_Select1_NO_K");

                document.getElementById("Boton_Enviar").style.display = "";

            } else {

                Preguntas_Triaje.push({
                    Pregunta: "¿Necesita realizar una revisión y consulta para referir?",
                    Respuesta: target.value,
                });

                Desactivar_Opciones("Options_Select1_NO_K");
                pila_RadioButtons.push("Options_Select1_NO_K");
                ResetRespuestas();

            }
        }
    });

