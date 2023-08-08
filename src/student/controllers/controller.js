const pool = require('../../../db');
const { getStudentQuery } = require('../dbqueries/queries');

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

module.exports = {
    getStudents,
}