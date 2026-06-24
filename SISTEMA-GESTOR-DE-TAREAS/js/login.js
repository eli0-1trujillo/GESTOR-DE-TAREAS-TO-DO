// =========================
// LOGIN SPRINT 2
// =========================

function ingresar(){

    let usuario =
    document.getElementById(
    "usuario"
    ).value.trim();

    let clave =
    document.getElementById(
    "clave"
    ).value.trim();

    if(usuario === "" || clave === ""){

        alert(
        "Complete usuario y contraseña"
        );

        return;
    }

    let sesion = null;

    // ADMINISTRADOR

    if(
        usuario === "admin" &&
        clave === "1234"
    ){

        sesion = {

            usuario: "admin",
            rol: "Administrador"

        };

    }

    // DOCENTE

    else if(
        usuario === "docente" &&
        clave === "1234"
    ){

        sesion = {

            usuario: "docente",
            rol: "Docente"

        };

    }

    else{

        alert(
        "Usuario o contraseña incorrectos"
        );

        return;
    }

    // GUARDAR SESIÓN

    localStorage.setItem(

        "sesion",

        JSON.stringify(
        sesion
        )

    );

    localStorage.setItem(
        "rol",
        sesion.rol
    );

    alert(
        "Bienvenido " +
        sesion.rol
    );

    window.location.href =
    "sistema.html";

}

// =========================
// ENTER PARA INGRESAR
// =========================

document.addEventListener(
"keypress",
function(event){

    if(event.key === "Enter"){

        ingresar();

    }

});