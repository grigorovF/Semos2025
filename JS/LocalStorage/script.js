let blogs = [];

/* Load blogs from LS on start */
window.onload = () => {
  const saved = localStorage.getItem("blogs");
  blogs = saved ? JSON.parse(saved) : [];
  renderBlogsTable();
};

/* Generate simple ID */
function uuid() {
  return Math.floor(Math.random() * 1000000000);
}

/* Add BLOG */
document.getElementById("blogForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("blogTitle").value.trim();
  const content = document.getElementById("blogContent").value.trim();
  const image = document.getElementById("blogImage").value.trim();

  const newBlog = {
    id: uuid(),
    title,
    content,
    image
  };

  blogs.push(newBlog);
  saveLS();
  renderBlogsTable();

  this.reset();
});

/* Render table */
function renderBlogsTable() {
  const body = document.getElementById("blogTableBody");
  body.innerHTML = "";

  blogs.forEach(blog => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${blog.id}</td>
      <td>${blog.title}</td>
      <td>${blog.content}</td>
      <td><img src="${blog.image}" class="blogImageCell"></td>
      <td>
        <button onclick="editBlog(${blog.id})">Edit</button>
        <button onclick="deleteBlog(${blog.id})">Delete</button>
      </td>
    `;

    body.appendChild(tr);
  });
}

function deleteBlog(id) {
  const answer = confirm('Do you really want to delete this blog?');

  if (answer) {
    blogs = blogs.filter(b => b.id !== id);
    saveLS();
    renderBlogsTable();
  }
}

function editBlog(id) {
  const blog = blogs.find(b => b.id === id);

  const newTitle = prompt("New title:", blog.title);
  if (newTitle === null) return;

  const newContent = prompt("New content:", blog.content);
  if (newContent === null) return;

  const newImage = prompt("New image URL:", blog.image);
  if (newImage === null) return;

  blog.title = newTitle;
  blog.content = newContent;
  blog.image = newImage;

  saveLS();
  renderBlogsTable();
}

function saveLS() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}
