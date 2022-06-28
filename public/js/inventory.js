$(document).ready(async function () {

    const container = $('#inventory-container')
    $('#add-item-form').submit(async function (e) {
        e.preventDefault()
        const files = $('#image').prop('files')[0]
        const formData = new FormData()

        formData.append('name', $("#name").val())
        formData.append('description', $("#description").val())
        formData.append('category', $("#category").val())
        formData.append('qty', $("#qty").val())
        formData.append('img', files)

        const response = await fetch("/add-item", {
            method: 'POST',
            body: formData
        })
        container.append(await response.text())
    })
})