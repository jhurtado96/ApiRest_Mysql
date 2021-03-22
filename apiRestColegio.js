let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    database: "colegio",
    user: "root",
    password: null

});
connection.connect();

const { response } = require('express');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.get("/alumnos",

    function (req, res) {

        let respuesta;
        student_id = req.query.student_id;

        if (req.query.student_id != null) {

            let params = [student_id]
            let consulta = "SELECT * FROM students WHERE student_id=?"
            connection.query(consulta, params, function (error, resultado) {

                if (error) {
                    res.send(error)
                } else {
                    if (resultado.length == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send(resultado)
                    }
                }

            })



        } else {
            let consulta = "SELECT * FROM students"
            connection.query(consulta, function (error, resultado) {
                if (error) {
                    respuesta = { error: true, codigo: 200, mensaje: 'No existen alumnos con ese id' }
                } else {
                    respuesta = { error: false, codigo: 200, mensaje: 'Listado de alumnos', resultado: resultado }
                }
                res.send(respuesta)

            })
        }
    }
);


app.post("/alumnos",
    function (req, res) {

        let first_name = req.body.first_name
        let last_name = req.body.last_name
        let group_id = req.body.group_id
        let anyo_ingreso = req.body.anyo_ingreso

        let params = [first_name, last_name, group_id, anyo_ingreso]
        let sqlInsertAl = "INSERT INTO students (first_name,last_name,group_id,anyo_ingreso) VALUES (?,?,?,?)"
        connection.query(sqlInsertAl, params, function (error, resultado) {

            if (error) {
                if (error.code == "ER_BAD_NULL_ERROR") {
                    res.send({ 'mensaje': 'No puedes introducir un valor nulo' })
                }


                else if (error.code == "ER_NO_REFERENCED_ROW_2") {
                    res.send({ 'mensaje': 'No puedes introduce un grupo valido' })
                }
                else response.send(error)
            } else {
                res.send({ 'mensaje': 'Alumno añadido' })
            }
        })

    }


)

app.put("/alumnos",
    function (req, res) {
        let first_name = req.body.first_name
        let last_name = req.body.last_name
        let group_id = req.body.group_id
        let anyo_ingreso = req.body.anyo_ingreso
        let student_id = req.body.student_id
        let params = [first_name, last_name, group_id, anyo_ingreso, student_id]
        if (req.body.student_id == null) {
            res.send({ "mensaje": "Introduce un id" })
        } else {



            let sqlInsertAl = 'UPDATE students SET first_name = COALESCE(?,first_name),last_name = COALESCE(?,last_name),group_id = COALESCE(?,group_id),anyo_ingreso = COALESCE(?,anyo_ingreso) WHERE student_id=?'

            connection.query(sqlInsertAl, params, function (error, resultado) {

                if (error) {
                    if (error.code == "ER_NO_REFERENCED_ROW_2") {
                        res.send({ 'mensaje': "Introduce un grupo que sea valido" })
                    } else {
                        res.send(error)
                    }
                } else {
                    if (resultado.affectedRows == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send({ "mensaje": 'alumno modificado' })
                    }
                }

            })

        }

    }
)

app.delete("/alumnos",
    function (req, res) {
        let student_id = req.body.student_id;
        let params = [student_id]
        let consulta = "DELETE FROM students WHERE student_id=?"
        connection.query(consulta, params, function (error, resultado) {
            if (error) {

                res.send(error)
            } else {
                if (resultado.affectedRows == 0) {
                    res.send({ 'mensaje': 'No existe el id' })
                } else {
                    res.send({ "mensaje": 'Alumno borrado' })
                }
            }
        })



    }
)


app.get("/profesores",

    function (req, res) {

        let respuesta;
        teacher_id = req.query.teacher_id;

        if (req.query.teacher_id != null) {

            let params = [teacher_id]
            let consulta = "SELECT * FROM teachers WHERE teacher_id=?"
            connection.query(consulta, params, function (error, resultado) {

                if (error) {
                    res.send(error)
                } else {
                    if (resultado.length == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send(resultado)
                    }
                }

            })



        } else {
            let consulta = "SELECT * FROM teachers"
            connection.query(consulta, function (error, resultado) {
                if (error) {
                    respuesta = { error: true, codigo: 200, mensaje: 'No existen profesores con ese id' }
                } else {
                    respuesta = { error: false, codigo: 200, mensaje: 'Listado de profesores', resultado: resultado }
                }
                res.send(respuesta)

            })
        }
    }
);


