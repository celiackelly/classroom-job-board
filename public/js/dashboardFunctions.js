// const importCoursesBtn = document.querySelector('#import-courses-btn')
// importCoursesBtn.addEventListener('click', importCourses)

const addStudentRowBtn = document.querySelector('#add-student-row-btn')
addStudentRowBtn.addEventListener('click', addStudentRow)
//In the 'Add Class' modal, add another row of student name inputs when the plus icon is clicked
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