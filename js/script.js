"use strict";

window.addEventListener('DOMContentLoaded', () => {
    function request() {                      // запрос()
        ///////////////// без функции getResource /////////////////////
        /* fetch('http://localhost:3000/people')    // Запрос на указанный адрес
            .then(data => data.json())              // Конвертируем из JSON в JS
            .then(data => createCards(data))        // Выводим результат
            .catch(err => console.error(err));      // Сработает только при ошибке
             */

        ///////////////// с функцией getResource /////////////////////
        getResource('http://localhost:3000/people')
            .then(data => createCards(data))
            .catch(err => console.error(err));

        //this.remove(); // удаляется кнопка
        document.querySelector('button').remove(); // удаляется кнопка
    }
    document.querySelector('button').addEventListener('click', request, {"once": true});

    async function getResource(url) { // Получить ресурс
        const responce = await fetch(`${url}`);

        if (!responce.ok) {  // если ошибка 
            throw new Error(`Could not fetch ${url}, status: ${responce.status}`);
        }
        return await responce.json(); // возращаем асинхронный ответ в формате JS (Обычный объект)
    }
    
    // async -> это означает что внутри функции есть асинхронная операция
    // await -> это означате какая имеенно асинхронная операция
    // throw -> инструкции после throw не будут выполнены

    function createCards(response) {  // создать карточки
        response.forEach(item => {
            let card = document.createElement('div');
            card.classList.add('card');

            let icon;
            if (item.sex === 'male') {
                icon = "icons/mars.png";
            } else {
                icon = "icons/female.png";
            }

            card.innerHTML = `
                <img src="${item.photo}" alt="">
                <div class="name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src=${icon} alt="male">
                </div>
                <div class="age">${item.age}</div>
            `;
            document.querySelector('.app').append(card);
        });
    }


    // {"once": true} -> обработчик сработае только один раз

     
});