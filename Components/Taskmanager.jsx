import React from "react";
//import './src/styles/style.css';

const Taskmanager = () => {

    let task_list = [];
    let choice;
    let taskName;
    let checkbox_color;

    // window.onload = function() {
    //     let name = document.getElementById('gret');

    //     for (let i = 0; i < localStorage.length; i++) {
    //         if(localStorage.key(i) === 'name') {
    //             name.value = localStorage.getItem(localStorage.key(i));
    //         }
    //     }
    // }
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) === 'name') {

        }
        else {
            task_list.push(localStorage.getItem(localStorage.key(i)) + "_" + localStorage.key(i));
        }
    }
    console.log(task_list)
    // Запись имени пользователя в localStorage
    function onNameBlur (event) {
        localStorage.setItem("name", event.target.value);
    }
    // Запись задания в переменную
    function onTaskNameBlur (event) {
        taskName = event.target.value;
    }
    // Выбор категории 'Работа'
    function onWorkClick() {
        choice = 'work';
        console.log(choice);
    }
    // Выбор категории 'Личное'
    function onPersonalClick() {
        choice = 'personal';
        console.log(choice);
    }

    // Удаление task'а
    function onDeleteClick (event) {
        localStorage.removeItem(event.target.id.split(';')[0]);
        let deleted_div = document.getElementById(`${event.target.id.split(';')[0]}`);
        deleted_div.remove();
    }
    // Редактирование task'а
    function onEditClick (event) {
        let edited_div = document.getElementById(`${event.target.id.split(';')[0]}` + ";text");
        edited_div.readOnly = false;
        edited_div.focus();
        console.log(`${event.target.id.split(';')[0]}` + ";text");
    }
    // Сохранение результатов редактирования в localStorage
    function onTextBlur(event) {
        localStorage.setItem(event.target.id.split(';')[0], event.target.value)
    }
    function onDeleteAllClick() {
        let name = localStorage.getItem('name');
        localStorage.clear();
        localStorage.setItem('name', name);
        let div_all = document.querySelectorAll('.task_div');
        div_all.forEach(function(div) {
            div.remove();
        })
    }
    // Запись task'а в localStorage и создание DOM-элемента с task'ом
    function onTaskClick () {
        let random_number = Math.floor(Math.random() * 10000000);
        localStorage.setItem(random_number + " " + choice, taskName);
        let div = document.createElement('div');
        let div_elder = document.querySelector('div.taskmanager_list_body')
        div.className = 'task_div';
        div.id = random_number + " " + choice;
        div.innerHTML = `<div class="task_div_checkbox">
                            <label className=${"checkbox_" + choice}>
                                <input type="checkbox" class="checkbox"/>
                                <span></span>
                            </label>                                    
                        </div>
                        <div class="task_div_name">
                            <input type="text" placeholder=${taskName} class="taskname" id=${random_number + ` ${choice}` + ";text"} onBlur={onTextBlur} readOnly/>
                        </div>
                        <div class="task_div_edit">
                            <button class="task_div_edit_but" id=${random_number + ` ${choice}` + ";edit"}>Редактировать</button>
                        </div>
                        <div class="task_div_delete">
                            <button class="task_div_delete_but" onClick={onDeleteClick} id=${random_number + ` ${choice}` + ";delete"}}>Удалить</button>
                        </div>`;
        div_elder.append(div);
    }
    

    return(
        <div className="taskmanager">
            <div className="taskmanager_greetings">
                <h3>Привет, <input type="text" id="gret" onBlur={onNameBlur} placeholder={localStorage.getItem('name')}/></h3>
            </div>
            <div className="taskmanager_create">
                <div className="taskmanager_create_name">
                    <p className="title">СОЗДАТЬ ЗАДАЧУ</p>
                    <p>Введите текст задачи</p>
                    <input type="text" id="task_name" placeholder="Текст задачи" onBlur={onTaskNameBlur}/>
                </div>
                <div className="taskmanager_add_categoty">
                    <p>Выберите категорию</p>
                    <div className="taskmanager_add_categoty_radio">
                        <div className="radio_div" id="radio_div_work">
                            <input type="radio" name="taskmanager_category_list" id="task_category_work" onClick={onWorkClick}/>
                            <label htmlFor="task_category_work">Работа</label>
                        </div>
                        <div className="radio_div" id="radio_div_personal">
                            <input type="radio" name="taskmanager_category_list" id="task_category_personal" onClick={onPersonalClick}/>
                            <label htmlFor="task_category_personal">Личное</label>
                        </div>
                    </div>
                </div>
                <div className="taskmanager_add_task">
                    <button id="taskmanager_add_task_button" onClick={onTaskClick}>ДОБАВИТЬ TODO</button>
                </div>
                <div className="taskmanager_list">
                    <div className="taskmanager_list_header">
                        <p>Список дел</p>
                        <button onClick={onDeleteAllClick}>Удалить всё</button>
                    </div>
                    <div className="taskmanager_list_body">
                        {
                            task_list.map((task) => {
                                if (task.split("_")[1] === "work") {
                                    checkbox_color = "checkbox_work";
                                }
                                else if (task.split("_")[1] === "personal") {
                                    checkbox_color = "checkbox_personal";
                                }
                                return(
                                    <div className="task_div" onClick={onEditClick} id={task.split("_")[1]}>
                                        <div className="task_div_checkbox">
                                            <label className={checkbox_color}>
                                                <input type="checkbox" className="checkbox"/>
                                                <span></span>
                                            </label>                                    
                                        </div>
                                        <div className="task_div_name">
                                            <input type="text" placeholder={task.split("_")[0]} className="taskname" id={task.split("_")[1] + ";text"} onBlur={onTextBlur} readOnly/>
                                        </div>
                                        <div className="task_div_edit">
                                            <button className="task_div_edit_but" id={task.split("_")[1] + ";edit"}>Редактировать</button>
                                        </div>
                                        <div className="task_div_delete">
                                            <button className="task_div_delete_but" onClick={onDeleteClick} id={task.split("_")[1] + ";delete"}>Удалить</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Taskmanager;