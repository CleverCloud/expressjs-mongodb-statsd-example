document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('createForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('value');
    const val = input.value.trim();

    if (!val) {
      alert('Value field must not be empty');
      return;
    }

    try {
      const res = await fetch(form.action, {
        method: form.method,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form))
      });
      const data = await res.json();

      if (data.status === 'ok') {
        addItem(data.value, data.id);
        input.value = '';
      } else {
        showError(data.value);
      }
    } catch {
      showError('Request failed');
    }
  });
});

function addItem(value, id) {
  const list = document.getElementById('list');
  const li = document.createElement('li');
  li.id = id;
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML =
    `<span>${escapeHtml(value)}</span>` +
    `<button class="btn btn-danger btn-sm" data-id="${id}" onclick="deleteItem(this)">Delete</button>`;
  list.appendChild(li);
}

async function deleteItem(btn) {
  const id = btn.dataset.id;
  try {
    const res = await fetch(`/values/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.status === 'ok') {
      document.getElementById(data.value)?.remove();
    } else {
      showError(data.value);
    }
  } catch {
    showError('Request failed');
  }
}

function showError(message) {
  document.getElementById('errorField').textContent = message;
  const modal = new bootstrap.Modal(document.getElementById('errorModal'));
  modal.show();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
