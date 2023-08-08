const pool = require('../../../db');
const { getStudentQuery, getSingleStudentQuery, checkIfEmailExist, addNewStudent, removeStudent } = require('../dbqueries/queries');

const getStudents = (req, res) => {
    pool.query(getStudentQuery, (error, result) => {
        if (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'An error occurred while fetching students' });
        } else {
            res.status(200).json(result.rows);
        }
    })
}
const getSingleStudent = (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).json({ message: "Bad Request: Missing ID parameter" });
        return;
    }

    pool.query(getSingleStudentQuery, [id], (error, result) => {
        if (error) {
            console.error('Error fetching Single Student:', error);
            res.status(500).json({ error: 'An error occurred while fetching single student' });
        } else {
            if (result.rows.length === 0) {
                res.status(400).json({ message: "Bad Request: No student found with the provided ID" });
            } else {
                res.status(200).json(result.rows[0]);
            }
        }
    })
}

const addStudent = (req, res) => {

    const { name, email, age, dob } = req.body;
    console.log("req.body", req.body);

    // Check if email already exists
    pool.query(checkIfEmailExist, [email], (error, result) => {
        if (error) {
            console.error('Error checking email existence:', error);
            res.status(500).json({ error: 'An error occurred while checking email existence' });
            return; // Return early to prevent further execution
        }

        if (result.rows.length > 0) {
            res.json({ message: "Email already exists!" });
            return; // Return early if email already exists
        }

        // Add student to the database
        pool.query(addNewStudent, [name, email, age, dob], (addError) => {
            if (addError) {
                console.error('Error adding new student:', addError);
                res.status(500).json({ error: 'An error occurred while adding new student' });
                return; // Return early to prevent further execution
            }

            res.status(201).json({ message: "Student Created Successfully!" });
            console.log("Created new Student!");
        });
    });
};

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(getSingleStudentQuery, [id], (error, result) => {
        //check if student exist
        const studentNotFound = !result.rows.length;
        if (studentNotFound) {
            res.send(`No student found with the id ${id}.`);
            return
        }
        pool.query(removeStudent, [id], (error, result)=>{
            if(error) throw Error;
            res.status(200).send(`student with the id: ${id} deleted successfully!.`)
        })
    })
}


module.exports = {
    getStudents,
    getSingleStudent,
    addStudent,
    deleteStudent,
}