/*
    _________________________________
    /////////////////////////////////
    
    Coffee Machine
    
    - "кофе-машина", выполненная в 
    ООП-стиле
 
    ________________________________
    ////////////////////////////////

*/

// Создаем класс кофе-машины
function CoffeeMachine(name, price, money, sugar) {
    // Название кофе
    this.name = name;
    // цена
    this.price = price;
    // сумма денег
    this.money = money;
    // наличие сахара в кофе
    this.sugar = sugar;

    // Метод: "Налить кофе"
    this.makeCoffee = function() {
        if (this.money >= this.price) {
            this.money -= this.price;
            return this.name + " / сдача = " + this.money;
        } else {
            return "Введенных средств недостаточно, возвращаю назад " + this.money + " руб.";
        }
    }

    // Метод: "Добавить сахар"
    this.addSugar = function() {
        if (this.sugar && this.money >= this.price) {
            return "с сахаром";
        } else {
            return "без сахара";
        }
    }

    // При каждом использовании, пересчитывать баланс и если денег больше, чем аппарат вмещает, остановить их прием
    this.countMoney = function() {
        if (this.money >= 10000) {
            return "Автомат полон денег! Вызываю инкасcаторов!";
        } else {
            return "";
        }
    }
}



// Дочерний класс "Новомодная машина"
function BrandNewMachine(name, price, money, sugar, temperature) {
    // Название кофе
    this.name = name;
    // цена
    this.price = price;
    // сумма денег
    this.money = money;
    // наличие сахара в кофе
    this.sugar = sugar;

    // Подогреть кофе до указаной температуры
    this.temperature = temperature;

    // Вызов метода родителя внутри своего
    CoffeeMachine.prototype.countMoney.apply();
}

// Зададим наследование
BrandNewMachine.prototype = Object.create(CoffeeMachine.prototype);


// Добавим свой метод
BrandNewMachine.prototype.getTemperature = function() {
    return "температура кофе " + this.temperature + " C" };



// Переменные DOM
// numberInput с введенной суммой
var moneyNumInp = document.getElementById("money");
// параграф 'p', для вывода результата (сдачи)
var resultP = document.getElementById("result");
// параграф 'p', для вывода результата (сообщения, что автомат переполнен)
var innerResultP = document.getElementById("innerResult");
// radioInput-ы с типами кофе
var coffeeRadioInps = document.getElementsByClassName("coffee");
// опция добавления сахара
var sugarInp = document.getElementById("sugar");
// button "Заказать"
var coffeeBtn = document.querySelector("button");


// Вешаем обработчики событий
coffeeBtn.addEventListener("click", function() {
    // сумма, введенная пользователем
    var money = Number(moneyNumInp.value);
    console.log('money  ' + money);

    // название кофе
    var coffeename;
    // стоимость кофе, если ничего не выбрано
    var coffeePrice;
    // Подхватываем стоимость кофе и его название
    for (var i = 0; i < coffeeRadioInps.length; i++) {
        if (coffeeRadioInps[i].checked) {
            coffeePrice = Number(coffeeRadioInps[i].value);
            coffeename = document.getElementsByClassName("coffeeLabel")[i].innerHTML;
        }
    }

    // Опция добавить сахар
    var sugar = sugarInp.checked;

    // создаем объект класса кофе-машины
    var coffeeMachine = new CoffeeMachine(coffeename, coffeePrice, money, sugar);

    // Вывод на экран
    resultP.innerHTML = coffeeMachine.makeCoffee() + '<br>';
    resultP.innerHTML += coffeeMachine.addSugar() + '<br>';
    innerResultP.innerHTML += '<br>' + coffeeMachine.countMoney();

    // объект дочернего класса, с температурой кофе 38 градусов
    var brandNewMachine = new BrandNewMachine(coffeename, coffeePrice, money, sugar, 38);
    //
    innerResultP.innerHTML += '<br><br> из класса \'Новомодная машина\'' + brandNewMachine.getTemperature();
    console.log(brandNewMachine);
    innerResultP.innerHTML += '<br> из класса \'Новомодная машина\' ' + brandNewMachine.makeCoffee();


});
