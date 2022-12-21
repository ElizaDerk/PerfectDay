const getRequest = async () =>{
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19')
    const createElements = await response.json();
    return createElements;

}
const createElements = async () => {
    let result = await getRequest();
    let today = new Date();
    let {
        name,
        main: {
            temp,
            pressure,
            humidity,
            feels_like
        },
        weather: [{icon}],
        wind: {
            speed,
            deg
        }
    } = result;
    const month = today.toLocaleString('eng', { month: 'short' });
    const date = today.getDate();
    const year = today.getFullYear();
    const weekDay = today.toLocaleString('eng', { weekday: 'short' })
    document.querySelector('.date').innerHTML = `${month} ${date}, ${year} - ${weekDay}`

    document.querySelector('.city').innerHTML = `${name}`
    document.querySelector('.humidity').innerHTML = `Humidity: ${humidity}%`
    document.querySelector('.pressure').innerHTML = `Pressure: ${pressure} hPA`

    const wind = Math.round(speed)
    document.querySelector('.speed').innerHTML = `Wind: ${wind} km/h`
    document.querySelector('.direction').innerHTML = `Direction: ${deg}°`

    document.querySelector('.img') .setAttribute("src",`http://openweathermap.org/img/w/${icon}.png`)

    const temperature = Math.round(temp)
    document.querySelector('.temp').innerHTML = `Temperature: ${temperature}°C`

    const feels = Math.round(feels_like)
    document.querySelector('.feels').innerHTML = `Feels Like: ${feels}°C`

}
createElements();


