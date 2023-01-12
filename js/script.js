"use strict";

window.addEventListener('DOMContentLoaded', () => {
    function request() {                      // запрос()
        const request = new XMLHttpRequest(); // объект осинхронно дает общаться с сервером
        request.open('GET', 'http://localhost:3000/people'); // Настройка запроса ('получить', 'адрес')
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // (тип, формат)
        request.send(); // отправить запрос
        /*  Тут обработчик будет работать четыре раза подряд(0 -> 1 -> 2 -> 3 -> 4)
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status == 200) {
                let data = JSON.parse(request.response); 
                console.log(data);
            } else {
                console.error('Что-то пошло не так!');
            }
        });  */
        
        //Обработчик ('load') будет работать один раз при стадии 4, request.readyState необязятелен
        request.addEventListener('load', () => { 
            if (request.status == 200) {
                let data = JSON.parse(request.response); 
                console.log(data);

                data.forEach(item => {
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
            } else {
                console.error('Что-то пошло не так!');
            }
        });  

        //this.remove(); // удаляется кнопка
        document.querySelector('button').remove(); // удаляется кнопка
    }
    document.querySelector('button').addEventListener('click', request, {"once": true});
    // {"once": true} -> обработчик сработае только один раз

    // readystatechange - >отслеживает все стадии нашего запроса (0 -> 1 -> 2 -> 3 -> 4)
    // load -> сработает тогда когда будет стадия 4
    // 0 -> объект создан, open() не вызывался 
    // 1 -> open(); был вызван
    // 2 -> send(); был вызван
    // 3 -> Загрузка , ResponseText
    // 4 -> Операция полностью завершена
    // status == 200 -> означает что всё отлично
    // request.response -> Ответ от сервера, который был получен
    // JSON.parse() -> парсит из JSON в JS
});