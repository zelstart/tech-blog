document.addEventListener('DOMContentLoaded', () => {
    const updatePostForm = document.getElementById('update-post-form');

    updatePostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const postId = updatePostForm.getAttribute('action').split('/').pop();
        const title = updatePostForm.querySelector('#title').value;
        const body = updatePostForm.querySelector('#body').value;

        try {
            const response = await fetch(`/updatepost/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            if (response.ok) {
                window.location.replace('/dashboard'); 
            } else {
                const errorMessage = await response.text();
                console.log(errorMessage);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the post');
        }
    });
});
