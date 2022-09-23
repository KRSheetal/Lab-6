
//alert("is this working")

let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')

let input = document.querySelector('#image-text')
input.disabled = true

let image = new Image()
image.src = 'decor.jpg'


image.addEventListener('load', function (){
    context.drawImage(image, 0, 0)
    input.disabled = false
})

input.addEventListener('input', function (){
    let text = this.value
    context.fillStyle = 'Red'
    context.font = '40px Calibri'
    context.drawImage(image, 0, 0)
    context.fillText(text, 20, 205)
})
