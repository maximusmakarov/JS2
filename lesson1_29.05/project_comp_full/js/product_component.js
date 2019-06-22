Vue.component('products', {
	data(){
		return {
			catalogUrl: `/catalogData.json`,
			products: [],
			filtered: [],
			img: `https://placehold.it/200x150`,
		}
	},

	methods: {
		filter(value){
			let regexp = new RegExp(value, 'i');
			this.filtered = this.products.filter(el => regexp.test(el.product_name));
		}
	},

	// watch: {
	// 	searchStr: function () {
	// 		if (this.searchStr !== '') {
	// 			this.products.forEach(el => {
	// 				let _name = el.product_name.toLowerCase();
	// 				let _searchStr = this.searchStr.toLowerCase();
	// 				// console.log(_name.indexOf(_searchStr) >= 0);
	// 				if(_name.indexOf(_searchStr) >= 0){
	// 					el.visible = 'visible';
	// 				} else {
	// 					el.visible = 'invisible';
	// 				}
	// 			});
	// 		}else {
	// 			this.products.forEach(el => {
	// 				el.visible = 'visible';
	// 			});
	// 		}
	// 	}
	// },

	// computed: {
	// 	productList: function () {
	// 		let allProduct = this.products;
	// 		return this.products;
	// 	}
	// },

	mounted() {
		this.$parent.getJson(`${API + this.catalogUrl}`)
			.then(data => {
				for(let el of data){
					this.products.push(el);
					this.filtered.push(el);
				}
			});
		this.$parent.getJson(`getProducts.json`)
			.then(data => {
				for(let el of data){
					this.products.push(el);
					this.filtered.push(el);
				}
			})
	},

template: `
			<div class="products">
                <product 
                :class="{invisible: product.visible === 'invisible'}" 
                v-for="product of filtered" 
                :key="product.id_product"
                :product="product"
                :img="img"></product>
            </div>`
});

Vue.component('product', {
	props: ['product', 'img'],
	template: `
			<div  class="product-item">
                <img :src="img" :alt="product.product_name">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$root.$refs.basket.addProduct(product)">Купить</button>
                </div>
            </div>`
});