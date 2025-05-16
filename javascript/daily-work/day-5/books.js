const API_URL = "http://localhost:3000/books";
let editId = null;

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
async function createOrUpdatePost() {
  const titleInput = document.getElementById("titleInput");
  const authorInput = document.getElementById("authorInput");
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  const method = editId ? "PUT" : "POST";
  const url = editId ? `${API_URL}/${editId}` : API_URL;

  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author }),
  });

  if (!response.ok) {
    alert("Error saving book");
    return;
  }

  alert(editId ? "Book updated!" : "Book added!");
  titleInput.value = "";
  authorInput.value = "";
  editId = null;

  // Close modal
  const modalEl = document.getElementById("bookModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  fetchPosts();
}

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

//Delete function
async function deletePost(id) {
  const confirmed = confirm("Are you sure you want to delete?");
  if (!confirmed) return;

  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    alert("Error deleting post");
    return;
  }

  alert("Post deleted!");
  fetchPosts();
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

// Listen to form submit
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  createOrUpdatePost();
});

// Load data on start
window.onload = fetchPosts;
