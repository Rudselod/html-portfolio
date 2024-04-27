function addTask(){
 let taskCount = document.querySelectorAll('.taskR').length +1;
 let taskName = "Task " + taskCount;
 let taskDiv = document.createElement('div');
     taskDiv.classList.add('taskR');
 let taskNameHeader = document.createElement('h4');
     taskNameHeader.textContent = taskName;
 let timeIndicator = document.createElement('span');
     timeIndicator.textContent = "Elapsed Time";
 let linebreak = document.createElement('br');
 let renameButton = document.createElement('button');
     renameButton.textContent = "Rename";
     renameButton.addEventListener('click', renameTask);
 let startButton = document.createElement('button');
     startButton.textContent = "Start";
     startButton.addEventListener('click', startTask);
 taskDiv.appendChild(taskNameHeader);
 taskDiv.appendChild(timeIndicator);
 taskDiv.appendChild(linebreak);
 taskDiv.appendChild(renameButton);
 taskDiv.appendChild(startButton);
 document.getElementById('taskListR').appendChild(taskDiv); 
}
function renameTask(event){
 let taskContainer = event.target.closest('.taskR');
 let newTaskName = prompt("Enter Task Name.");
  if (newTaskName === null) {
   alert("Cancelled, name is unchanged.");
  }
  else if(newTaskName === "") {
   alert("Not a valid name, name is unchanged.");
  }
  else if(newTaskName !== null && newTaskName.trim() !== "") {
   let taskNameHeader = taskContainer.querySelector('h4');
       taskNameHeader.textContent = newTaskName;
  }
}
function startTask(event){
 let taskContainer = event.target.closest('.taskR');
 let startTime = Date.now();
     taskContainer.dataset.startTime = startTime;
 let startOfDay = new Date().setHours(0, 0, 0, 0);
 let elapsedTime = startTime - startOfDay;
 let elapsedDate = new Date(elapsedTime);
 let hours = String(elapsedDate.getUTCHours()).padStart(2, '0');
 let minutes = String(elapsedDate.getUTCMinutes()).padStart(2, '0');
 let formattedTime = `${hours}:${minutes}`;

 let timeIndicator = taskContainer.querySelector('span');
     timeIndicator.textContent = formattedTime;

 let startButton = event.target;
     startButton.remove();
 let stopButton = document.createElement('button');
     stopButton.textContent = "Stop";
     stopButton.addEventListener('click', stopTask);
 taskContainer.appendChild(stopButton);
}
function stopTask(event){
 let taskContainer = event.target.closest('.taskR');
 let stopTime = Date.now();
 let startOfDay = new Date().setHours(0, 0, 0, 0);
 let stopCalculatedTime = stopTime - startOfDay;
 let startTime = taskContainer.dataset.startTime;
 let continueTime = taskContainer.dataset.continueTime;
 let latestTime = startTime;
  if(continueTime && continueTime > startTime){
   latestTime = continueTime;
  }
 let elapsedTime = stopTime - parseInt(latestTime);

 let stopDate = new Date(stopCalculatedTime);
 let hours = String(stopDate.getUTCHours()).padStart(2, '0');
 let minutes = String(stopDate.getUTCMinutes()).padStart(2, '0');
 let formattedTime = `${hours}:${minutes}`;

 let elapsedDate = new Date(elapsedTime);
 let elapsedHours = String(elapsedDate.getUTCHours()).padStart(2, '0');
 let elapsedMinutes = String(elapsedDate.getUTCMinutes()).padStart(2, '0');
 let elapsedSeconds = String(elapsedDate.getUTCSeconds()).padStart(2, '0');
 let formattedElapsedTime = `${elapsedHours}h${elapsedMinutes}m${elapsedSeconds}s`;

 let timeIndicator = taskContainer.querySelector('span');
     timeIndicator.textContent += ` to ${formattedTime} ${formattedElapsedTime}`;

 let stopButton = event.target;
     stopButton.remove();
 let continueButton = document.createElement('button');
     continueButton.textContent = "Continue";
     continueButton.addEventListener('click', continueTask);
 taskContainer.appendChild(continueButton);
}
function continueTask(event){
 taskContainer = event.target.closest('.taskR')
 let continueTime = Date.now();
     taskContainer.dataset.continueTime = continueTime;
 let startOfDay = new Date().setHours(0, 0, 0, 0);
 let continueCalculatedTime = continueTime - startOfDay;

 let elapsedDate = new Date(continueCalculatedTime);
 let hours = String(elapsedDate.getUTCHours()).padStart(2, '0');
 let minutes = String(elapsedDate.getUTCMinutes()).padStart(2, '0');
 let formattedTime = `${hours}:${minutes}`;

 let timeIndicator = taskContainer.querySelector('span');
     timeIndicator.textContent += ` | ${formattedTime}`;

 let continueButton = event.target
     continueButton.remove();
 let stopButton = document.createElement('button');
     stopButton.textContent = "Stop";
     stopButton.addEventListener('click', stopTask);
 taskContainer.appendChild(stopButton);
}