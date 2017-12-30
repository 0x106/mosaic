
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function requireLogin (req, res, next) {
  if (!req.__session.user) {
    res.redirect('/signup');
  } else {
    next();
  }
};
