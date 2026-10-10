var tasks = [];

var currentFilter = "all";


// DATE

var today = new Date();

var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

document.getElementById("day").innerText =
    days[today.getDay()];

document.getElementById("date").innerText =
    today.toLocaleDateString();


// ADD TASK

function addTask() {

    var input = document.getElementById("taskInput");

    var text = input.value.trim();

    if (text === "") {

        alert("Please enter a task!");

        return;
    }

    var task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    displayTasks();
}


// COMPLETE TASK

function completeTask(id) {

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            tasks[i].completed =
                !tasks[i].completed;

        }
    }

    displayTasks();
}


// DELETE TASK

function deleteTask(id) {

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            tasks.splice(i, 1);

            break;
        }
    }

    displayTasks();
}


// ALL

function showAll() {

    currentFilter = "all";

    setFilter("all");

    displayTasks();
}


// PENDING

function showPending() {

    currentFilter = "pending";

    setFilter("pending");

    displayTasks();
}


// COMPLETED

function showCompleted() {

    currentFilter = "completed";

    setFilter("done");

    displayTasks();
}


// FILTER BUTTON

function setFilter(type) {

    document.getElementById("allBtn")
        .classList.remove("active");

    document.getElementById("pendingBtn")
        .classList.remove("active");

    document.getElementById("doneBtn")
        .classList.remove("active");


    if (type === "all") {

        document.getElementById("allBtn")
            .classList.add("active");

    }

    if (type === "pending") {

        document.getElementById("pendingBtn")
            .classList.add("active");

    }

    if (type === "done") {

        document.getElementById("doneBtn")
            .classList.add("active");

    }
}


// DISPLAY TASKS

function displayTasks() {

    var list =
        document.getElementById("taskList");

    var empty =
        document.getElementById("emptyMessage");

    list.innerHTML = "";

    var visibleTasks = [];


    for (var i = 0; i < tasks.length; i++) {

        if (currentFilter === "all") {

            visibleTasks.push(tasks[i]);

        }

        else if (
            currentFilter === "pending" &&
            tasks[i].completed === false
        ) {

            visibleTasks.push(tasks[i]);

        }

        else if (
            currentFilter === "completed" &&
            tasks[i].completed === true
        ) {

            visibleTasks.push(tasks[i]);

        }
    }


    if (visibleTasks.length === 0) {

        empty.style.display = "block";

    } else {

        empty.style.display = "none";
    }


    for (var i = 0; i < visibleTasks.length; i++) {

        var task = visibleTasks[i];

        var div =
            document.createElement("div");

        div.className = "task";


        if (task.completed) {

            div.classList.add("completed");
        }


        var left = document.createElement("div");

        left.className = "task-left";


        var checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
            task.completed;


        checkbox.onclick = function(id) {

            return function() {

                completeTask(id);

            };

        }(task.id);


        var text =
            document.createElement("span");

        text.className = "task-text";

        text.innerText = task.text;


        var deleteButton =
            document.createElement("button");

        deleteButton.className = "delete";

        deleteButton.innerText = "Delete";


        deleteButton.onclick = function(id) {

            return function() {

                deleteTask(id);

            };

        }(task.id);


        left.appendChild(checkbox);

        left.appendChild(text);

        div.appendChild(left);

        div.appendChild(deleteButton);

        list.appendChild(div);
    }


    updateStats();
}


// STATISTICS

function updateStats() {

    var total = tasks.length;

    var completed = 0;


    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {

            completed++;
        }
    }


    var pending = total - completed;


    document.getElementById("total").innerText =
        total;

    document.getElementById("completed").innerText =
        completed;

    document.getElementById("pending").innerText =
        pending;


    // Progress

    var percent = 0;

    if (total > 0) {

        percent =
            Math.round((completed / total) * 100);
    }


    document.getElementById("percentage").innerText =
        percent + "%";


    document.getElementById("progress").style.width =
        percent + "%";


    var message =
        document.getElementById("message");


    if (total === 0) {

        message.innerText =
            "Start your day by adding a task.";

    }

    else if (percent === 100) {

        message.innerText =
            "Amazing! You completed everything! 🎉";

    }

    else if (percent >= 50) {

        message.innerText =
            "Great progress! Keep going! 💪";

    }

    else {

        message.innerText =
            "Keep going. You are doing great! 🚀";
    }
}


// ENTER KEY

document
    .getElementById("taskInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            addTask();
        }

    });


// INITIAL

displayTasks();