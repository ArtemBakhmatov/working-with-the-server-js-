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

        axios.post('http://localhost:3000/people', object);
        
    }
    form.addEventListener('submit', (event) => request(event), {"once": true});
    // {"once": true} -> обработчик сработае только один раз  

});