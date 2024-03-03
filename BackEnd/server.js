const express = require('express') //importing express
const app = express() //using the app variable from express
const bcrypt = require('bcrypt') //importing bcrypt to user

const users = []//We are storing the data here but usually you need to store it to a database and connect it to your database here, look up how to connect node js to mongo db to set this up later.

app.set('view-engine', 'ejs') //to the server that we are using ejs
app.use(express.urlencoded({ extended:false})) //this is a little bit confusing for me

//GETs
app.get('/', (req, res) => {//setting up the routes, / is the index, req = requist, res = response
	res.render('index.ejs', { name: 'Shevan'}) // the ./ is suffecient to locate the file within the project which will rendered
})

app.get('/login', (req, res) => {
	res.render('login.ejs')
})

app.get('/register', (req, res) => {
	res.render('register.ejs')
})

//POSTS
app.post('/login', (req,res) => {
	
})

app.post('/register', async (req,res) => { //we added async for the try catch
	try { //with try catch you need to run an async function
		const hashedPassword = await bcrypt.hash(req.body.password, 10) //We are using bcrypt here and the 10 is a standard and it is quick, also added await because it is async function. there is another source that you can use to learn more about security.
		users.push({
			id: Date.now().toString(), //creating a unique id for the user, this would not be needed if I had a database.
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		})
		res.redirect('/login')//if the previous lines work, then the user would be redirected to the login page
	} catch {
		res.redirect('/register')
	}
	console.log(users) //in real production you would need to reset the users but in this situatuin it is saved to the memory only
})

app.listen(3000) //giving a local port to the application to run on (look up the port numbers online)


