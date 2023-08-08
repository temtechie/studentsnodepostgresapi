const pool = require('../../../db');
const { getStudentQuery, getSingleStudentQuery } = require('../dbqueries/queries');

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
    const id = req.params.id;

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
                res.status(200).json(result.rows);
            }
        }
    })
}

module.exports = {
    getStudents,
    getSingleStudent,
}