const socket = io()

const deleteId = document.querySelector('#deleteById');
socket.on('products', product => {
    makeHtmlTable(product).then(html => {
        document.querySelector('#products').innerHTML = html
    })
});
const makeHtmlTable = (products) => {
    return fetch('./views/index.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ products });
            return html
        })
}

//-------------------------------------------------------------------------------------

const username = document.getElementById('username')
const nameUser = document.getElementById('name')
const lastname = document.getElementById('lastname')
const age = document.getElementById('age')
const aka = document.getElementById('aka')
const avatar = document.getElementById('avatar')

const text = document.getElementById('inputMessage')
const btnSend = document.getElementById('btnSend')

const formMessage = document.getElementById('formMessage')
formMessage.addEventListener('submit', e => {
    e.preventDefault()

    const authorMessages = { 
        author: {
            username: username.value,
            name: nameUser.value, 
            lastname: lastname.value,
            age: age.value,
            aka: aka.value,
            avatar: avatar.value
        },
        text: text.value
    }
    socket.emit('newMessage', authorMessages);
    formMessage.reset()
    text.focus()
})

socket.on('message', message => {
    const html = makeHtmlList(message)
    document.getElementById('message').innerHTML = html;
})

const makeHtmlList = (message) => {
    return message.map(message => {
        return (`
            <div>
                <b style="color:blue;">${message.author.aka}</b>
                [<span style="color:brown;">${message.author.timestamp}</span>] :
                <i style="color:green;">${message.text}</i>
            </div>
        `)
    }).join(" ");
}

username.addEventListener('input', () => {
    const valueEmail = username.value.length
    const valueText = text.value.length
    text.disabled = !valueEmail
    btnSend.disabled = !valueEmail || !valueText
})

text.addEventListener('input', () => {
    const valueText = text.value.length
    btnSend.disabled = !valueText
})
