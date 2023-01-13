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
        let json = JSON.stringify(object);    // конвертирует из JS в JSON (Объект)
        const request = new XMLHttpRequest(); // объект осинхронно дает общаться с сервером
        request.open('POST', 'http://localhost:3000/people'); // Настройка запроса ('отправить', 'адрес')
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // (тип, формат)
        request.send(json); // отправить запрос

        request.addEventListener('load', () => { 
            if (request.status == 200) {
                let data = JSON.parse(request.response); 
                console.log(data);
            } else {
                console.error('Что-то пошло не так!');
            }
        });  
    }
    form.addEventListener('submit', (event) => request(event), {"once": true});
    // {"once": true} -> обработчик сработае только один раз  
});