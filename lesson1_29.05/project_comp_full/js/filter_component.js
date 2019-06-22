Vue.component('search', {
	data() {
		return {
			searchStr: '',
		}
	},
	template: `
			<form class="search-form" @submit.prevent="$root.$refs.products.filter(searchStr)" action="#" method="post">
                <input class="search-field" type="search" placeholder="Search" v-model="searchStr" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>`
});