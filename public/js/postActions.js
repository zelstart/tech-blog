document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-post')) {
        const postId = event.target.dataset.id;

        try {
            const response = await fetch(`/deletepost/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.location.href = '/dashboard';
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the post');
        }
    }
});
