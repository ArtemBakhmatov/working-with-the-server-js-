"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    function request(event) {                      // запрос()
        event.preventDefault(); // отменить стандартное поведение браузера

        let formData = new FormData(form);      // объект: ключ -> значение
        
        const request = new XMLHttpRequest(); // объект осинхронно дает общаться с сервером
        request.open('POST', './api.php'); // Настройка запроса ('отправить', 'адрес')
        //request.setRequestHeader('Content-type', 'multipart/form-data'); // (тип, формат)
        // Если есть new XMLHttpRequest() и new FormData(), то setRequestHeader не нужен
        request.send(formData); // отправить запрос

        request.addEventListener('load', () => { 
            if (request.status == 200) {
                console.log(request.response);
            } else {
                console.error('Что-то пошло не так!');
            }
        });  

        //axios.post('http://localhost:3000/people', object);
        
    }
    form.addEventListener('submit', (event) => request(event), {"once": true});
    // {"once": true} -> обработчик сработае только один раз  

});