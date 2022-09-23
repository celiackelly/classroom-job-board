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