
class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
        this.handleSubmit(e)
        } )
    }

    handleSubmit(e){
        e.preventDefault()
        this.checkInputs()
        this.senhasIguais()

    }

    //verifica se as senhas estão iguais
    senhasIguais(){
        let valid = true

        const senha = this.formulario.querySelector('.senha')
        const repetirSenha = this.formulario.querySelector('.repetir-senha')

        if(senha.value !== repetirSenha.value) {
            valid = false
            this.createError(senha, 'Campos senha e repetir senha precisam ser iguais')
            this.createError(repetirSenha, 'Campos senha e repetir senha precisam ser iguais')
        }

        if(senha.value.length < 6 || senha.value.length > 12) {
            valid = false
            this.createError(senha, 'Senha precisa ter entre 6 e 12 caracteres')
        }

        return valid

    }

    checkInputs(){
        let valid = true

        // Remove mensagens de erro anteriores
        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            //Obtém o elemento irmão anterior ao campo atual no HTML
            const label = campo.previousElementSibling.innerText

             // Verifica se o campo está vazio
            if(!campo.value) {
                this.createError(campo, `Campo "${label}" não pode estar em branco`)
                valid = false
            }

             // Valida usuário
            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valid = false
            }

             // Valida e-mail
            if(campo.classList.contains('email')) {
                if(!this.validaEmail(campo)) valid = false
            }

             // Valida CPF
            if(campo.classList.contains('cpf')) {
                
                const cpfNumeros = campo.value.replace(/\D+/g, '')
                if (cpfNumeros.length !== 11) {
                    this.createError(campo, 'O CPF precisa ter 11 números (xxx.xxx.xxx-xx)');
                    valid = false;
                }
            }

        }

        return valid;
    }

    //Verifica se o email esta com o formato padrão 
    validaEmail(campo) {
        const email = campo.value
        let valid = true

        //expressão regular
        if(!email.match(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/)) {
            this.createError(campo, 'Email inválido')
            valid = false
        }

        return valid
    }

    //Verifica se o usuario atende os requesitos solicitados 
    validaUsuario(campo){
        const usuario = campo.value
        let valid = true


        if(usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Usuário precisa ter entre 3 e 12 caracteres')
            valid = false
        }

        //expressão regular
        if(!usuario.match(/^[a-zA-z0-9]+$/g)) {
            this.createError(campo, 'Nome de usuário precisa conter apenas letras e/ou números')
            valid = false
        }
        
        return valid
    }

    //Cria a mensagem de ERRO e imprimi no HTML
    createError(campo, msg){
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        //insere o elemento HTML em uma posição específica
        campo.insertAdjacentElement('afterend', div)
    }

}

const valida = new ValidaFormulario
