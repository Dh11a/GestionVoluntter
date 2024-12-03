const express = require('express');
const session = require('express-session');
const app = express();
const connectDB = require('./src/config/db');
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views')); 

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');


const projectRoutes = require('./src/routes/project.routes');
const applicationRoutes = require('./src/routes/application.routes');
const feedbackRoutes = require('./src/routes/feedback.routes');
const volunteerRoutes = require('./src/routes/volunteer.routes');
const adminRoutes = require('./src/routes/admin.routes'); 

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
connectDB(); 


app.use('/api/projects', projectRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/feedback', feedbackRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/admin', adminRoutes); 
app.use(adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
