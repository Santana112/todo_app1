const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const showAllButton = document.getElementById('show-all');
const showCompletedButton = document.getElementById('show-completed');
const showPendingButton = document.getElementById('show-pending');
 
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filteredTasks = tasks; // Para almacenar las tareas filtradas
 
// Función para agregar una nueva tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }
 
    const task = { text: taskText, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = ''; // Limpiar el input
}
 
// Función para guardar las tareas en el almacenamiento local
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
 
// Función para renderizar las tareas en la lista
function renderTasks() {
    taskList.innerHTML = ''; // Limpiar la lista
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
 
        // Crear botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editTask(index);
 
        // Crear botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteTask(index);
 
        // Marcar tarea como completada
        li.onclick = () => toggleCompleted(index);
 
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
 
// Función para editar una tarea
function editTask(index) {
    const newTaskText = prompt('Edita tu tarea:', tasks[index].text);
    if (newTaskText) {
        tasks[index].text = newTaskText;
        saveTasks(); // Guarda después de editar
        renderTasks(); // Vuelve a renderizar la lista
    }
}
 
// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}
 
// Función para marcar una tarea como completada
function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}
 
// Funciones de filtrado
function showAll() {
    filteredTasks = tasks;
    renderTasks();
}
 
function showCompleted() {
    filteredTasks = tasks.filter(task => task.completed);
    renderTasks();
}
 
function showPending() {
    filteredTasks = tasks.filter(task => !task.completed);
    renderTasks();
}
 
// Eventos para agregar tarea al hacer clic en el botón
addTaskButton.addEventListener('click', addTask);
 
// Evento para agregar tarea al presionar Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
 
// Eventos para mostrar tareas filtradas
showAllButton.addEventListener('click', showAll);
showCompletedButton.addEventListener('click', showCompleted);
showPendingButton.addEventListener('click', showPending);
 
// Renderizar las tareas al cargar la página
renderTasks();