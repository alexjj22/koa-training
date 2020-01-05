document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('avatar-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const file = document.querySelector('#avatar-form [type=file]').files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    fetch('/avatar', {
      method: 'POST',
      body: formData,
    });

    return;
  });
});
