module.exports = function(req, res, next) {
    console.log(req.session); 
    if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
      return res.redirect('/admin/login'); 
    }
    next();
  };
  