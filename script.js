const buttons = document.querySelectorAll(".cart");

buttons.forEach(function(btn) {

	btn.addEventListener("click", function() {

		alert("Product added to cart!");

	});

});