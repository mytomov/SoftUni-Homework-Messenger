function attachEvents() {
    const fireBaseUrl = `https://messanger-f304b.firebaseio.com/messanger/.json`;
    $('#submit').on('click', submit);
    $('#refresh').on('click', refresh);

    function submit() {
     let author = $('#author').val();
     let content = $('#content').val();
     let message = JSON.stringify({
         author,
         content,
         timestamp: Date.now()
     });
     $.post(fireBaseUrl, message)
         .then(refresh)

    }

    function refresh() {
        $('#messages').empty();
        $.get(fireBaseUrl).then(loadPosts)
    }
    function loadPosts(data) {
        let textarea = $('#messages');
        let messages = '';
        for (const key in data) {
            const  message = data[key];
            let messageStr = `${message.author}: ${message.content}\n`;
            messages += messageStr;
        }
        textarea.text(messages);
    }
}