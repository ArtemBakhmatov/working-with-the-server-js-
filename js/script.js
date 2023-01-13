"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    function request(event) {                      // запрос()
        event.preventDefault(); // отменить стандартное поведение браузера

        let formData = new FormData(form);      // объект: ключ -> значение
        formData.append('id', Math.random());   // добавляем в объект новую пару (ключ: значение)
        let object = {};                        // пустой объект
        formData.forEach((value, key) => {
            object[key] = value;
        });
        
        getResource('http://localhost:3000/people', object)
            .then(data => console.log(data))
            .catch(err => console.error(err));
        
    }
    form.addEventListener('submit', (event) => request(event), {"once": true});
    // {"once": true} -> обработчик сработае только один раз  

    async function getResource(url, data) { // Получить ресурс
        const responce = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (responce.status !== 200) {  // если ошибка 
            throw new Error(`Could not fetch ${url}, status: ${responce.status}`);
        }
        return await responce.json(); // возращаем асинхронный ответ в формате JS (Обычный объект)
    }
});