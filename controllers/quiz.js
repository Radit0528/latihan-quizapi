const db = require('../models');
const Quiz = db.quizzes;

//CREATE: untuk menambahkan data kedalam tabel quiz
exports.create = async (req, res) => {
    try {
        const data = await Quiz.create(req.body)
        res.json({
            message: "Quizzes Created Successfully!",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message:error.message,
            data: null,
        });
    }
}

//READ: Manampilkan semua data quiz sesuai model dari database
exports.getAll = async(req, res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes Retrieved Successfully!",
            data: quizzes,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
}

//UPDATE: by Id
exports.update = async(req, res) => {
    const id = req.params.id
    try {
        const quiz =await Quiz.findByPk(id, { rejectOnEmpty: true })
        quiz.update(req.body, {
            where: {id}
        });
        res.json({
            message: "Quizzes Updated Successfully!",
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some Error Occurred While Retrieving Quiz",
            data: null
        });
    }
}

//DELETE
exports.delete = async(req, res) => {
    const id = req.params.id
    try {
        const quiz =await Quiz.findByPk(id, { rejectOnEmpty: true })

        quiz.destroy()

        res.json({
            message: "Quizzes Deleted Successfully!",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some Error Occurred While Retrieving Quiz",
            data: null
        });
    }
}

//GET by id
exports.findOne = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `Quizzes Retrieved Successfully With id=${id}.`,
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some Error Occurred While Retrieved Quiz",
            data: null,
        });
    }
}

//Menampilkan Semua data Quiz Berdasarkan Category
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where : {
            categoryId: id
        }
    });
    res.json({
        message: `Quizzes Retrieved Successfully With CategoryId=${id}.`,
        data: quizzes,
    });
}

//Menampilkan data quiz berdasarkan level
exports.getByLevelId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where : {
            levelId: id
        }
    });
    res.json({
        message: `Quizzes Retrieved Successfully With levelId=${id}.`,
        data: quizzes,
    });
}