app.post("/profesores",
    function (req, res) {
        let respuesta;

        let first_name = req.body.first_name
        let last_name = req.body.last_name


        let params = [first_name, last_name]
        let sqlInsertAl = "INSERT INTO teachers (first_name,last_name) VALUES (?,?)"
        connection.query(sqlInsertAl, params, function (error, resultado) {

            if (error) {
                if (error.code == "ER_BAD_NULL_ERROR") {
                    res.send({ 'mensaje': 'No puedes introducir un valor nulo' })
                }


                else if (error.code == "ER_NO_REFERENCED_ROW_2") {
                    res.send({ 'mensaje': 'No puedes introduce un grupo valido' })
                }
                else response.send(error)
            } else {
                res.send({ 'mensaje': 'Profesor añadido' })
            }
        })

    }


)

app.put("/profesores",
    function (req, res) {
        let first_name = req.body.first_name
        let last_name = req.body.last_name
        let teacher_id = req.body.teacher_id
        let params = [first_name, last_name, teacher_id]
        if (req.body.teacher_id == null) {
            res.send({ "mensaje": "Introduce un id" })
        } else {



            let sqlInsertAl = 'UPDATE teachers SET first_name = COALESCE(?,first_name),last_name = COALESCE(?,last_name) WHERE teacher_id=?'

            connection.query(sqlInsertAl, params, function (error, resultado) {

                if (error) {

                    res.send(error)
                } else {
                    if (resultado.affectedRows == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send({ "mensaje": 'Profesor modificado' })
                    }
                }
            })



        }
    })

app.delete("/profesores",
    function (req, res) {
        let teacher_id = req.body.teacher_id;
        let params = [teacher_id]
        let consulta = "DELETE FROM teachers WHERE teacher_id=?"
        connection.query(consulta, params, function (error, resultado) {
            if (error) {

                res.send(error)
            } else {
                if (resultado.affectedRows == 0) {
                    res.send({ 'mensaje': 'No existe el id' })
                } else {
                    res.send({ "mensaje": 'Profesor borrado' })
                }
            }
        })



    }
)


app.get("/grupos",

    function (req, res) {

        let respuesta;
        group_id = req.query.group_id;

        if (req.query.group_id != null) {

            let params = [group_id]
            let consulta = "SELECT * FROM groups WHERE group_id=?"
            connection.query(consulta, params, function (error, resultado) {

                if (error) {
                    res.send(error)
                } else {
                    if (resultado.length == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send(resultado)
                    }
                }

            })



        } else {
            let consulta = "SELECT * FROM groups"
            connection.query(consulta, function (error, resultado) {
                if (error) {
                    respuesta = { error: true, codigo: 200, mensaje: 'No existen grupos con ese id' }
                } else {
                    respuesta = { error: false, codigo: 200, mensaje: 'Listado de grupos', resultado: resultado }
                }
                res.send(respuesta)

            })
        }
    }
);

app.post("/grupos",
    function (req, res) {
        let respuesta;

        let name = req.body.name



        let params = [name]
        let sqlInsertAl = "INSERT INTO groups (name) VALUES (?)"
        connection.query(sqlInsertAl, params, function (error, resultado) {

            if (error) {
                if (error.code == "ER_BAD_NULL_ERROR") {
                    res.send({ 'mensaje': 'No puedes introducir un valor nulo' })
                }


                else if (error.code == "ER_NO_REFERENCED_ROW_2") {
                    res.send({ 'mensaje': 'No puedes introduce un grupo valido' })
                }
                else response.send(error)
            } else {
                res.send({ 'mensaje': 'Grupo añadido' })
            }
        })

    }


)

app.put("/grupos",
    function (req, res) {
        let name = req.body.name
        let group_id = req.body.group_id
        let params = [name, group_id]
        if (req.body.group_id == null) {
            res.send({ "mensaje": "Introduce un id" })
        } else {



            let sqlInsertAl = 'UPDATE groups SET name = COALESCE(?,name) WHERE group_id=?'

            connection.query(sqlInsertAl, params, function (error, resultado) {

                if (error) {

                    res.send(error)
                } else {
                    if (resultado.affectedRows == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send({ "mensaje": 'grupo modificado' })
                    }
                }
            })



        }
    })
app.delete("/grupos",
    function (req, res) {
        let group_id = req.body.group_id;
        let params = [group_id]
        let consulta = "DELETE FROM groups WHERE group_id=?"
        connection.query(consulta, params, function (error, resultado) {
            if (error) {

                res.send(error)
            } else {
                if (resultado.affectedRows == 0) {
                    res.send({ 'mensaje': 'No existe el id' })
                } else {
                    res.send({ "mensaje": 'Grupo borrado' })
                }
            }
        })



    }
)


