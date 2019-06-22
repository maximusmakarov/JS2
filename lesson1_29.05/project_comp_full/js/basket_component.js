Vue.component('basket', {
	data(){
		return{
			cartUrl: `/getBasket.json`,
			basket: [],
			invisible: false,
			img: `https://placehold.it/50x100`,

		}
	},
	mounted(){
		this.$parent.getJson(`${API + this.cartUrl}`)
			.then(data => {
				for (let el of data.contents) {
					this.basket.push(el);
				}
			});

	},
	methods: {
		showCart: function () {
			this.invisible = !this.invisible;
		},
		addProduct(product){
			this.$parent.getJson(`${API}/addToBasket.json`)
				.then(data => {
					if(data.result){
						let find = this.basket.find(el => el.id_product === product.id_product);
						if(find){
							find.quantity++
						} else {
							let prod = Object.assign({quantity: 1}, product);
							this.basket.push(prod);
						}
					} else {
						console.log('error!')
					}
				})
		},
		remove(product){
			this.$parent.getJson(`${API}/deleteFromBasket.json`)
				.then(data => {
					if(data.result){
						if(product.quantity > 1){
							product.quantity--
						} else {
							this.basket.splice(this.basket.indexOf(product), 1);
						}
					} else {
						console.log('error!')
					}
				})
		},
	},
	template: `
			<div>
	            <button class="btn-cart" @click="showCart" type="button">Корзина</button>
				<div class="cart-block" v-if="invisible">
					<p v-if="!basket.length">Корзина пуста</p>
					<basket-item 
					v-for="product of basket"
					:key="product.id_product"
					:img="img"
					:cart-item="product">
		            @remove="remove"></basket-item>
				</div>
			</div>`
});

Vue.component('basket-item', {
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
					<p class="product-price"> $ {{cartItem.price*cartItem.quantity}}</p>
					<button class="del-btn" @click="$root.$refs.basket.remove(cartItem)">&times;</button>
				</div>
			</div>`
});