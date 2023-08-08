const getStudentQuery = "SELECT * FROM students";
const getSingleStudentQuery = "SELECT * FROM students WHERE id = $1";
const checkIfEmailExist = "SELECT s FROM students s WHERE s.email = $1";
const addNewStudent = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
const removeStudent = "DELETE FROM students WHERE id = $1";
const updateStudentQuery = "UPDATE students SET name = $1 WHERE id = $2";


module.exports = {
    getStudentQuery,
    getSingleStudentQuery,
    checkIfEmailExist,
    addNewStudent,
    removeStudent,
    updateStudentQuery
}