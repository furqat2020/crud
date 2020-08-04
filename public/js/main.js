$(document).ready(() => {
    $('#del').on('click', (e) => {
        $target = $(e.target)
        const id = $target.attr('data-id')

        $.ajax({
            type: 'DELETE',
            url: '/maqola/' + id,

            success: (res) => {
                alert("O'chirildi...")
                window.location.href = '/'
            },

            error: (err) => {
                alert("Error Deleting...")
                console.log(err)
            }
        })
    })
})