let button = document.createElement('button')
button.innerHTML = 'hello'

button.addEventListener('click', function() {
    // 草案中的语法 @babel/plugin-syntax-dynamic-import
    import('./source').then(data => {
        console.log(data.default,'date')
    })
    console.log('click')
})

document.body.appendChild(button)