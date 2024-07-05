const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionOptions = {
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    next();
}); 


app.get('/register', (req, res) => {
    const {name = "Anonymous"} = req.query;
    req.session.name = name;

    if(name==="Anonymous"){
        req.flash('error', 'User not registered');
    }else{
        req.flash('success', 'Successfully registered');
    }

    res.redirect('/hello');
});

app.get('/hello', (req, res) => {
    
    res.render("page.ejs", {name: req.session.name});
});

// app.get('/reqcount', (req, res) => {
//     if (req.session.count) {
//         req.session.count += 1;
//     } else{
//         req.session.count = 1;
//     }
    
//     res.send(`you sent a req ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//     res.send("test successful");
// }
// );
// app.use(cookieParser("secretcode"));

// //sign cookies to save them from tampering
// app.get('/getsignedcookie', (req, res) => {
//     res.cookie("made-in", "India", {signed:true});
//     res.send("signed cookie send")
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send(req.signedCookies);
// });

// app.get('/getcookies', (req, res) => {
//     res.cookie("greet", "hello");
//     res.cookie("Madein", "India");
//     res.send("sent you some cookies");
// });

// app.get('/greet', (req, res) => {
//     let {name="anonymous"}=req.cookies;
//     res.send(`Hello ${name}`);
// });

// app.get('/', (req, res) => {
//     console.dir(req.cookies);
//     res.send('Hello, I am root')
// });







app.listen(3000, () => {
    console.log('Serving on port 3000')
});