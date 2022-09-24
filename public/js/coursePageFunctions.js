const addStudentRowBtn = document.querySelector('#add-student-row-btn')
addStudentRowBtn.addEventListener('click', addStudentRow)
//In the 'Add Students' modal, add another row of student name inputs when the plus icon is clicked
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


const addJobInputBtn = document.querySelector('#add-job-input-btn')
addJobInputBtn.addEventListener('click', addJobInput)
//In the 'Edit Job List' modal, add another job datalist input when the plus icon is clicked
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