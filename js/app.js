//Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto Semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;
// Clases

// Clase de Presupuesto
class Presupuesto {
    constructor(presupuesto) {
            this.presupuesto = Number(presupuesto);
            this.restante = Number(presupuesto);
        }
        // Método para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}
//clas de interfaz maneja todo lo relacionado con el HTML
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo) {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center', 'alert');
            if (tipo === 'error') {
                divMensaje.classList.add('alert-danger');
            } else {
                divMensaje.classList.add('alert-success');
            }
            divMensaje.appendChild(document.createTextNode(mensaje));
            //insertar en el dom
            document.querySelector('.primario').insertBefore(divMensaje, formulario);
            //Quitar la alerta despues de 3 segundos
            setTimeout(() => {
                document.querySelector('.primario .alert').remove();
            }, 3000);
        }
        //inserta los gastos a la lista
    agregarGastoListado(nombre, cantidad) {
        const gastoListado = document.querySelector('#gastos ul');
        //crear un li
        const li = document.createElement('li');
        li.className = 'lista-group-item d-flex justify-content-between aligne-items-center';
        //insertar el gasto
        li.innerHTML = `
        ${nombre}
        <span class="badge badge-primary badge-pill"> $${cantidad}</span>
        `;
        gastoListado.appendChild(li);

    }
    presupuestoRestante(cantidad) {
            const restante = document.querySelector('span#restante');
            //leemos el presupuesto restante
            const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
            restante.innerHTML = `${presupuestoRestanteUsuario}`;
            this.comprobarPresupuesto();
        }
        //Cambia de color el presupuesto restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        //Comprobar el 25%
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}


//event Listener
// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        // Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }

});
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //leer el varlo del formulario
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    //instanciar la interfaz
    const ui = new Interfaz();
    //Combprobar que no estan vacios
    if (nombreGasto === '' || cantidadGasto === '') {
        //2 parametros mensaje y tipo
        ui.imprimirMensaje('Hubo un Error', 'error');
    } else {
        //insertar el HTML
        ui.imprimirMensaje('Correcto', 'correct');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

});