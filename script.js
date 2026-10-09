$(document).ready(function () {

  /* ========== PRODUCT DATA ========== */
  var products = [
    { name: "Benguet Arabica (250g)", price: 350, qty: 0 },
    { name: "Batangas Barako (250g)", price: 300, qty: 0 },
    { name: "Sagada Blend (250g)", price: 380, qty: 0 },
    { name: "Cold Brew Bottle (500ml)", price: 220, qty: 0 },
    { name: "Ceramic Mug", price: 250, qty: 0 },
    { name: "Pour-Over Set", price: 899, qty: 0 }
  ];

  /* ========== CART ========== */
  // Show every product that has qty more than 0, then update total and count
  function showCart() {
    var html = "";
    var total = 0;
    var count = 0;

    $.each(products, function (i, p) {
      if (p.qty > 0) {
        total = total + p.price * p.qty;
        count = count + p.qty;
        html += '<div class="d-flex justify-content-between align-items-center border-bottom py-2">';
        html += '  <div><strong>' + p.name + '</strong><br>₱' + p.price + '</div>';
        html += '  <div>';
        html += '    <button class="btn btn-sm btn-outline-secondary minus-btn" data-index="' + i + '">-</button> ';
        html += p.qty;
        html += '    <button class="btn btn-sm btn-outline-secondary add-btn" data-index="' + i + '">+</button>';
        html += '    <button class="btn btn-sm btn-danger remove-btn" data-index="' + i + '">✕</button>';
        html += '  </div>';
        html += '</div>';
      }
    });

    if (count == 0) { html = "<p>Your cart is empty.</p>"; }

    $("#cartItems").html(html);
    $("#cartTotal").text(total);
    $("#cartCount").text(count);
  }

  // Button clicks. $(this) = the button that was clicked,
  // and .data("index") reads its data-index to know which product it is.
  $(document).on("click", ".add-btn", function () {      // "Add to Cart" and "+"
    var i = $(this).data("index");
    products[i].qty = products[i].qty + 1;
    showCart();
  });

  $(document).on("click", ".minus-btn", function () {    // "-"
    var i = $(this).data("index");
    products[i].qty = products[i].qty - 1;
    showCart();
  });

  $(document).on("click", ".remove-btn", function () {   // "✕"
    var i = $(this).data("index");
    products[i].qty = 0;
    showCart();
  });

  $("#checkoutBtn").click(function () {
    if ($("#cartCount").text() == 0) {
      alert("Your cart is empty.");
      return;
    }
    $("#paidTotal").text($("#cartTotal").text());       // show the total in the pop-up
    $.each(products, function (i, p) { p.qty = 0; });   // empty the cart
    showCart();
    new bootstrap.Modal($("#successModal")[0]).show();  // show the success pop-up
  });

  /* ========== REVIEW DATA ========== */
  var reviews = [
    { name: "Maria S.", rating: 5, text: "The Benguet Arabica is the best coffee I've had. Fresh and smooth!" },
    { name: "Jun D.", rating: 4, text: "Strong barako, fast delivery. Will order again." }
  ];

  /* ========== SHOW REVIEWS ========== */
  function showReviews() {
    var html = "";
    $.each(reviews, function (i, r) {
      html += '<div class="card p-3 mb-3">';
      html += '  <div class="text-warning">' + "★".repeat(r.rating) + "☆".repeat(5 - r.rating) + '</div>';
      html += '  <p class="mb-1">' + r.text + '</p>';
      html += '  <small class="text-muted">- ' + r.name + '</small>';
      html += '</div>';
    });
    $("#reviewList").html(html);
  }

  /* ========== SUBMIT A REVIEW ========== */
  // The browser already checks the "required" fields, so this only runs when the form is complete
  $("#reviewForm").on("submit", function (e) {
    e.preventDefault();                       // stop the page from reloading
    reviews.unshift({                         // unshift = add to the top of the list
      name: $("#revName").val(),              // .val() = what the user typed
      rating: Number($("#revRating").val()),
      text: $("#revText").val()
    });
    this.reset();                             // clear the form
    showReviews();
  });

  /* ========== CONTACT FORM ========== */
  // The browser already checks the "required" fields, so this only runs when the form is complete
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();                          // stop the page from reloading
    $("#contactAlert").removeClass("d-none");    // show the "message sent" alert
    this.reset();                                // clear the form
  });

  /* ========== RUN WHEN THE PAGE LOADS ========== */
  showCart();
  showReviews();
});