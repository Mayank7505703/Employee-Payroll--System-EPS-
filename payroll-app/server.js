const express = require("express");
const app = express();
const port = process.env.PORT || 8010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let users = [];
let idCounter=1;
app.get("/userDetail", (req, res) => {
  res.render("index.ejs", { users });
});
app.post("/userDetail", (req, res) => {});
app.get("/addUser", (req, res) => {
  res.render("add");
});
app.post("/addUser", (req, res) => {
  const { username, email, password, gender, department, salary } = req.body;

  if (!username || !email || !password) {
    return res.send("Data is missing");
  }

  const numericSalary = parseFloat(salary);
  const taxAmount = numericSalary * 0.12;
  const netSalary = numericSalary - taxAmount;

  const newUser = {
    id: idCounter++,
    username,
    email,
    gender,
    department,
    salary: numericSalary,
    tax: "12%",
    ntSalary: netSalary
  };

  users.push(newUser);
  res.redirect("/userDetail");
});



app.post("/delete/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    users=users.filter(user=> user.id!=id)
    res.redirect("/userDetail")
})



app.listen(port, () => {
  console.log("App is listening to the port", port);
});
