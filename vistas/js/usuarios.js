
//************************************************************
// 
//  SCRIPT PARA AGREGAR USUARIOS
// 
//************************************************************/

$(document).on("change", "#selectRol" , function() {
    var idRol = $(this).val();
    console.log(idRol);
    // si el rol es aprendiz, mostrar los inputs de ficha y sede
    if (idRol == 6) {
        $("#sede").removeClass("d-none");
        $("#selectSede").prop("required", true);
        $("#id_ficha").prop("required", true);
        // $("#ficha").removeClass("d-none");
    }
    else {
        $("#sede").addClass("d-none");
        $("#ficha").addClass("d-none");
        $("#selectSede").removeAttr("required");
        $("#id_ficha").removeAttr("required");
        
        // $("#ficha").addClass("d-none");
    }
});

$(document).on("change", "#selectSede", function() {
    var idSede = $(this).val();
    console.log("Sede seleccionada:", idSede);

    // Verifica si se seleccionó una sede válida
    if (!idSede) {
        console.warn("No se seleccionó una sede válida.");
        $("#id_ficha").empty().append('<option value="">Seleccione una ficha</option>');
        $("#ficha").addClass("d-none");
        return;
    }

    var datos = new FormData();
    datos.append("idSede", idSede);

    // Realiza una petición AJAX para obtener las fichas de la sede seleccionada
    $.ajax({
        url: "ajax/fichas.ajax.php", // Archivo PHP que devolverá las fichas
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta) {
            // console.log("Fichas obtenidas:", respuesta);

            var fichaSelect = $("#id_ficha");
            fichaSelect.empty();
            // console.log("registros: ",      respuesta[0]);


            // Verifica si se recibieron fichas
            if (!respuesta || respuesta.length === 0 || respuesta[0] == null || respuesta[0] == undefined) {
                console.warn("No se encontraron fichas para la sede seleccionada.");
                $("#id_ficha").empty().append('<option value="">No hay fichas disponibles</option>');
                $("#ficha").addClass("d-none");
            }else if (Array.isArray(respuesta) && respuesta.length > 0) {  //Se se reciben varias fichas
                // console.log("Respuesta es un array y tiene elementos:", respuesta);
                fichaSelect.append('<option value="">Ficha</option>');
                // Agrega las nuevas opciones al select de ficha
                respuesta.forEach(function(ficha) {
                    fichaSelect.append('<option value="' + ficha.id_ficha + '">' + ficha.codigo + '</option>');
                });
                $("#ficha").removeClass("d-none");
            }else {  //Se recibe una sola ficha
                // console.log("Respuesta no es un array o tiene un solo elemento:", respuesta);
                fichaSelect.append('<option value="' + respuesta["id_ficha"] + '">' + respuesta["codigo"] + '</option>');
                $("#nombre_programa").prop("placeholder", respuesta["descripcion"]);
                $("#ficha").removeClass("d-none");
            }      
        },
        error: function(error) {
            console.error("Error al obtener las fichas:", error);
            // Manejo de error: Limpia el select y oculta el contenedor
            $("#id_ficha").empty().append('<option value="">Error al cargar fichas</option>');
            $("#ficha").addClass("d-none");
        }
    });
});


// ======================================
// PREVISUALIZACIÓN DE IMAGEN (EDITAR PERFIL)
// ======================================

function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('vistaPreviaFoto');
    const file = input.files[0];

    // Validar tipo y tamaño de archivo
    if (file) {
        if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El archivo debe ser una imagen JPG o PNG'
            });
            input.value = '';
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La imagen no debe superar los 2MB'
            });
            input.value = '';
            return;
        }

        // Mostrar vista previa
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}


//************************************************************
// 
//  SCRIPT PARA EDITAR USUARIOS
// 
//************************************************************/

$(document).on("change", "#selectEditRolUsuario" , function() {
    var idRol = $(this).val();
    console.log(idRol);
    // si el rol es aprendiz, mostrar los inputs de ficha y sede
    if (idRol == 6) {
        $("#editSede").removeClass("d-none");
        $("#selectEditSede").prop("required", true);
        $("#selectEditIdFicha").prop("required", true);
        // $("#ficha").removeClass("d-none");
    }
    else {
        $("#editSede").addClass("d-none");
        $("#EditFicha").addClass("d-none");
        $("#selectEditSede").removeAttr("required");
        $("#selectEditIdFicha").removeAttr("required");
        
        // $("#ficha").addClass("d-none");
    }
})

