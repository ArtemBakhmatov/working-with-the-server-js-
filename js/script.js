"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    function request(event) {                      // запрос()
        event.preventDefault(); // отменить стандартное поведение браузера

        let formData = new FormData(form);      // объект: ключ -> значение
        
        axios({
            method: 'post',
            url: './api.php',
            data: formData,
            //Headers: {'content-type': 'multipart/form-data'} // необзятелен всеравно будет работать
        })
        .then(data => console.log(data.data));
    }
    form.addEventListener('submit', (event) => request(event), {"once": true});
    // {"once": true} -> обработчик сработае только один раз  

    async function getResource(url, data) { // Получить ресурс
        const responce = await fetch(`${url}`, {
            method: 'POST',
            body: data
            // Если есть new XMLHttpRequest() и new FormData(), то headers не нужен
        });

        if (responce.status !== 200) {  // если ошибка 
            throw new Error(`Could not fetch ${url}, status: ${responce.status}`);
        }
        return await responce.text(); // возращаем асинхронный ответ 
    }

});