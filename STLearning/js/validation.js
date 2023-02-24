function ValidateLoginForm() {
    RemoveAllErrorMessage()

    var LoginAcc = document.getElementById('LoginAcc').value
    var LoginPassword = document.getElementById('LoginPassword').value
    var PasswordValidationMessage
    var AccValidationMessage

    AccValidationMessage = isValidAcc(LoginAcc)
    if (AccValidationMessage != 'valid') {
        ShowErrorMessage('LoginAcc', AccValidationMessage)
        return false
    }

    PasswordValidationMessage = isValidPassword(LoginPassword)
    if (PasswordValidationMessage != 'valid') {
        ShowErrorMessage('LoginPassword', PasswordValidationMessage)
        return false
    }
    
}

function ValidateRegistrationForm() {
    RemoveAllErrorMessage()

    var RegiName = document.getElementById('RegiName').value
    var RegiEmailAddres = document.getElementById('RegiEmailAddres').value
    var RegiPassword = document.getElementById('RegiPassword').value
    var PasswordValidationMessage
    var AccValidationMessage

    if (RegiName == '') {
        ShowErrorMessage('RegiName', 'Không được để trống thông tin')
        return false
    } else if (RegiName.length < 3 || RegiName.length > 25) {
        ShowErrorMessage(
            'RegiName',
            'Tên phải tối thiểu 3 ký tự'
        )
        return false
    }
    AccValidationMessage = isValidAcc(RegiEmailAddres)

    if (AccValidationMessage != 'valid') {
        ShowErrorMessage('RegiEmailAddres', AccValidationMessage)
        return false
    }


    PasswordValidationMessage = isValidPassword(RegiPassword)
    if (PasswordValidationMessage != 'valid') {
        ShowErrorMessage('RegiPassword', PasswordValidationMessage)
        return false
    }

 
   
    return true
}

function ValidateForgotPasswordForm() {
    RemoveAllErrorMessage()
    var Account = document.getElementById('Account').value
    var forgotPassEmail = document.getElementById('forgotPassEmail').value

    AccValidationMessage = isValidAcc(Account)
    if (AccValidationMessage != 'valid') {
        ShowErrorMessage('Account', AccValidationMessage)
        return false
    }

    var AccValidationMessage
    AccValidationMessage = isValidAcc(forgotPassEmail)

    if (AccValidationMessage != 'valid') {
        ShowErrorMessage('forgotPassEmail', AccValidationMessage)
        return false
    }
    return true
}

function ValidateResetPasswordForm() {
    RemoveAllErrorMessage()

    var NewPassword = document.getElementById('NewPassword').value
    var ConfirmNewPassword = document.getElementById('ConfirmNewPassword').value

    var PasswordValidationMessage
    var ConfirmPasswordMessage

    PasswordValidationMessage = isValidPassword(NewPassword)
    if (PasswordValidationMessage != 'valid') {
        ShowErrorMessage('NewPassword', PasswordValidationMessage)
        return false
    }

    ConfirmPasswordMessage = isValidPassword(ConfirmNewPassword)
    if (ConfirmPasswordMessage != 'valid') {
        ShowErrorMessage('ConfirmNewPassword', ConfirmPasswordMessage)
        return false
    }

    if (NewPassword != ConfirmNewPassword) {
        ShowErrorMessage('ConfirmNewPassword', 'Mật khẩu không khớp!.')
        return false
    }

    return true
}

function RemoveAllErrorMessage() {
    var allErrorMessage = document.getElementsByClassName('error-message')
    var allErrorFiled = document.getElementsByClassName('error-input')
    var i

    for (i = allErrorMessage.length - 1; i >= 0; i--) {
        allErrorMessage[i].remove()
    }

    for (i = allErrorFiled.length - 1; i >= 0; i--) {
        allErrorFiled[i].classList.remove('error-input')
    }
}

function ShowErrorMessage(InputBoxID, Message) {
    var InputBox = document.getElementById(InputBoxID)
    InputBox.classList.add('error-input')
    InputBox.focus()

    var ErrorMessageElement = document.createElement('p')
    ErrorMessageElement.innerHTML = Message
    ErrorMessageElement.classList.add('error-message')
    ErrorMessageElement.setAttribute('id', InputBoxID + '-error')

    InputBox.parentNode.insertBefore(ErrorMessageElement, InputBox.nextSibling)
}

function isValidAcc(account) {
    if (account == '') {
        return 'Không được để trống thông tin.'
    }

    return 'valid'
}

function isValidPassword(password) {
    const minLength = 6
    const maxLength = 32
    if (password == '') {
        return 'Vui lòng nhập mật khẩu.'
    }

    if (password.length < minLength || password.length > maxLength) {
        return 'Mật khẩu của bạn phải từ 6 đến 32 ký tự'
    }
    return 'valid'
}
