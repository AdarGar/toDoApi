var express = require("express");
var app = express();
app.use(express.json());

var toDoList = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  },
  {
    userId: 1,
    id: 7,
    title: "illo expedita consequatur quia in",
    completed: false,
  },
  {
    userId: 1,
    id: 8,
    title: "quo adipisci enim quam ut ab",
    completed: true,
  },
  {
    userId: 1,
    id: 9,
    title: "molestiae perspiciatis ipsa",
    completed: false,
  },
  {
    userId: 1,
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    completed: true,
  },
  {
    userId: 1,
    id: 11,
    title: "vero rerum temporibus dolor",
    completed: true,
  },
  {
    userId: 1,
    id: 12,
    title: "ipsa repellendus fugit nisi",
    completed: true,
  },
  {
    userId: 1,
    id: 13,
    title: "et doloremque nulla",
    completed: false,
  },
  {
    userId: 1,
    id: 14,
    title: "repellendus sunt dolores architecto voluptatum",
    completed: true,
  },
  {
    userId: 1,
    id: 15,
    title: "ab voluptatum amet voluptas",
    completed: true,
  },
  {
    userId: 1,
    id: 16,
    title: "accusamus eos facilis sint et aut voluptatem",
    completed: true,
  },
  {
    userId: 1,
    id: 17,
    title: "quo laboriosam deleniti aut qui",
    completed: true,
  },
  {
    userId: 1,
    id: 18,
    title: "dolorum est consequatur ea mollitia in culpa",
    completed: false,
  },
  {
    userId: 1,
    id: 19,
    title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    completed: true,
  },
  {
    userId: 1,
    id: 20,
    title: "ullam nobis libero sapiente ad optio sint",
    completed: true,
  },
];

app.get("/todos", function (req, res) {
  return res.json(toDoList);
});

app.get("/todos/:id", function (req, res) {
  const todoId = req.params.id;
  const todo = toDoList.find((u) => u.id == todoId);
  if(todo !== undefined){
  return res.json(todo);
} else {
    return res.status(404).send("Todo no lo encontré.")
}
});

app.delete("/todos/:id", function(req, res){
    const todoId = req.params.id;
    const todo = toDoList.find((u) => u.id == todoId);
    if(todo !== undefined){
        toDoList = toDoList.filter(u => u.id !== todo.id);
        return res.status(202).json(todo);
      } else {
          return res.status(404).send("No se pudo borrar.")
      }
});

app.post("/todos", function(req, res){
    
    console.log(req.body);
    if(req.body && req.body.title && req.body.userId){
        const newId = toDoList.length + 1;
        const todo = {
            title: req.body.title,
            userId: req.body.userId,
            completed: false,
            id: newId
        };
        toDoList.push(todo);
        return res.status(201).json(todo);
    } else{
        return res.status(400).send("El body está mal, debe de contener title y userId.")
    }
});

app.put("/todos/:id", function(req, res){
    const todoId = req.params.id;
    let todo = toDoList.find((u) => u.id == todoId);
    if( typeof todo !== 'undefined'){
        if(req.body || req.body.title || req.body.userId || typeof req.body.completed === 'boolean'){

            todo.title = req.body.title;
            todo.userId = req.body.userId;
            todo.completed = req.body.completed;
                
            return res.status(200).json(todo);
        }else{
        return res.status(400).send("El body está mal, debe de contener title, completed y userId.")}    
    }else{
        return res.status(404).send("No existe el to do a editar.")
    }

});

app.patch("/todos/:id", function (req, res){
    const todoId = req.params.id;
    let todo = toDoList.find((u) => u.id == todoId);
    if(typeof todo !== 'undefined'){
        if(req.body || req.body.title || req.body.userId || typeof req.body.completed === 'boolean'){
           
            todo.title = typeof req.body.title === 'string' ?req.body.title: todo.title;
            todo.userId = typeof req.body.userId === 'number' ?req.body.userId: todo.userId;
            todo.completed =typeof req.body.completed === 'boolean' ? req.body.completed: todo.completed;
                
            return res.status(200).json(todo);
        }else{
        return res.status(400).send("El body está mal, debe de contener title, completed y userId.")}    
    }else{
        return res.status(404).send("No existe el to do a editar.")
    }
})

app.listen(2000, (error) => {
  if (error) {
    console.log("Se rompio.");
  } else {
    console.log("Funciona.");
  }
});