app.get("/asignaturas",

    function (req, res) {

        let respuesta;
        subject_id = req.query.subject_id;

        if (req.query.subject_id != null) {

            let params = [subject_id]
            let consulta = "SELECT * FROM subjects WHERE subject_id=?"
            connection.query(consulta, params, function (error, resultado) {

                if (error) {
                    res.send(error)
                } else {
                    if (resultado.length == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send(resultado)
                    }
                }

            })



        } else {
            let consulta = "SELECT * FROM subjects"
            connection.query(consulta, function (error, resultado) {
                if (error) {
                    respuesta = { error: true, codigo: 200, mensaje: 'No existen asignaturas con ese id' }
                } else {
                    respuesta = { error: false, codigo: 200, mensaje: 'Listado de asignaturas', resultado: resultado }
                }
                res.send(respuesta)

            })
        }
    }
);

app.post("/asignaturas",
    function (req, res) {


        let title = req.body.title



        let params = [title]
        let sqlInsertAl = "INSERT INTO subjects (title) VALUES (?)"
        connection.query(sqlInsertAl, params, function (error, resultado) {

            if (error) {
                if (error.code == "ER_BAD_NULL_ERROR") {
                    res.send({ 'mensaje': 'No puedes introducir un valor nulo' })
                }


                else if (error.code == "ER_NO_REFERENCED_ROW_2") {
                    res.send({ 'mensaje': 'No puedes introduce una asignatura valida' })
                }
                else response.send(error)
            } else {
                res.send({ 'mensaje': 'Asignatura añadida' })
            }
        })

    }


)


app.put("/asignaturas",
    function (req, res) {
        let title = req.body.title
        let subject_id = req.body.subject_id
        let params = [title, subject_id]
        if (req.body.subject_id == null) {
            res.send({ "mensaje": "Introduce un id" })
        } else {



            let sqlInsertAl = 'UPDATE subjects SET title = COALESCE(?,title) WHERE subject_id=?'

            connection.query(sqlInsertAl, params, function (error, resultado) {

                if (error) {

                    res.send(error)
                } else {
                    if (resultado.affectedRows == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send({ "mensaje": 'Asignatura modificada' })
                    }
                }
            })



        }
    })

app.delete("/asignaturas",
    function (req, res) {
        let subject_id = req.body.subject_id;
        let params = [subject_id]
        let consulta = "DELETE FROM subjects WHERE subject_id=?"
        connection.query(consulta, params, function (error, resultado) {
            if (error) {

                res.send(error)
            } else {
                if (resultado.affectedRows == 0) {
                    res.send({ 'mensaje': 'No existe el id' })
                } else {
                    res.send({ "mensaje": 'Asignatura borrada' })
                }
            }
        })



    }
)


app.get("/notas",

    function (req, res) {

        let respuesta;
        student_id = req.query.student_id;

        if (req.query.student_id != null) {

            let params = [student_id]
            let consulta = "SELECT mark FROM marks WHERE student_id=?"
            connection.query(consulta, params, function (error, resultado) {

                if (error) {
                    res.send(error)
                } else {
                    if (resultado.length == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send(resultado)
                    }
                }

            })



        } else {
            let consulta = "SELECT * FROM marks"
            connection.query(consulta, function (error, resultado) {
                if (error) {
                    respuesta = { error: true, codigo: 200, mensaje: 'No existen notas con ese id' }
                } else {
                    respuesta = { error: false, codigo: 200, mensaje: 'Listado de notas', resultado: resultado }
                }
                res.send(respuesta)

            })
        }
    }
);



app.post("/notas",
    function (req, res) {

            let student_id = req.body.student_id
            let subject_id= req.body.subject_id
            let date = req.body.date
            let mark = req.body.mark

        let params = [student_id,subject_id,date,mark]
        let sqlInsertAl = "INSERT INTO marks (student_id,subject_id,date,mark) VALUES (?,?,?,?)"
        connection.query(sqlInsertAl, params, function (error, resultado) {

            if (error) {
                if (error.code == "ER_BAD_NULL_ERROR") {
                    res.send({ 'mensaje': 'No puedes introducir un valor nulo' })
                }


                else if (error.code == "ER_NO_REFERENCED_ROW_2") {
                    res.send({ 'mensaje': 'No puedes introduce una asignatura valida' })
                }
                else response.send(error)
            } else {
                res.send({ 'mensaje': 'Nota añadida' })
            }
        })

    }


)

