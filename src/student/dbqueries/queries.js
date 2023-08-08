const getStudentQuery = "SELECT * FROM students";
const getSingleStudentQuery = "SELECT * FROM students WHERE id = $1";

module.exports = {
    getStudentQuery,
    getSingleStudentQuery,
}