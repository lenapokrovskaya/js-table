"use strict";

fetch("./data.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {    
        tableGenerator(data);
    });

    function tableGenerator (data) {
    const tableContainer = document.getElementById("content").innerHTML = `
    <table id="table">
        <thead>
            <tr>
            <th><button id="hidden-button-name" type="button">&#128065;</button>Имя<button id="first-name-sort-button" type="button">&#9660;</button></th>
            <th><button id="hidden-button-lastname" type="button">&#128065;</button>Фамилия<button id="last-name-sort-button" type="button">&#9660;</button></th>
            <th><button id="hidden-button-desc" type="button">&#128065;</button>Описание<button id="desc-sort-button" type="button">&#9660;</button></th>
            <th><button id="hidden-button-color" type="button">&#128065;</button>Цвет глаз<button id="color-sort-button" type="button">&#9660;</button></th>
            </tr>
        </thead>
        <tbody id="table-tbody">
            ${data.map(function (data) {
                return `
                <tr class="tr">
                    <td class="name">${data.name.firstName}</td>
                    <td class="lastname">${data.name.lastName}</td>
                    <td class="about ellipsis">${data.about}</td>
                    <td class="eyecolor" style="color:${data.eyeColor}; background-color:${data.eyeColor}">${data.eyeColor}</td>
                </tr>
                `
            }).join("")}
        </tbody>
    </table>`;  
    //Объявим необходимые переменные
    const tableTbody = document.getElementById("table-tbody");
    const tableTrs = document.querySelectorAll(".tr");
    const tableTrsName = document.querySelectorAll(".tr .name");
    const tableTrsLastname = document.querySelectorAll(".tr .lastname");
    const tableTrsDesc = document.querySelectorAll(".tr .about");
    const tableTrsColor = document.querySelectorAll(".tr .eyecolor");
    const tableTds = document.querySelectorAll("td");
    const firstNameSortButton = document.getElementById("first-name-sort-button");
    const lastNameSortButton = document.getElementById("last-name-sort-button");
    const descSortButton = document.getElementById("desc-sort-button");
    const colorSortButton = document.getElementById("color-sort-button");
    const hiddenButtonName = document.getElementById("hidden-button-name")
    const hiddenButtonLastname = document.getElementById("hidden-button-lastname")
    const hiddenButtonDesc = document.getElementById("hidden-button-desc")
    const hiddenButtonColor = document.getElementById("hidden-button-color")
    let arrOfFirstName = Array.from(tableTrs);
    let arrOfLastName = Array.from(tableTrs);
    let arrOfLastColor = Array.from(tableTrs);
    let arrOfDesc = Array.from(tableTrs);
    //При клике на стрелки в заголовках остортируем колонки по алфавиту
    //Напишем функцию для сортировки списков по алфавиту
    function arrSortedArrАlphabetical(button, arrForSort, index) {
        button.addEventListener('click', function () {
            arrForSort.sort(function (a, b) {
                if (a.children[index].innerHTML >= b.children[index].innerHTML) {
                    //Положительное число выполняет перестановку
                    return 1;
                } else {
                    return -1
                }
            });
            //Сначала очистим tbody, а затем расположим в нем отсортированные элементы tr
            tableTbody.innerHTML = "";
            for (let arr of arrForSort) {
                tableTbody.appendChild(arr);
            }
        });
    }
    //Отсортируем поле с именем по алфавиту
    arrSortedArrАlphabetical(firstNameSortButton, arrOfFirstName, 0, tableTrs);
    //Отсортируем поле с фамилией по алфавиту
    arrSortedArrАlphabetical(lastNameSortButton, arrOfLastName, 1, tableTrs);
    //Отсортируем поля с цветами по алфавиту
    arrSortedArrАlphabetical(colorSortButton, arrOfLastColor, 3, tableTrs);
    //Отсортируем поле с описанием по длине описания
    descSortButton.addEventListener('click', function () {
        arrOfDesc.sort(function (a, b) {
            if (a.children[2].innerHTML.length >= b.children[2].innerHTML.length) {
                return 1;
            } else {
                return -1
            }
        });
        tableTbody.innerHTML = "";
        for (let tableTrs of arrOfDesc) {
            tableTbody.appendChild(tableTrs);
        }
    });
    //Редактирование строки таблицы по клику на строку
    //Создаем цикл для строк и отследим нажатие для каждой строки
    tableTrs.forEach((el) => {
        el.addEventListener('click', function func() {
            //Создаем контейнер-обертку для полей для редактирования
            var div = document.createElement('div');
            div.id = "input-wrapper";
            div.value = tableTrs.innerHTML;
            this.appendChild(div)
        });
    });
    //Создаем цикл для ячеек и отследим нажатие для каждой ячейки
    tableTds.forEach((el) => {
        el.addEventListener('click', function func() {
            //Создаем input для редактирования
            let input = document.createElement('input');
            input.value = this.innerHTML;
            this.innerHTML = '';
            input.id = "input";
            input.placeholder = "Введите новые данные для каждого поля";
            this.appendChild(input);

            let td = this;
            input.addEventListener('blur', function () {
                td.innerHTML = this.value;
                td.addEventListener('click', func);
            });

            this.removeEventListener('click', func);
        });
    });
    //При клике на кнопку видимости в заголовках колонок скроем выбранную колонку
    //Напишем функцию скрытия колонок
    function addhidden(event, arr) {
        //Сбросим поведение кнопки по умолчанию
        event.preventDefault();
        //Добавим для кадого элемента по клику переключатель класса hidden
        arr.forEach((el) => {
            el.classList.toggle("hidden");
        });
    }
    //Отследим нажатие для кнопки в колонке имени и вызовем функцию скрытия addHidden
    hiddenButtonName.addEventListener("click", function (event) {
        addhidden(event, tableTrsName);
    });
    //Отследим нажатие для кнопки в колонке фамилии и далее по аналогии с примером выше
    hiddenButtonLastname.addEventListener("click", function (event) {
        addhidden(event, tableTrsLastname);
    });
    //Отследим нажатие для кнопки в колонке фамилии и далее по аналогии с примером выше
    hiddenButtonDesc.addEventListener("click", function (event) {
        addhidden(event, tableTrsDesc);
    });
    //Отследим нажатие для кнопки в колонке фамилии и далее по аналогии с примером выше
    hiddenButtonColor.addEventListener("click", function (event) {
        addhidden(event, tableTrsColor);
    });
    }