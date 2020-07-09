var i = 1; //experience div count
var j = 1; //education div count

//Experience
var originalDivExperience = document.getElementById('duplicaterExperience');
var parentDivExperience = document.getElementById("parentDivExperience");
var deleteDivExperience = document.getElementById("deleteExperience");

//Education
var originalDivEducation = document.getElementById('duplicaterEducation');
var parentDivEducation = document.getElementById("parentDivEducation");
var deleteDivEducation = document.getElementById("deleteEducation");

function checkVisibility(Check) {
    if (Check == "Experience") {
        var parentDiv = parentDivExperience
        var deleteDiv = deleteDivExperience
    } else {
        var parentDiv = parentDivEducation
        var deleteDiv = deleteDivEducation
    }
    if (parentDiv.children.length > 1) {
        deleteDiv.style.visibility = 'visible';
    } else {
        deleteDiv.style.visibility = 'hidden';
    }
}

function deleteExperience() {
    parentDivExperience.removeChild(parentDivExperience.lastChild)
    i--;
    checkVisibility("Experience")
}

function deleteEducation() {
    parentDivEducation.removeChild(parentDivEducation.lastChild)
    j--;
    checkVisibility("Education")
}

function duplicateDivExperience() {
    i++;
    var newHtml;
    var element = parentDivExperience;

    var htmlString = '<div><h3 style="margin-top: 3rem;">Experience %nameExperience%</h3><hr /><div class="form-group"><label for="exampleFormControlInput1">Company/Organization Name</label><input name="experience[%nameOrganization%]" type="text" class="form-control"id="exampleFormControlInput1" /></div><div class="form-row"><div class="form-group col-md-6 mb-3"><label for="exampleFormControlInput1">Experience Title</label><input name="experience[%nameTitle%]" type="text" class="form-control" id="exampleFormControlInput1" /></div><div class="form-group col-md-6 mb-3"><label for="exampleFormControlInput1">Employment Type</label><select name="experience[%nameEmploymentType%]" class="custom-select" id="validationDefault04"><option selected disabled value="">Choose...</option><option>Full-Time</option><option>Part-Time</option><option>Self-Employed</option><option>Freelance</option><option>Contract</option><option>Internship</option><option>Apprenticeship</option></select></div></div><div class="form-row"><div class="form-group col-md-6 mb-3"><label for="exampleFormControlInput1">Start Date</label><input name="experience[%nameStartDate%]" type="date" class="form-control" id="exampleFormControlInput1" /></div><div class="form-group col-md-6 mb-3"><label for="exampleFormControlInput1">End Date</label><input name="experience[%nameEndDate%]" type="date" class="form-control" id="exampleFormControlInput1" /></div></div></div>';

    newHtml = htmlString.replace('%nameExperience%', i);
    newHtml = newHtml.replace('%nameOrganization%', i-1);
    newHtml = newHtml.replace('%nameTitle%', i-1);
    newHtml = newHtml.replace('%nameEmploymentType%', i-1);
    newHtml = newHtml.replace('%nameStartDate%', i-1);
    newHtml = newHtml.replace('%nameEndDate%', i-1);

    element.insertAdjacentHTML('beforeend', newHtml);
    checkVisibility("Experience")
}

function duplicateDivEducation() {
    var newHtml;
    j++;
    var element = parentDivEducation;

    var htmlString = '<div><h3 style="margin-top: 3rem;">Education %nameEducation%</h3><hr /><div class="form-group"><label for="exampleFormControlInput1">Institue Name</label><input name="education[%nameInstitute%]" type="text" class="form-control" id="exampleFormControlInput1" /></div><div class="form-group"><label for="exampleFormControlInput1">Degree</label><input name="education[%nameDegree%]" type="text" class="form-control" id="exampleFormControlInput1" /></div><div class="form-row"><div class="form-group col-md-6 mb-3"><label for="exampleFormControlInput1">Start Date</label><input name="education[%nameStartDate%]" type="date" class="form-control" id="exampleFormControlInput1" /></div><div class="form-group col-md-6 mb-3"><label for="exampleFormControlInput1">End Date</label><input name="education[%nameEndDate%]" type="date" class="form-control" id="exampleFormControlInput1" /></div></div><div class="form-group"><label for="exampleFormControlInput1">CGPA</label><input name="education[%nameCgpa%]" type="number" class="form-control" id="exampleFormControlInput1" /></div></div>';

    newHtml = htmlString.replace('%nameEducation%', j);
    newHtml = newHtml.replace('%nameInstitute%', j-1);
    newHtml = newHtml.replace('%nameDegree%', j-1);
    newHtml = newHtml.replace('%nameStartDate%', j-1);
    newHtml = newHtml.replace('%nameEndDate%', j-1);
    newHtml = newHtml.replace('%nameCgpa%', j-1);

    element.insertAdjacentHTML('beforeend', newHtml);
    checkVisibility("Education")
}

var checkbox = document.querySelector("input[name=checkbox]");
var permanentAddress = document.getElementById('permanentAddress')
var currentAddress = document.getElementById('currentAddress')

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        // Checkbox is checked..
        currentAddress.children[1].children[1].setAttribute("value", permanentAddress.children[1].children[1].value);
        currentAddress.children[2].children[1].setAttribute("value", permanentAddress.children[2].children[1].value);
        currentAddress.children[3].children[0].children[1].setAttribute("value", permanentAddress.children[3].children[0].children[1].value);
        currentAddress.children[3].children[1].children[1].setAttribute("value", permanentAddress.children[3].children[1].children[1].value);
        currentAddress.children[3].children[2].children[1].setAttribute("value", permanentAddress.children[3].children[2].children[1].value);
    } else {
        // Checkbox is not checked..
        currentAddress.children[1].children[1].removeAttribute("value");
        currentAddress.children[2].children[1].removeAttribute("value");
        currentAddress.children[3].children[0].children[1].removeAttribute("value");
        currentAddress.children[3].children[1].children[1].removeAttribute("value");
        currentAddress.children[3].children[2].children[1].removeAttribute("value");
    }
});
