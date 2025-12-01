let blogs = [];
const storageKey = "blogsData";

window.addEventListener("DOMContentLoaded", () => {
  loadBlogs();
  renderBlogs();
});

// generate ID
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

//save blogs
function saveBlogs() {
  localStorage.setItem(storageKey, JSON.stringify(blogs));
}

function loadBlogs() {
  const storedBlogs = localStorage.getItem(storageKey);

  if (storedBlogs) blogs = JSON.parse(storedBlogs);
}

//renderTable
function renderBlogs() {
  const blogTableBody = document.getElementById("blogTableBody");
  blogTableBody.innerHTML = "";

  blogs.forEach((blog) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${blog.id}</td>
            <td>${blog.title}</td>
            <td>${blog.content}</td>
            <td><img class="blogImageCell" src='${blog.image}'/></td>
            <td id="buttonTd">
              <button class="buttonTableBody" onclick="editBlog('${blog.id}')">Edit</button>
              <button class="buttonTableBody" onclick="deleteBlog('${blog.id}')">Delete</button>
            </td>
        `;

    blogTableBody.appendChild(tr);
  });
}

//add newBlog
document.getElementById("blogForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;
  const image = document.getElementById("blogImage").value;

  const newBlog = {
    id: uuidv4(),
    title: title,
    content: content,
    image: image,
  };

  blogs.push(newBlog);
  //console.log(blogs);
  saveBlogs();
  clearForm();
  renderBlogs();
});

function clearForm() {
  document.getElementById("blogTitle").value = "";
  document.getElementById("blogImage").value = "";
  document.getElementById("blogContent").value = "";
}

function deleteBlog(id) {
  const alertMsg = `Do you really want to delete this blog with id ${id}?`;

  if (confirm(alertMsg)) {
    blogs = blogs.filter((blog) => blog.id !== id);
    saveBlogs();
    renderBlogs();
  }
}

//editBlog
function editBlog(id) {
  const blog = blogs.find((b) => b.id === id);
  console.log(id);

  if (!blog) return;

  const editForm = document.getElementById("editForm");
  const divOverlay = document.getElementById("editOverlay");

  document.getElementById("editBlogID").value = blog.id;
  document.getElementById("editBlogTitle").value = blog.title;
  document.getElementById("editBlogContent").value = blog.content;
  document.getElementById("editBlogImage").value = blog.image;

  editForm.style.display = "flex";
  divOverlay.style.display = "block";
}

function resetBtn() {
  document.getElementById("editBlogTitle").value = "";
  document.getElementById("editBlogContent").value = "";
  document.getElementById("editBlogImage").value = "";
}

function updateBlog() {
  const id = document.getElementById("editBlogID").value;
  //console.log("barano ID", id);
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return;

  blog.title = document.getElementById("editBlogTitle").value;
  blog.content = document.getElementById("editBlogContent").value;
  blog.image = document.getElementById("editBlogImage").value;

  saveBlogs();
  renderBlogs();

  alert("Blog is updated");
}

function closeEditForm() {
  document.getElementById("editForm").style.display = "none";
  document.getElementById("editOverlay").style.display = "none";
}

function closeLoginForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("loginDiv").style.display = "none";
}

//user adding
localStorage.setItem(
  "users",
  JSON.stringify([
    {
      username: "filip",
      password: "1234",
      gender: "male",
      dateofBirth: "10/21/1994",
    },
  ])
);

// LOGIN
function logIn() {
  const password = document.getElementById("passwordInput").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const matchedUser = users.find((u) => u.password === password);

  if (!matchedUser) {
    alert("Incorrect password or user does not exist!");
    return;
  } else if (matchedUser.password == "1234") {
    document.getElementById("adminMain").style.display = "block";
    document.getElementById("loginDiv").style.display = "none";
  }
  //alert("Login successful!");
}

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("passwordInput");

  passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      logIn();
    }
  });
});
