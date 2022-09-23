const addJobInputBtn = document.querySelector('#add-job-input-btn')
addJobInputBtn.addEventListener('click', addJobInput)
//In the 'Edit Job List' modal, add another job datalist input when the plus icon is clicked
function addJobInput() {
    //Make a copy of the #allJobsDataListInput
    const jobInput = document.querySelector('#allJobsDataListInputDiv-1')
    const clonedJobInput = jobInput.cloneNode(true)

    //Clear out the values of the cloned inputs
    clonedJobInput.value = ''

    //Calculate the number of jobs already added and adjust the id of the cloned input
    const numberOfJobsinList = document.querySelectorAll('.job-list-input').length
    clonedJobInput.id = `allJobsDataListInputDiv-${numberOfJobsinList + 1}`

    //Insert the cloned input above the '#add-job-input-btn' icon
    const parentDiv = document.querySelector('#editJobListForm')
    parentDiv.insertBefore(clonedJobInput, addJobInputBtn)
}