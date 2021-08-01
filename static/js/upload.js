const uploadFile = (e) => {
    let target = e.target || e.srcElement || e.currentTarget
    let file = target.files[0]
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/uploads/${file.name}`, true)
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.onreadystatechange = (data) => {
        if (xhr.readyState === 4) {
            if(xhr.status === 200) {
                changeIconImage(data.target.responseText)
            } else {
                console.log('ERROR');
            }
        }
    }
    xhr.send(file)
}

const changeIconImage = (data) => {
    document.querySelector('.icon-image').src = `./images/${data}`
    document.querySelector('input[name="imagename"]').value = data
} 

const submitForm = (e) => {
    e.preventDefault()
    let form = document.querySelector('#test_form').elements
    console.log('11111___ form', form[3].value);
    fetch('/form/save',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            "input-0": form[0].value,
            "input-1": form[1].value,
            "input-2": form[2].value,
            "input-3": form[3].value,
        })
    }).then(res=> res.text())
    .then(res=>console.log('111__res', res))

}

document.querySelector('#upload').addEventListener('change', uploadFile)
document.querySelector('#test_form').addEventListener('submit', submitForm)