$(document).on("change", "#selectEditSede", function() {

    var idSede = $(this).val();
    // var inicial = $(this).attr("inicial");

    console.log("Sede a editar seleccionada:", idSede);


    var datos = new FormData();
    datos.append("idSede", idSede);

    // Realiza una petición AJAX para obtener las fichas de la sede seleccionada
    $.ajax({
        url: "ajax/fichas.ajax.php", // Archivo PHP que devolverá las fichas
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta) {
            console.log("Fichas obtenidas:", respuesta);

            var fichaSelect = $("#selectEditIdFicha");
            fichaSelect.empty();
             

            
            // Verifica si se recibieron fichas
            if (!respuesta || respuesta.length === 0 || respuesta[0] == null || respuesta[0] == undefined) {
                console.warn("No se encontraron fichas para la sede seleccionada.");
                $("#selectEditIdFicha").empty().append('<option value="">No hay fichas disponibles</option>');
                  Toast.fire({
                    icon: 'error',
                    title: 'No hay fichas disponibles para la sede seleccionada.'
                  }); 
                $("#EditFicha").addClass("d-none");
            }else if (Array.isArray(respuesta) && respuesta.length > 0) {  //Se se reciben varias fichas
                // Agrega las nuevas opciones al select de ficha
                fichaSelect.append('<option value="">Ficha</option>');
                $("#nombreEditPrograma").prop("placeholder", "Programa");
                respuesta.forEach(function(ficha) {
                    fichaSelect.append('<option value="' + ficha.id_ficha + '">' + ficha.codigo + '</option>');
                });
                $("#EditFicha").removeClass("d-none");
            }else {  //Se recibe una sola ficha
                // console.log("Respuesta no es un array o tiene un solo elemento:", respuesta);
                fichaSelect.append('<option value="' + respuesta["id_ficha"] + '">' + respuesta["codigo"] + '</option>');
                $("#nombreEditPrograma").prop("placeholder", respuesta["descripcion"]);
                $("#EditFicha").removeClass("d-none");
            }      
            $("#selectEditSede").attr("inicial", "false");
        },
        error: function(error) {
            console.error("Error al obtener las fichas:", error);
            // Manejo de error: Limpia el select y oculta el contenedor
            $("#selectEditIdFicha").empty().append('<option value="">Error al cargar fichas</option>');
            $("#EditFicha").addClass("d-none");
        }
    });
})


$(document).on("change", "#id_ficha", function() {
    var idFicha = $(this).val();
    console.log("Ficha seleccionada:", idFicha);
    data = new FormData();
    data.append("idFicha", idFicha);
    // Realiza una petición AJAX para obtener los datos de la ficha seleccionada
    $.ajax({
        url: "ajax/fichas.ajax.php", // Archivo PHP que devolverá los datos de la ficha
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta) {
            // console.log("Datos de la ficha:", respuesta);
            $("#nombre_programa").prop("placeholder", respuesta["descripcion"]);
            // Aquí puedes realizar cualquier acción adicional que necesites con los datos de la ficha
        },
        error: function(error) {
            console.error("Error al obtener los datos de la ficha:", error);
            // Manejo de error
        }
    });    
})


$(document).on("change", "#selectEditIdFicha", function() {
    var idFicha = $(this).val();
    console.log("Ficha seleccionada:", idFicha);
    data = new FormData();
    data.append("idFicha", idFicha);
    // Realiza una petición AJAX para obtener los datos de la ficha seleccionada
    $.ajax({
        url: "ajax/fichas.ajax.php", // Archivo PHP que devolverá los datos de la ficha
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta) {
            // console.log("Datos de la ficha:", respuesta);
            $("#nombreEditPrograma").prop("placeholder", respuesta["descripcion"]);
        },
        error: function(error) {
            console.error("Error al obtener los datos de la ficha:", error);
            // Manejo de error
        }
    });    
})

$(document).on("click", ".btnEditarUsuario", function() {
    var idUsuario = $(this).attr("idUsuario");
    var datos = new FormData();
    datos.append("idUsuario", idUsuario);
    $.ajax({
        url: "ajax/usuarios.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta) {
            console.log("Usuario", respuesta);
            $("#idEditUsuario").val(respuesta["id_usuario"]);
            $("#editNombre").val(respuesta["nombre"]);
            $("#editApellido").val(respuesta["apellido"]);
            $("#editTipoDocumento").val(respuesta["tipo_documento"]);
            $("#editTipoDocumento").html(respuesta["tipo_documento"]);
            $("#editNumeroDocumento").val(respuesta["numero_documento"]);
            $("#rolOriginal").val(respuesta["id_rol"]);
            $("#EditRolUsuario").val(respuesta["id_rol"]);
            $("#EditRolUsuario").html(respuesta["nombre_rol"]);

            if (respuesta["id_rol"] == 6) {
                $("#editSede").removeClass("d-none");
                $("#EditFicha").removeClass("d-none");
                $("#selectEditSede").prop("required", true);
                $("#selectEditIdFicha").prop("required", true);
            } else {
                $("#editSede").addClass("d-none");
                $("#EditFicha").addClass("d-none");
                $("#selectEditSede").removeAttr("required");
                $("#selectEditIdFicha").removeAttr("required");
            }

            $("#selectEditSede").attr("idSede", respuesta["id_sede"]);
            $("#optionEditSede").val(respuesta["id_sede"]);
            $("#optionEditSede").html(respuesta["nombre_sede"]);
            //disparar el evento change para cargar las fichas de la sede seleccionada
            // $("#selectEditSede").trigger("change");
            
            $("#optionEditIdFicha").val(respuesta["id_ficha"]);
            $("#optionEditIdFicha").html(respuesta["codigo"]);
            $("#editEmail").val(respuesta["correo_electronico"]);
            $("#editTelefono").val(respuesta["telefono"]);
            $("#editDireccion").val(respuesta["direccion"]);
            $("#nombreEditPrograma").prop("placeholder", respuesta["descripcion_ficha"]);
        }
    });
});

// Clear modal inputs when the modal is hidden
$('#modalEditarUsuario').on('hidden.bs.modal', function() {
    //recargar las vista de usuarios
    // location.reload();
    // Clear all input fields inside the modal
});

