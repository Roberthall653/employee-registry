const addEmployees = async () => {
    let choices = await company_db.getRoles();
    console.log(choices);
    return new Promise( (resolve, reject) => {
        inquirer.prompt([
            {
                name: "manager",
                type: "list",
                message: "Please select a department: ",
                choices: choices
            }
        ]).then( ({ manager }) => {
            console.log(manager);
            resolve();
        });
    });
}
    
getEmployees = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT CONCAT(first_name, " ", last_name) AS Name 
        FROM employees LEFT JOIN employee b
        ON a.manager_id = b.id
        WHERE a.manager_id IS NOT NULL;`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}

getRoles = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT title FROM roles`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}
