function validasiEmail(email) {
  var atfs = email.indexOf('@');
  var dotls = email.lastIndexOf('.');
  var valid;
  if (atfs < 1 || dotls < atfs + 2 || dotls + 2 >= email.length) {
    valid = 'Email Tidak Valid';
  }
  return valid;
}

function validasiPass(pass) {
  var valid;
  if (pass.length < 6) {
    valid = 'Password Kurang dari 6 Karakter';
  }
  return valid;
}

export {validasiEmail, validasiPass};
