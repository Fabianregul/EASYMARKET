document.addEventListener("DOMContentLoaded", function() {
    const btnAgregar = document.getElementById("agregar");
    const tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    const productoInput = document.getElementById("producto");
    const precioInput = document.getElementById("precio");
    const cantidadInput = document.getElementById("cantidad");
    const totalDisplay = document.getElementById("total");

    let contador = 1;
    let totalPagar = 0;

    btnAgregar.addEventListener("click", function() {
        const producto = productoInput.value.trim();
        const precio = parseFloat(precioInput.value);
        const cantidad = parseInt(cantidadInput.value);

        if (producto !== "" && !isNaN(precio) && !isNaN(cantidad)) {
            const total = precio * cantidad;

            const fila = tabla.insertRow();
            fila.insertCell(0).textContent = contador++;
            fila.insertCell(1).textContent = producto;
            fila.insertCell(2).textContent = `$${precio.toLocaleString()}`;
            fila.insertCell(3).textContent = cantidad;
            fila.insertCell(4).textContent = `$${total.toLocaleString()}`;
            
            // Botón para eliminar la fila
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.classList.add("btn-eliminar"); // Agrega la clase al botón
            // btnEliminar.style.fontSize = "12px";
            btnEliminar.addEventListener("click", function() {
                totalPagar -= total; // Resta el total de este producto
                actualizarTotal();
                tabla.deleteRow(fila.rowIndex - 1); // Elimina la fila
            });
            const accionesCell = fila.insertCell(5);
            accionesCell.appendChild(btnEliminar);

            totalPagar += total; // Suma el total de este producto
            actualizarTotal();

            // Limpiar campos de entrada
            productoInput.value = "";
            precioInput.value = "";
            cantidadInput.value = "";
        } else {
            alert("Por favor completa todos los campos.");
        }
    });

    function actualizarTotal() {
        totalDisplay.textContent = `Total a Pagar: $${totalPagar.toLocaleString()} COP`;
    }
});
