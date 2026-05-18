function realizarOperaciones() {

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    let salida = "";

    for (let i = 1; i <= 5; i++) {

        switch(i) {

            case 1:
                salida += `<p><strong>Iteración 1 - SUMA:</strong> ${num1 + num2}</p>`;
                break;

            case 2:
                salida += `<p><strong>Iteración 2 - RESTA:</strong> ${num1 - num2}</p>`;
                break;

            case 3:
                salida += `<p><strong>Iteración 3 - MULTIPLICACIÓN:</strong> ${num1 * num2}</p>`;
                break;

            case 4:
                if(num2 !== 0) {
                    salida += `<p><strong>Iteración 4 - DIVISIÓN:</strong> ${num1 / num2}</p>`;
                } else {
                    salida += `<p><strong>Iteración 4 - DIVISIÓN:</strong> No se puede dividir para 0</p>`;
                }
                break;

            case 5:
                salida += `<p><strong>Iteración 5 - MOD(%):</strong> ${num1 % num2}</p>`;
                break;
        }
    }

    document.getElementById('resultado').innerHTML = salida;
}