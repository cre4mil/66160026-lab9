document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
  
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((user) => {
          const userCard = document.createElement("div");
          userCard.classList.add("user-card");
          userCard.innerHTML = `
              <a href="user-detail.html?id=${user.id}" style="text-decoration: none; color: inherit;">
                  <h3>${user.name}</h3>
                  <p>${user.email}</p>
              </a>
          `;
          userList.appendChild(userCard);
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        userList.innerHTML = "<p>โหลดโพสต์ไม่สำเร็จ</p>";
      });
  });
  