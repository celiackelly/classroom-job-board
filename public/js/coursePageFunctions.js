const assignNewJobsBtn = document.querySelector('#assign-new-jobs-btn')
const randomizeBtn = document.querySelector('#randomize-btn')
const saveBtn = document.querySelector('#save-btn')
const modalSaveBtn = document.querySelector('#modal-save-btn')
const cancelBtn = document.querySelector('#cancel-btn')

//When 'Assign New Jobs' button is clicked, show the Randomize, Save, and Cancel buttons
assignNewJobsBtn.addEventListener('click', () => {
    randomizeBtn.classList.remove('hidden')
    saveBtn.classList.remove('hidden')
    cancelBtn.classList.remove('hidden')
    assignNewJobsBtn.classList.add('hidden')
})

//Fisher-Yates Shuffle
function shuffle(array) {   
    let m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

//When the Randomize button is clicked, randomize the students array and re-populate the Job Board (DOM)
randomizeBtn.addEventListener('click', () => {
    //Get the list of students from the roster list
    const studentsInRoster = Array.from(document.querySelectorAll('[data-listname="roster"]')).map(el => {
        return {
            id: el.dataset.id, 
            firstName: el.dataset.firstName,
            lastName: el.dataset.lastName
        }
    })
    //Get the list of jobs from the Job List
    const jobList = Array.from(document.querySelectorAll('[data-listname="joblist"]')).map(el => {
        return {
            id: el.dataset.id, 
            title: el.dataset.title
        }
    })
    //Shuffle the students array using the Fisher-Yates Shuffle
    const shuffledStudents = shuffle(studentsInRoster.slice())

    //Create a span for each student in the shuffledStudents array; add textContent and data-attributes
    let studentSpans = shuffledStudents.map(student => {
        let span = document.createElement('span')
        span.dataset.id = student.id
        span.dataset.firstName = student.firstName
        span.dataset.lastName = student.lastName
        span.textContent = `${student.firstName} ${student.lastName}`
        return span
    })

    //Iterate through the td cells; remove any children (spans) and append one of the shuffled studentSpans
    const tdCells = document.querySelectorAll('td')
    tdCells.forEach((cell, i) => {
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild)
        }
        if (studentSpans.length) {
            cell.appendChild(studentSpans.shift())
        }
    })

    //Remove all the unassigned student spans from the container
    const unassignedStudentsContainer = document.querySelector('.unassigned-students-container')
    const unassignedStudentSpans = Array.from(unassignedStudentsContainer.querySelectorAll('span'))
    unassignedStudentSpans.forEach(span => unassignedStudentsContainer.removeChild(span))

    //If there are still studentSpans left after assigning to jobs in the table, put them in the unassigned students container
    if (studentSpans.length) {
        studentSpans.forEach(span => {
            span.classList.add('rounded')
            unassignedStudentsContainer.appendChild(span)
        })
    }
})

//When the modal Save button is clicked to confirm job assignments, grab them from the table and send to the server
modalSaveBtn.addEventListener('click', async () => {
    try {
        const courseId = window.location.href.split('/')[5]
        const tableRows = Array.from(document.querySelectorAll('tbody tr'))
        const assignments = tableRows.map(row => {
            //Get the jobId from each job cell
            const jobId = row.querySelector('th').dataset.id
            //Get the studentId from each studentSpan in the tds (or set to undefined, if the td has no student span (meaning the job is unassigned)
            const studentId = row.querySelector('span') ? row.querySelector('span').dataset.id : undefined
            return { 'job': jobId, 'student': studentId }
        })
        await fetch(`/courses/${courseId}/currentJobAssignments`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'assignments': assignments
            })
        })
        window.location.reload()

    } catch(err){
        console.log(err)
    }
})

//When the Cancel button is pressed, reload the window to wipe out the DOM changes
cancelBtn.addEventListener('click', () => {
    window.location.reload()
})


//In the 'Add Students' modal, add another row of student name inputs when the plus icon is clicked
const addStudentRowBtn = document.querySelector('#add-student-row-btn')
addStudentRowBtn.addEventListener('click', addStudentRow)
function addStudentRow() {
    //Make a copy of the #student-1 div
    const studentNameInputs = document.querySelector('#student-1')
    const clonedStudentNameInputs = studentNameInputs.cloneNode(true)

    //Clear out the values of the cloned inputs
    const clonedNameInputs = clonedStudentNameInputs.querySelectorAll('input')
    clonedNameInputs.forEach(input => input.value = '')

    //Calculate the number of students already added and adjust the id of the cloned input
    const numberOfStudents = document.querySelectorAll('.student-name-inputs').length
    clonedStudentNameInputs.id = `student-${numberOfStudents + 1}`

    //Insert the cloned div above the '#add-student-row-btn' icon
    const parentDiv = document.querySelector('#student-inputs-container')
    parentDiv.insertBefore(clonedStudentNameInputs, addStudentRowBtn)
}


//In the 'Edit Job List' modal, add another job datalist input when the plus icon is clicked
const addJobInputBtn = document.querySelector('#add-job-input-btn')
addJobInputBtn.addEventListener('click', addJobInput)
function addJobInput() {
    //Make a copy of the #allJobsDataListInput
    const jobInputDiv = document.querySelector('#allJobsDataListInputDiv-0')
    const clonedJobInputDiv = jobInputDiv.cloneNode(true)

    //Clear out the values of the cloned inputs
    let clonedJobInput = clonedJobInputDiv.querySelector('input')
    clonedJobInput.value = ''

    //Calculate the number of jobs already added and adjust the id of the cloned input
    const numberOfJobsinList = document.querySelectorAll('.job-list-input').length
    clonedJobInputDiv.id = `allJobsDataListInputDiv-${numberOfJobsinList}`

    //Insert the cloned input above the '#add-job-input-btn' icon
    const parentDiv = document.querySelector('#editJobListForm')
    parentDiv.insertBefore(clonedJobInputDiv, addJobInputBtn)
}