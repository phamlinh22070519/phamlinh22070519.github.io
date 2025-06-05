// JavaScript functionality for the computer parts website

document.addEventListener("DOMContentLoaded", function () {
  // Menu toggle functionality
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  let menuVisible = true;

  menuToggle.addEventListener("click", function () {
    if (menuVisible) {
      mainNav.style.display = "none";
      menuToggle.textContent = "Hiện Menu";
      menuVisible = false;
    } else {
      mainNav.style.display = "flex";
      menuToggle.textContent = "Ẩn/hiện Menu";
      menuVisible = true;
    }
  });

  // Sort by price functionality
  const sortButton = document.querySelector(".btn-secondary");
  const tableBody = document.querySelector(".product-table tbody");
  let sortAscending = true;

  sortButton.addEventListener("click", function () {
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const priceA = parseInt(a.cells[1].textContent);
      const priceB = parseInt(b.cells[1].textContent);

      if (sortAscending) {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    // Clear table body and append sorted rows
    tableBody.innerHTML = "";
    rows.forEach((row) => tableBody.appendChild(row));

    // Toggle sort direction for next click
    sortAscending = !sortAscending;

    // Update button text
    sortButton.textContent = sortAscending
      ? "Sắp xếp theo giá (Tăng)"
      : "Sắp xếp theo giá (Giảm)";
  });

  // Order button functionality
  const orderButton = document.querySelector(".btn-primary");
  orderButton.addEventListener("click", function () {
    const selectedItems = [];
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row) => {
      const itemName = row.cells[0].textContent;
      const itemPrice = row.cells[1].textContent;
      selectedItems.push(`${itemName}: ${itemPrice} VNĐ`);
    });

    alert("Đặt hàng thành công!\n\nSản phẩm:\n" + selectedItems.join("\n"));
  });

  // Contact form functionality
  const contactForm = document.querySelector(".contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Basic form validation
    if (!name || !email || !message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ!");
      return;
    }

    // Success message
    alert(
      `Cảm ơn ${name}!\nTin nhắn của bạn đã được gửi thành công.\nChúng tôi sẽ phản hồi qua email: ${email}`
    );

    // Reset form
    contactForm.reset();
  });

  // Add hover effects to table rows
  const tableRows = document.querySelectorAll(".product-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f8f9fa";
    });

    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // Price formatting
  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN").format(price);
  }

  // Format all prices in the table
  const priceCells = document.querySelectorAll(
    ".product-table tbody td:nth-child(2)"
  );
  priceCells.forEach((cell) => {
    const price = parseInt(cell.textContent);
    cell.textContent = formatPrice(price);
  });

  // Add click-to-select functionality for table rows
  tableRows.forEach((row) => {
    row.addEventListener("click", function () {
      // Remove previous selection
      tableRows.forEach((r) => r.classList.remove("selected"));

      // Add selection to clicked row
      this.classList.add("selected");
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only prevent default if it's an anchor link
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
});

// Additional utility functions
function addNewProduct(name, price, rating) {
  const tableBody = document.querySelector(".product-table tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td>${rating}/5</td>
    `;

  tableBody.appendChild(newRow);
}

function removeProduct(productName) {
  const tableRows = document.querySelectorAll(".product-table tbody tr");
  tableRows.forEach((row) => {
    if (row.cells[0].textContent === productName) {
      row.remove();
    }
  });
}
