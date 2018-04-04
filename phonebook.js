const URL = 'https://phonebook-33c0a.firebaseio.com/Phonebook';
const person = $('#person');
const phone = $('#phone');

$('#btnLoad').on('click', loadData);
$('#btnCreate').on('click', createElement);

function loadData() {
    $('#phonebook').empty();
    $.ajax({
        method: 'GET',
        url: URL + '.json'
    }).then(loadSuccess)
        .catch(loadError);

    function loadSuccess(res) {
        for (let key in res) {
           generateLi(res[key].name, res[key].phone, key)
        }
    }
}
function createElement() {
    let name = person.val();
    let phoneVal = phone.val();
    let addedElement = JSON.stringify({'name': name, 'phone':phoneVal});

    $.ajax({
        method: 'POST',
        url: URL + '.json',
        data: addedElement,
        success: addElement,
        error: loadError
    });

    function addElement(res) {
        generateLi(name, phoneVal, res.name)
    }
    person.val('');
    phone.val('');

}

function generateLi(name, phone, key) {
    let li = $(`<li>${name}: ${phone} </li>`)
        .append($('<a href="#">[Delete]</a>')
            .on('click', function () {
                $.ajax({
                    method: 'DELETE',
                    url: URL + '/' + key + '.json'
                }).then(function () {
                    $(li).remove()
                }).catch(loadError)
            }));

    $('#phonebook').append(li)
}
function loadError(err) {
    console.log(err)
}