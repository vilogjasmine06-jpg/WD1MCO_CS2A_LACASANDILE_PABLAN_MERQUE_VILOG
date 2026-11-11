let cartItems = [];

        function addToCart(productName, productPrice) {
            let existingItem = cartItems.find(item => item.name.toLowerCase() === productName.toLowerCase());
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ name: productName, price: productPrice, quantity: 1 });
            }
            renderCart();
            alert(productName + " - ₱" + productPrice.toLocaleString() + " added to cart");
        }

        function changeQty(index, amount) {
            cartItems[index].quantity += amount;
            if (cartItems[index].quantity <= 0) {
                cartItems.splice(index, 1);
            }
            renderCart();
        }

        function removeItem(index) {
            cartItems.splice(index, 1);
            renderCart();
        }

        function clearList() {
            cartItems = [];
            renderCart();
        }

        function renderCart() {
            var list = document.getElementById("groceryList");
            var cartTitle = document.getElementById("cart-title");
            var totalDisplay = document.getElementById("total-amount");

            if (!list) return;

            list.innerHTML = "";
            let total = 0;
            let totalCount = 0;

            cartItems.forEach((item, index) => {
                let subtotal = item.price * item.quantity;
                total += subtotal;
                totalCount += item.quantity;

                var row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>₱${item.price.toLocaleString()}</td>
                    <td>
                        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    </td>
                    <td>₱${subtotal.toLocaleString()}</td>
                    <td><button class="del-btn" onclick="removeItem(${index})">×</button></td>
                `;
                list.appendChild(row);
            });

            if (cartTitle) cartTitle.textContent = `Shopping Cart (${totalCount})`;
            if (totalDisplay) totalDisplay.textContent = "₱" + total.toLocaleString();
        }

        function proceedToCheckout() {
            if (cartItems.length === 0) {
                alert("Your cart is empty! Please add items before checking out.");
                return;
            }

            let total = 0;
            cartItems.forEach(item => total += item.price * item.quantity);

            alert("Thank you for your purchase! Your total amount is ₱" + total.toLocaleString());
            cartItems = [];
            renderCart();
        }