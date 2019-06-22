Vue.component('basket', {
	props: ['basket', 'img', 'invisible'],
	template: `
			<div class="cart-block" v-if="invisible">
				<p v-if="!basket.length">Корзина пуста</p>
				<cart-item 
				v-for="product of basket"
				:key="product.id_product"
				:img="img"
				:cart-item="product">
				</cart-item>
			</div>`
});

Vue.component('cart-item', {
	props: ['cartItem', 'img'],
	template: `
			<div class="cart-item">
				<div class="product-bio">
					<img :src="img" alt="product.product_name">
					<div class="product-desc">
						<p class="product-title">{{cartItem.product_name}}</p>
						<p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
						<p class="product-single-price">$ {{cartItem.price}} each</p>
					</div>
				</div>
				<div class="right-block">
					<p class="product-price"> $ {{cartItem.price * cartItem.quantity}}</p>
					<button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
				</div>
			</div>`
});