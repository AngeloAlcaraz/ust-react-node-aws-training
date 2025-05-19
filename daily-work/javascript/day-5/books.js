const API_URL = "http://localhost:3000/books";
let editId = null;
let postIdToDelete = null;

// Fetch Post function
async function fetchPosts() {
  const res = await fetch(API_URL + "?_limit=5");
  const posts = await res.json();
  const list = document.getElementById("postList");
  list.innerHTML = "";
  posts.forEach((post) => {
    list.innerHTML += `
            <tr>
              <th scope="row">${post.id}</th>
              <td>${post.title}</td>
              <td>${post.author || ""}</td>
              <td>
                <button 
                  class="btn btn-sm btn-primary me-2" 
                  title="Edit" 
                  onclick="startEdit('${post.id}', '${post.title.replace(
      /'/g,
      "\\'"
    )}', '${(post.author || "").replace(/'/g, "\\'")}')">
                  <i class="bi bi-pencil-fill"></i>
                </button>
                <button 
                  class="btn btn-sm btn-danger" 
                  title="Delete" 
                  onclick="deletePost('${post.id}')">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
        `;
  });
}

// Create or Update function
async function createOrUpdatePost(event) {
  event.preventDefault(); // Avoid submit

  const saveBtn = document.getElementById("saveBtn");
  const titleInput = document.getElementById("titleInput");
  const authorInput = document.getElementById("authorInput");
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  //Disable button while processing
  saveBtn.disabled = true;

  const method = editId ? "PUT" : "POST";
  const url = editId ? `${API_URL}/${editId}` : API_URL;

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    if (!response.ok) {
      showToast("Error saving book", "error");
      return;
    }

    showToast(editId ? "Book updated!" : "Book added!", "success");

    titleInput.value = "";
    authorInput.value = "";
    editId = null;

    // Close modal
    const modalEl = document.getElementById("bookModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    fetchPosts();
  } catch (error) {
    showToast("Error saving book", "error");
  } finally {
    // Enable save button again.
    saveBtn.disabled = false;
  }
}

// Associate the submit button form.
document
  .getElementById("bookForm")
  .addEventListener("submit", createOrUpdatePost);

// Modal Edit
function startEdit(id, title, author) {
  document.getElementById("titleInput").value = title;
  document.getElementById("authorInput").value = author || "";
  editId = id;

  // Open modal
  const modalEl = document.getElementById("bookModal");
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

// Delete function
async function deletePost(id) {
  postIdToDelete = id;

  const deleteModalEl = document.getElementById("deleteModal");
  const deleteModal = new bootstrap.Modal(deleteModalEl);
  deleteModal.show();
}

//FilterBooks function
function filterBooks() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#postList tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

// Delete modal functionality
document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", async () => {
    if (!postIdToDelete) return;

    try {
      const response = await fetch(`${API_URL}/${postIdToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        showToast("Error deleting post");
        return;
      }

      const deleteModalEl = document.getElementById("deleteModal");
      const deleteModal = bootstrap.Modal.getInstance(deleteModalEl);
      deleteModal.hide();

      showToast("Post deleted!");
      fetchPosts();

      postIdToDelete = null;
    } catch (error) {
      showToast("Error deleting post");
    }
  });

// Toast function
function showToast(message) {
  const toastEl = document.getElementById("messageToast");
  const toastBody = document.getElementById("toastBody");
  toastBody.textContent = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// Listen to form submit
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  createOrUpdatePost();
});

// Load data on start
window.onload = fetchPosts;
