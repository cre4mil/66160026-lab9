document.addEventListener("DOMContentLoaded", async () => {
  const postsList = document.getElementById("posts-list");
  const userNameSpan = document.getElementById("user-name");

  // ดึง id ของผู้ใช้จาก URL
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  // จัดการ error
  try {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!userResponse.ok) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
    const user = await userResponse.json();
    userNameSpan.textContent = user.name;

    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!postsResponse.ok) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลโพสต์");
    const posts = await postsResponse.json();

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <button class="toggle-comments-btn">ดูความคิดเห็น</button>
          <div class="comments" style="display: none;"></div>
        `;
      postElement.classList.add("post-item");
      postsList.appendChild(postElement);

      const toggleCommentsBtn = postElement.querySelector(
        ".toggle-comments-btn"
      );
      const commentsDiv = postElement.querySelector(".comments");

      toggleCommentsBtn.addEventListener("click", async () => {
        if (commentsDiv.style.display === "none") {
          try {
            const commentsResponse = await fetch(
              `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
            );
            if (!commentsResponse.ok)
              throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลความคิดเห็น");
            const commentsData = await commentsResponse.json();

            commentsDiv.innerHTML = commentsData
              .map(
                (comment) => `
                <div class="comment">
                  <strong>${comment.email}</strong>
                  <p>${comment.body}</p>
                </div>
              `
              )
              .join("");
            commentsDiv.style.display = "block";
            toggleCommentsBtn.textContent = "ซ่อนความคิดเห็น";
          } catch (error) {
            console.error("Error:", error);
            commentsDiv.innerHTML = "<p>Failed to load comments.</p>";
          }
        } else {
          commentsDiv.style.display = "none";
          toggleCommentsBtn.textContent = "ดูความคิดเห็น";
        }
      });
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    postsList.innerHTML = "<p>โหลดโพสต์ไม่สำเร็จ</p>";
  }
});
