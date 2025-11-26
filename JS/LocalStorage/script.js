const storage = {
    get(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    push(key, item) {
        const data = this.get(key);
        data.push(item);
        this.set(key, data);
        return data;
    },
    update(key, updatedItem) {
        let data = this.get(key);
        data = data.map(item => item.id === updatedItem.id ? updatedItem : item);
        this.set(key, data);
        return data;
    },
    remove(key, id) {
        let data = this.get(key);
        data = data.filter(item => item.id !== id);
        this.set(key, data);
        return data;
    }
};


function uuid() {
    return crypto.randomUUID ? crypto.randomUUID() :
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
}

function renderBlogs(blogs) {
    const tbody = document.getElementById("blogTableBody");
    tbody.innerHTML = blogs.map(blog => `
        <tr>
            <td>${blog.id}</td>
            <td>${blog.title}</td>
            <td>${blog.content}</td>
            <td>
                ${blog.image ? `<img src="${blog.image}" class="blogImageCell">` : "—"}
            </td>
            <td>
                <button class="editBtn" onclick="editBlog('${blog.id}')">Edit</button>
                <button class="deleteBtn" onclick="deleteBlog('${blog.id}')">Delete</button>
            </td>
        </tr>
    `).join("");
}

function loadBlogs() {
    const blogs = storage.get("blogs");
    renderBlogs(blogs);
}

document.getElementById("blogForm").addEventListener("submit", e => {
    e.preventDefault();

    const title = blogTitle.value.trim();
    const content = blogContent.value.trim();
    const image = blogImage.value.trim();

    if (!title || !content) {
        alert("Title and content are required!");
        return;
    }

    const newBlog = {
        id: uuid(),
        title,
        content,
        image
    };

    const updatedBlogs = storage.push("blogs", newBlog);
    renderBlogs(updatedBlogs);

    e.target.reset();
});
function deleteBlog(id) {
    const blogs = storage.get("blogs");
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;

    const ok = confirm(`Delete blog:\n\n"${blog.title}"?\n\nThis action cannot be undone.`);
    if (!ok) return;

    const updatedBlogs = storage.remove("blogs", id);
    renderBlogs(updatedBlogs);
}
function editBlog(id) {
    const blogs = storage.get("blogs");
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;

    blogTitle.value = blog.title;
    blogContent.value = blog.content;
    blogImage.value = blog.image;

    const form = document.getElementById("blogForm");
    const submitBtn = form.querySelector("button");
    submitBtn.textContent = "Save Changes";

    form.onsubmit = null;

    form.onsubmit = function (e) {
        e.preventDefault();

        blog.title = blogTitle.value.trim();
        blog.content = blogContent.value.trim();
        blog.image = blogImage.value.trim();

        const updatedBlogs = storage.update("blogs", blog);
        renderBlogs(updatedBlogs);

        form.reset();
        submitBtn.textContent = "Create Blog";

        form.onsubmit = addDefaultHandler;
    };
}
function addDefaultHandler(e) {
    e.preventDefault();

    const title = blogTitle.value.trim();
    const content = blogContent.value.trim();
    const image = blogImage.value.trim();

    if (!title || !content) {
        alert("Title and content are required!");
        return;
    }

    const newBlog = {
        id: uuid(),
        title,
        content,
        image
    };

    const updatedBlogs = storage.push("blogs", newBlog);
    renderBlogs(updatedBlogs);

    e.target.reset();
}


document.getElementById("blogForm").addEventListener("submit", addDefaultHandler);


loadBlogs();
