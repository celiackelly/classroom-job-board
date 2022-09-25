const assignNewJobsBtn = document.querySelector('#assign-new-jobs-btn')
const randomizeBtn = document.querySelector('#randomize-btn')
const saveBtn = document.querySelector('#save-btn')
const modalSaveBtn = document.querySelector('#modal-save-btn')
const cancelBtn = document.querySelector('#cancel-btn')

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

randomizeBtn.addEventListener('click', () => {
    // make sure you're dealing with extra jobs and extra students...
    const studentsInRoster = Array.from(document.querySelectorAll('[data-listname="roster"]')).map(el => {
        return {
            id: el.dataset.id, 
            firstName: el.dataset.firstName,
            lastName: el.dataset.lastName
        }
    })
    console.log('original', studentsInRoster)
    const jobList = Array.from(document.querySelectorAll('[data-listname="joblist"]')).map(el => {
        return {
            id: el.dataset.id, 
            title: el.dataset.title
        }
    })
    const shuffledStudents = shuffle(studentsInRoster.slice())
    console.log('shuffled', shuffledStudents)

    //use while loop to append students while there are still open jobs, and then add the rest to the unassigned students container? 
    let studentSpans = shuffledStudents.map(student => {
        let span = document.createElement('span')
        span.dataset.id = student.id
        span.dataset.firstName = student.firstName
        span.dataset.lastName = student.lastName
        span.textContent = `${student.firstName} ${student.lastName}`
        return span
    })

    const tdCells = document.querySelectorAll('td')
    tdCells.forEach((cell, i) => {
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild)
        }
        if (studentSpans.length) {
            cell.appendChild(studentSpans.shift())
        }
    })

    const unassignedStudentsContainer = document.querySelector('.unassigned-students-container')
    const unassignedStudentSpans = Array.from(unassignedStudentsContainer.querySelectorAll('span'))
    unassignedStudentSpans.forEach(span => unassignedStudentsContainer.removeChild(span))

    if (studentSpans.length) {
        studentSpans.forEach(span => {
            span.classList.add('rounded')
            unassignedStudentsContainer.appendChild(span)
        })
    }
})

modalSaveBtn.addEventListener('click', async () => {
    try {
        const courseId = window.location.href.split('/')[5]
        const tableRows = Array.from(document.querySelectorAll('tbody tr'))
        const assignments = tableRows.map(row => {
            const jobId = row.querySelector('th').dataset.id
            const studentId = row.querySelector('span') ? row.querySelector('span').dataset.id : undefined
            return { 'job': jobId, 'student': studentId }
        })
        console.log(assignments)
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