app.put("/notas",
    function (req, res) {
        
        let student_id = req.body.student_id
        let subject_id= req.body.subject_id
        let date = req.body.date
        let mark = req.body.mark
        let mark_id = req.body.mark_id
        let params = [student_id,subject_id,date,mark,mark_id]
        if (req.body.mark_id == null) {
            res.send({ "mensaje": "Introduce un id" })
        } else {



            let sqlInsertAl = 'UPDATE marks SET student_id = COALESCE(?,student_id),subject_id = COALESCE(?,subject_id),date = COALESCE(?,date),mark = COALESCE(?,mark) WHERE mark_id=?'

            connection.query(sqlInsertAl, params, function (error, resultado) {

                if (error) {

                    res.send(error)
                } else {
                    if (resultado.affectedRows == 0) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send({ "mensaje": 'nota modificada' })
                    }
                }
            })



        }
    })


    app.delete("/notas",
    function (req, res) {
        let mark_id = req.body.mark_id;
        let params = [mark_id]
        let consulta = "DELETE FROM marks WHERE mark_id=?"
        connection.query(consulta, params, function (error, resultado) {
            if (error) {

                res.send(error)
            } else {
                if (resultado.affectedRows == 0) {
                    res.send({ 'mensaje': 'No existe el id'})
                } else {
                    res.send({ "mensaje": 'Nota borrada'})
                }
            }
        })



    }
)


app.get("/media",

    function (req, res) {

        student_id = req.query.student_id;

        if (req.query.student_id != null) {

            let params = [student_id]
            let consulta = "SELECT AVG(mark) AS Media_Notas FROM marks WHERE student_id = ?";
            connection.query(consulta, params, function (error, resultado) {
                console.log(resultado)
                if (error) {

                    res.send(error)
                } else {
                   
                    if (resultado[0].Media_Notas==null) {
                        res.send({ 'mensaje': 'No existe el id' })
                    } else {
                        res.send(resultado)
                    }
                }
                
            })



        }
    })



    app.get("/apuntados",
    function (req,res) 
    {
        let params = [req.query.student_id];
        if(req.query.student_id != null)
        {
            let subInfo = "SELECT students.first_name, students.last_name, subjects.title FROM students JOIN marks ON (students.student_id = marks.student_id) JOIN subjects ON (marks.subject_id = subjects.subject_id) WHERE students.student_id = ?";
            connection.query(subInfo, params, function (error, resultado) 
            {
                if (error) res.send(error)
                else 
                {
                    if (resultado.length == 0)
                    {
                        res.send({"mensaje":"El ID introducido no existe"})
                    }
                    else {
                        res.send(resultado)
                    }
                }
            })
        }
        else
        {
            let subInfo = "SELECT students.first_name, students.last_name, subjects.title FROM students LEFT JOIN marks ON (students.student_id = marks.student_id) LEFT JOIN subjects ON (marks.subject_id = subjects.subject_id)"
            connection.query(subInfo, function (error,resultado)
            {
                if (error)
                {
                    res.send(error)
                }
                else
                {
                    res.send(resultado)
                }
            }) 
        }
    });

    app.get("/impartidas",
function (req,res) 
{
    let params = [req.query.teacher_id];
    if(req.query.teacher_id != null)
    {
        let consulta = "SELECT teachers.first_name, teachers.last_name, subjects.title FROM teachers JOIN subject_teacher ON (teachers.teacher_id = subject_teacher.teacher_id)JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id) WHERE teachers.teacher_id = ?";
        connection.query(consulta, params, function (error, resultado) 
        {
            if (error) res.send(error)
            else 
            {
                if (resultado.length == 0)
                {
                    res.send({"mensaje":"El ID introducido no existe"})
                }
                else {
                    res.send(resultado)
                }
            }
        })
    }
    else
    {
        let consulta2 = "SELECT teachers.first_name, teachers.last_name, subjects.title FROM teachers LEFT JOIN subject_teacher ON (teachers.teacher_id = subject_teacher.teacher_id) LEFT JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)"
        connection.query(consulta2, function (error,resultado)
        {
            if (error)
            {
                res.send(error)
            }
            else
            {
                res.send(resultado)
            }
        }) 
    }
});

app.use(function(request, response, next){
    respuesta = {codigo: 404, mensaje: "URL no encontrado"}
    response.status(404).send(respuesta)
})

app.listen(3000)