document.addEventListener("DOMContentLoaded", async () => {
  const userDetail = document.getElementById("user-detail");

  // ดึง id ของผู้ใช้จาก URL
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  if (!userId) {
    userDetail.innerHTML = "<p>ไม่พบข้อมูลผู้ใช้</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await response.json();

    const userElement = document.createElement("div");
    userElement.innerHTML = `
          <h2>${user.name}🍀</h2>
          <p><strong>อีเมล :</strong><br>${user.email}</p>
          <p><strong>ชื่อผู้ใช้ :</strong><br>${user.username}</p>
          <p><strong>โทรศัพท์ :</strong><br>${user.phone}</p>
          <p><strong>เว็บไซต์ :</strong><br>${user.website}</p>
          <p><strong>ที่อยู่ :</strong><br>${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
          <p><strong>บริษัท :</strong><br>${user.company.name}</p>
        `;
    userDetail.appendChild(userElement);

    // เพิ่มการคลิกปุ่ม "ดูโพสต์ทั้งหมด"
    const viewPostsButton = document.getElementById("view-posts");
    viewPostsButton.addEventListener("click", () => {
      window.location.href = `user-posts.html?id=${userId}`;
    });
  } catch (error) {
    console.error("Error:", error);
    userDetail.innerHTML = `<p>เกิดข้อผิดพลาดในการโหลดข้อมูล: ${error.message}</p>`;
  }
});
