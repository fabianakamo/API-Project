import * as yup from "yup";

const regexName = new RegExp(/^([a-zA-Z]+([ ]?[a-zA-Z]+)*)$/);
const regexPasswords = new RegExp(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
);

const validation = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  let userSchema = yup.object().shape({
    name: yup
      .string()
      .required()
      .matches(regexName, "Name must contain only letters"),
    email: yup.string().email().required("Not a valid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        regexPasswords,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords don't match."),
  });

  userSchema
    .validate({ name, email, password, confirmPassword })
    .catch(function (err) {
      const erro1 = err.name;
      const erro2 = err.errors;
      // console.log(erro1);
      // console.log(erro2);
    });

  const result = console.log(name, email, password, confirmPassword);
  return result;
};

export default { validation };

/* NAO FUNCIONA PQ?
const validation = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  let userSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required("Email:"),
    password: yup.string().required("Please enter your password"),
    confirmPassword: yup.string().required("Please confirm your password"),
  });

  userSchema
    .validate({
      name: /^([a-zA-Z]+([ ]?[a-zA-Z]+)*)$/,
      email: email,
      password:
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      confirmPassword: password,
    })
    .catch(function (err) {
      const erro1 = err.name; // => 'ValidationError'
      const erro2 = err.errors; // => ['Deve ser maior que 18']
      console.log(erro1);
      console.log(erro2);
    });
*/
