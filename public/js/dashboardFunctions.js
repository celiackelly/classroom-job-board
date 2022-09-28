// const importCoursesBtn = document.querySelector('#import-courses-btn')
// importCoursesBtn.addEventListener('click', importCourses)

//In the 'Add Class' modal, add another row of student name inputs when the plus icon is clicked
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

//Rename Class 
const renameClassBtns = Array.from(document.querySelectorAll('.rename-class-btn'))
const renameClassForm = document.querySelector('#rename-class-form')
const renameInput = document.querySelector('#rename-input')
/*When a rename class button in the overflow menu for any class is clicked, 
  set the form action of the modal form to include that class's id
  and set the rename input's placeholder text to the current class name
*/
renameClassBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.target.closest('ul').dataset.courseId
      renameClassForm.setAttribute('action', `/courses/${courseId}/rename?_method=PUT`)
      const courseName = e.target.closest('ul').dataset.courseName
      renameInput.setAttribute('placeholder', courseName)
  })
})
