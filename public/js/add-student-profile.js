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
    var cloneExperience = originalDivExperience.cloneNode(true); // "deep" clone
    cloneExperience.children[0].innerHTML = "Experience " + i;
    cloneExperience.children[2].children[1].setAttribute("name", "experience[" + i + "][organization]");
    cloneExperience.children[2].children[1].setAttribute("placeholder", "");
    cloneExperience.children[3].children[0].children[1].setAttribute("name", "experience[" + i + "][experienceTitle]");
    cloneExperience.children[3].children[0].children[1].setAttribute("placeholder", "");

    cloneExperience.children[3].children[1].children[1].setAttribute("name", "experience[" + i + "][employmentType]");
    cloneExperience.children[3].children[1].children[1].setAttribute("placeholder", "");

    cloneExperience.children[4].children[0].children[1].setAttribute("name", "experience[" + i + "][startDate]");
    cloneExperience.children[4].children[0].children[1].setAttribute("placeholder", "");

    cloneExperience.children[4].children[1].children[1].setAttribute("name", "experience[" + i + "][endDate]");
    cloneExperience.children[4].children[1].children[1].setAttribute("placeholder", "");

    originalDivExperience.parentNode.appendChild(cloneExperience);
    checkVisibility("Experience")
}

function duplicateDivEducation() {
    j++;
    var cloneEducation = originalDivEducation.cloneNode(true); // "deep" clone
    cloneEducation.children[0].innerHTML = "Education " + j;
    cloneEducation.children[2].children[1].setAttribute("name", "education[" + j + "][institute]");
    cloneEducation.children[2].children[1].setAttribute("placeholder", "");

    cloneEducation.children[3].children[1].setAttribute("name", "education[" + j + "][degree]");
    cloneEducation.children[3].children[1].setAttribute("placeholder", "");

    cloneEducation.children[4].children[0].children[1].setAttribute("name", "education[" + j + "][startDate]");
    cloneEducation.children[4].children[0].children[1].setAttribute("placeholder", "");

    cloneEducation.children[4].children[1].children[1].setAttribute("name", "education[" + j + "][endDate]");
    cloneEducation.children[4].children[1].children[1].setAttribute("placeholder", "");

    cloneEducation.children[5].children[1].setAttribute("name", "education[" + j + "][cgpa]");
    cloneEducation.children[5].children[1].setAttribute("placeholder", "");

    originalDivEducation.parentNode.appendChild(cloneEducation);
    checkVisibility("Education")
}
