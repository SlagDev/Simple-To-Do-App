document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');

    // Cargar tareas desde el almacenamiento local
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            addTaskToList(taskText);
        });
    };

    // Agregar tarea a la lista
    const addTaskToList = (taskText) => {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Guardar tarea en el almacenamiento local
    const saveTaskToStorage = (taskText) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Eliminar tarea del almacenamiento local
    const removeTaskFromStorage = (taskText) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Evento para agregar una tarea
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTaskToList(taskText);
            saveTaskToStorage(taskText);
            taskInput.value = '';
        } else {
            alert('Por favor, ingresa una tarea.');
        }
    });

    // Cargar tareas al iniciar
    loadTasks();
});
