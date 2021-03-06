const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");


const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const OUTPUT_DIR = path.resolve(__dirname, "output");

const outputPath = path.join(OUTPUT_DIR, "team.html",);


const teamMembers = [];


function buildTeamPage() {
    // Make this function and use fs to write file to output folder.
    console.log(render(teamMembers));

    // Output file.
    fs.writeFileSync(outputPath, render(teamMembers), 'utf8');
}

function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What type of team member would you ike to add:",
            choices: [
                "Engineer",
                "Intern",
                "Done"
            ]
        }
    ]).then(answers => {

        // console.log({ teamMembers });

        switch (answers.role) {
            case 'Engineer':
                promptEngineer();
                break;

            case 'Intern':
                promptIntern();
                break;

            case 'Done':
            default:
                buildTeamPage();
        }
    })
}

function promptManager() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your manager's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is manager's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber"
        },
    ]).then(answers => {
        console.log({ answers });

        const { name, id, email, officeNumber } = answers;

        const newManager = new Manager(name, id, email, officeNumber);

        teamMembers.push(newManager)

        addTeamMember();
    })
}

function promptEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your engineer name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your engineer id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your engineer email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your engineer GitHub username",
            name: "gitHub"
        },
    ])
        .then(answers => {
              console.log({ answers });

            const { name, id, email, github } = answers;

            const newEngineer = new Engineer(name, id, email, github);

            teamMembers.push(newEngineer)

            addTeamMember();
        });
}

function promptIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your intern name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your intern id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your intern email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your intern school?",
            name: "school"
        },
    ])
        .then(answers => {
            console.log({ answers });

            const { name, id, email, school } = answers;

            const newIntern = new Intern(name, id, email, school);

            teamMembers.push(newIntern)

            addTeamMember();
        });


}

promptManager();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
