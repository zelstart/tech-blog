document.addEventListener('DOMContentLoaded', () => {
    const commentFormHandler = async (event) => {
        event.preventDefault();

        const commentBody = document.getElementById('commentBody').value;
        const postId = window.location.pathname.split('/').pop();

        if (commentBody && postId) {
            try {
                const response = await fetch(`/post/${postId}`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        body: commentBody,
                    })
                });

                if (response.ok) {
                    console.log('Comment added successfully');
                    window.location.reload();
                } else {
                    console.error('Error adding comment');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    document
        .querySelector('#comment-form')
        .addEventListener('submit', commentFormHandler);
});
