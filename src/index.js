import "./scss/style.scss";

class FormValide {
    constructor(){
    }

    addError(id, text){
        document.getElementById(id).innerText = text;
    }

    addErrorBorder(id){
        document.getElementById(id).style.border = '1px solid red';
        document.getElementById(id).style.boxShadow = 'inset 0 1px 1px rgba(0,0,0,.075)';
    }

    addOkBorder(id){
        document.getElementById(id).style.border = '1px solid green';
    }

    ValidateEmail(mail){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            {
                return true
            }
            return false
        }


    visiblePass(){
        const password = document.getElementById("password")
        if (password.type === 'password') {
            password.type = 'text'
        } else {
            password.type = 'password'
        }
        return false
    }

}

const formValid = new FormValide()

const form = document.getElementById('form')

form.onkeyup = function(e) {
    console.log(e.target.id,e.target.value);
    if(e.target.id === 'login') {
        if (!e.target.value) {
            formValid.addError('errorLogin', 'Введите логин')
            formValid.addErrorBorder('login')
        } else if(!formValid.ValidateEmail(e.target.value)) {
            formValid.addError('errorLogin', 'Введите корректный email')
            formValid.addErrorBorder('login')
        } else {
            formValid.addError('errorLogin','')
            formValid.addOkBorder('login')
        }
    }
    if(e.target.id === 'password') {
        if (!e.target.value) {
            formValid.addError('errorPassword', 'Введите пароль')
            formValid.addErrorBorder('password')
        } else if (e.target.value.length < 6) {
            formValid.addError('errorPassword', 'Пароль должен быть больше 6 символов')
            formValid.addErrorBorder('password')
        } else {
            formValid.addError('errorPassword','')
            formValid.addOkBorder('password')
        }
    }
}
form.onsubmit = function(e) {
    const {target: form} = e;
    const { login, password} = form;
    console.log(login.value, password.value);
    let errors = [];
    if (!login.value) {
        errors.push('Введите логин')
        formValid.addError('errorLogin', 'Введите логин')
        formValid.addErrorBorder('login')
    } else if(!formValid.ValidateEmail(login.value)) {
        errors.push('Введите корректный email')
        formValid.addErrorBorder('login')
        formValid.addError('errorLogin', 'Введите корректный email')
    }
    if (!password.value) {
        errors.push('Введите пароль')
        formValid.addErrorBorder('password')
        formValid.addError('errorPassword', 'Введите пароль')
    } else if (password.value.length < 6) {
        errors.push('Пароль должен состоять из 6 символов')
        formValid.addErrorBorder('password')
        formValid.addError('errorPassword', 'Пароль должен быть больше 6 символов')
    }
    if (!errors.length) {
        formValid.addError('errorLogin','')
        formValid.addOkBorder('login')
        formValid.addError('errorPassword','')
        formValid.addOkBorder('password')
        console.log('Вход выполен успешно')
        document.getElementById('modal').style.display = 'none'
    }
    e.preventDefault();
}

document.getElementById("pass_visible").onclick = formValid.visiblePass