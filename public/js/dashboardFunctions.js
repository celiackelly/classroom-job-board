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
const renameCourseBtns = Array.from(document.querySelectorAll('.rename-course-btn'))
const renameCourseForm = document.querySelector('#rename-course-form')
const renameInput = document.querySelector('#rename-input')
/*When a rename class button in the overflow menu for any class is clicked, 
  set the form action of the modal rename form to include that class's id in the route
  and set the rename input's placeholder text to the current class name
*/
renameCourseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.target.closest('ul').dataset.courseId
      renameCourseForm.setAttribute('action', `/courses/${courseId}/rename?_method=PUT`)
      const courseName = e.target.closest('ul').dataset.courseName
      renameInput.setAttribute('placeholder', courseName)
  })
})


//Delete Class
const deleteCourseBtns = Array.from(document.querySelectorAll('.delete-course-btn'))
const deleteCourseForm = document.querySelector('#delete-course-form')
/*When a delete class button in the overflow menu for any class is clicked, 
  set the form action of the modal delete form to include that class's id in the route
*/
deleteCourseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const courseId = e.target.closest('ul').dataset.courseId
        deleteCourseForm.setAttribute('action', `/courses/${courseId}?_method=DELETE`)
    })
})