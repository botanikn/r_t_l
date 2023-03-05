import React from "react";
import 'C:/tasks/react/fourth_mission/src/styles/style.css';

const Taskmanager = () => {

    let task_list = [];
    let choice;
    let taskName;
    let checkbox_color;

    window.onload = function() {
        let name = document.getElementById('gret');

        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i) === 'name') {
                name.value = localStorage.getItem(localStorage.key(i));
            }
        }
    }
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
    // Запись task'а в localStorage
    function onTaskClick () {
        localStorage.setItem(Math.floor(Math.random() * 10000000) + " " + choice, taskName);
    }
    // Удаление task'а
    function onDeleteClick (event) {
        localStorage.removeItem(event.target.id);
    }
    // Редактирование task'а
    function onEditClick (event) {
        if (event.target.className === "task_div_edit_but") {
            console.log(event.target.closest("input"));
        }
    }

    return(
        <div className="taskmanager">
            <div className="taskmanager_greetings">
                <h3>Привет, <input type="text" id="gret" onBlur={onNameBlur}/></h3>
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
                        <button>Удалить всё</button>
                    </div>
                    <div className="taskmanager_list_body">
                        {
                            task_list.map((task) => {
                                if (task.split("_")[1] === "work") {
                                    checkbox_color = "checkbox_blue";
                                }
                                else if (task.split("_")[1] === "personal") {
                                    checkbox_color = "checkbox_purple";
                                }
                                return(
                                    <div className="task_div" onClick={onEditClick}>
                                        <div className="task_div_checkbox">
                                            <label className={checkbox_color}>
                                                <input type="checkbox" className="checkbox"/>
                                                <span></span>
                                            </label>                                    
                                        </div>
                                        <div className="task_div_name">
                                            <input type="text" placeholder={task.split("_")[0]}/>
                                        </div>
                                        <div className="task_div_edit">
                                            <button className="task_div_edit_but" id={task.split("_")[1]}>Редактировать</button>
                                        </div>
                                        <div className="task_div_delete">
                                            <button className="task_div_delete_but" onClick={onDeleteClick} id={task.split("_")[1]}>Удалить</button>
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