/////
let time = document.getElementById("current-time")
setInterval(()=>{
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000)


/////
const todos = document.querySelector(".todos-list");
const input = document.querySelector(".todos-input");
const btnAdd = document.querySelector(".add");
const options = document.querySelector(".more");
const fDone = document.querySelector(".filter-done");
const fWip = document.querySelector(".filter-wip");
const fAll = document.querySelector(".filter-all");

//document.addEventListener("DOMContentLoaded", getTodoStorage);
btnAdd.addEventListener("click", addTodo);
input.addEventListener("keypress", addTodoKey);
todos.addEventListener("click", checkItem);
todos.addEventListener("click", deleteItem);
options.addEventListener("click", optionsOpen);
fDone.addEventListener("click", filterDone);
fWip.addEventListener("click", filterWip);
fAll.addEventListener("click", filterAll);

getTodoStorage();

function addTodo(e) {
    e.preventDefault();
    if (input.value.trim() !== "") {
        // Create li item todo
        const li = document.createElement("li");

        // Create text todo
        const text = document.createElement("span");
        text.textContent = input.value;
        text.classList.add("todo-text");
        li.appendChild(text);

        // Create buttons actions for one item
        const buttonCheck = document.createElement("button");
        const buttonDelete = document.createElement("button");
        buttonCheck.classList.add("todo-check");
        buttonDelete.classList.add("todo-delete");
        buttonCheck.innerHTML = `<i class="fas fa-check">Done</i>`;
        buttonDelete.innerHTML = `<i class="fas fa-trash-alt">X</i>`;
        li.appendChild(buttonCheck);
        li.appendChild(buttonDelete);

        // Append todo in li item
        todos.appendChild(li);
        saveTodoStorage(input.value);

        // Empty field todo
        input.value = "";
    }
}


function addTodoKey(event) {
    if (event.key === "Enter") {
        addTodo(event);
    }
}

function checkItem(e) {
    e.preventDefault();
    if (e.target.classList.contains("todo-check")) {
        const todoCurrent = e.target.closest("li");
        let status;
        if (todoCurrent.classList.contains("done")) {
            todoCurrent.classList.remove("done");
            status = "wip";
        } else {
            todoCurrent.classList.add("done");
            status = "done";
        }
    }
}

function deleteItem(e) {
    e.preventDefault();
    if (e.target.classList.contains("todo-delete")) {
        const todoCurrent = e.target.closest("li");
        const valueTodo = todoCurrent.firstChild.textContent;
        todoCurrent.classList.add("delete");
        setTimeout(() => {
            console.log();
            todos.removeChild(todoCurrent);
            deleteTodoStorage(valueTodo);
        }, 700);
    }
}

function optionsOpen(e) {
    e.target.nextSibling.nextElementSibling.classList.toggle("open");
}
function filterDone() {
    const list = document.querySelectorAll(".todos-list li");
    list.forEach(el => {
        el.classList.remove("hide");
        if (!el.classList.contains("done")) {
            el.classList.add("hide");
        }
    });
}
function filterAll() {
    const list = document.querySelectorAll(".todos-list li");
    list.forEach(el => {
        el.classList.remove("hide");
    });
}
function filterWip() {
    const list = document.querySelectorAll(".todos-list li");
    list.forEach(el => {
        el.classList.remove("hide");
        if (el.classList.contains("done")) {
            el.classList.add("hide");
        }
    });
}

function saveTodoStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    /*
    todos.push({
      name: todo,
      status: "wip"
    });*/
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodoStorage() {
    let getTodos;
    if (localStorage.getItem("todos") === null) {
        getTodos = [];
    } else {
        getTodos = JSON.parse(localStorage.getItem("todos"));

        getTodos.forEach(el => {
            // Create li item todo
            const li = document.createElement("li");

            // Create text todo
            const text = document.createElement("span");
            text.textContent = el;
            text.classList.add("todo-text");
            li.appendChild(text);

            // Create buttons actions for one item
            const buttonCheck = document.createElement("button");
            const buttonDelete = document.createElement("button");
            buttonCheck.classList.add("todo-check");
            buttonDelete.classList.add("todo-delete");
            buttonCheck.innerHTML = `<i class="fas fa-check">Done</i>`;
            buttonDelete.innerHTML = `<i class="fas fa-trash-alt">X</i>`;
            li.appendChild(buttonCheck);
            li.appendChild(buttonDelete);

            // Append todo in li item
            todos.appendChild(li);
        });
    }
}
function deleteTodoStorage(todo) {
    let deleteTodos;
    if (localStorage.length) {
        deleteTodos = JSON.parse(localStorage.getItem("todos"));
        const index = deleteTodos.indexOf(todo);
        console.log(todo);
        if (index > -1) {
            deleteTodos.splice(index, 1);
        }
        localStorage.setItem("todos", JSON.stringify(deleteTodos));
    }
}


////
const year = document.querySelector(".year");
const month = document.querySelector(".month");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const start_day = document.querySelectorAll("tr td");

prev.addEventListener("click", changeCalendar);
next.addEventListener("click", changeCalendar);

function changeCalendar(event) {
    const type = event.target.className;

    let currentMonth = parseInt(month.innerHTML, 10);
    let currentYear = parseInt(year.innerHTML, 10);

    if (type === "prev") {
        if (currentMonth - 1 < 1) {
            currentMonth = 12;
            currentYear--;
        } else {
            currentMonth--;
        }
    } else if (type === "next") {
        if (currentMonth + 1 > 12) {
            currentMonth = 1;
            currentYear++;
        } else {
            currentMonth++;
        }
    }
    year.innerHTML = currentYear;
    month.innerHTML = currentMonth;
    printCalendar(currentYear, currentMonth - 1);
}

function printCalendar(cYear, cMonth) {

    let day = new Date(cYear, cMonth, 1).getDay();
    let date = new Date(cYear, cMonth, 1).getDate();

    const date_length = 32 - new Date(cYear, cMonth, 32).getDate();

    for (let i = 0; i < start_day.length; i++) {
        start_day[i].innerHTML = "&nbsp";
    }

    for (let i = day; i < day + date_length; i++) {
        start_day[i].innerHTML = date;
        date++;
    }
}

function init() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    year.innerHTML = currentYear;
    month.innerHTML = currentMonth + 1;

    printCalendar(currentYear, currentMonth);
}

init();
