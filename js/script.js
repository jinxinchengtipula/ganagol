const personas = [
    {
        "id": 1,
        "nombre": "Juan",
        "oficio": "Electricista"
    },
    {
        "id": 2,
        "nombre": "María",
        "oficio": "Plomero"
    },
    {
        "id": 3,
        "nombre": "Pedro",
        "oficio": "Carpintero"
    },
    {
        "id": 4,
        "nombre": "Luis",
        "oficio": "Pintor"
    }
];

const contrataciones = [];

function setOficios(){
    const oficiosElement = document.getElementById("oficios");
    let contenido = "";
    personas.forEach(function(persona) { 
        const template = `
            <div class="persona">
                <div class="datapersona">
                    <h3>${persona.nombre}</h3>
                    <p>${persona.oficio}</p>
                </div>
                <div class="actions" data-id="${persona.id}">
                    <div class="action actionContratar">Contratar</div>
                </div>
            </div>
        `;
        contenido = contenido + template;
    });
    oficiosElement.innerHTML = contenido;
}

function buscarPorID(id) {
    // Por cada objeto en el array
    for (let contratacion of contrataciones) {
        // Si el ID del objeto es igual al ID que estamos buscando
        if (contratacion.id === id) {
            // Devolver ese objeto
            return contratacion;
        }
    }
    // Si no se encuentra ningún objeto con el ID dado, devolver undefined
    return undefined;
}

function actionsButtons() {
    const actionContratar = document.querySelectorAll(".actionContratar");
    actionContratar.forEach(function(boton) {
        boton.addEventListener("click", function() {
            //seleccionar al padre
            const padre = this.parentNode;                        
            const id = padre.getAttribute("data-id");
            //logica visual
            const actionsButtons = padre.querySelectorAll('.action');                        
            actionsButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add("active");
            //parte logica
            //BUSCAR SI EL ID EXISTE EN EL ARRAY y reemplzarlo            
            const newContratacion = new Object();
            newContratacion.id = id;
            // Aquí puedes agregar más propiedades según sea necesario
            newContratacion.persona = personas.find(persona => persona.id === parseInt(id));
            const contratacionExistente = buscarPorID(id);
            if (contratacionExistente) {
                Swal.fire({
                    title: 'Error',
                    text: 'Esta persona ya ha sido contratada',
                    icon: 'error'
                });
            } else {
                contrataciones.push(newContratacion);
                Swal.fire({
                    title: 'Éxito',
                    text: 'Persona contratada satisfactoriamente',
                    icon: 'success'
                });
            }  
        });
    });
}

const contratarBtn = document.getElementById("contratarBtn");
contratarBtn.addEventListener("click", function() {
    console.log(contrataciones);
    // Aquí puedes agregar lógica adicional para lo que deseas hacer después de contratar
});

setOficios();
actionsButtons();
