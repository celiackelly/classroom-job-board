// const addCourseBtn = document.querySelector('#add-course-btn')
// const importCoursesBtn = document.querySelector('#import-courses-btn')

// addCourseBtn.addEventListener('click', addCourse)
// importCoursesBtn.addEventListener('click', importCourses)

// function addCourse() {

// }

//Maybe this isn't needed... Get a modal w/form from Bootstrap!
//Then use the form to submit a POST request
//Still might need a client-side function for importing from Google?


const addStudentRowBtn = document.querySelector('#add-student-row-btn')
addStudentRowBtn.addEventListener('click', addStudentRow)

function addStudentRow() {
    const studentNameInputs = document.querySelector('#student-1')
    const clonedStudentNameInputs = studentNameInputs.cloneNode(true)
    const numberOfStudents = document.querySelectorAll('.student-name-inputs').length
    clonedStudentNameInputs.id = `student-${numberOfStudents + 1}`
    const parentDiv = document.querySelector('#student-inputs-container')
    parentDiv.insertBefore(clonedStudentNameInputs, addStudentRowBtn)
}