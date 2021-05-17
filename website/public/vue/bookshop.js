import BookWidget from './components/BookWidget.js';
import ShoppingBasket from './components/ShoppingBasket.js';
import AuthorsWidget from './components/AuthorsWidget.js';
import GenresWidget from './components/GenresWidget.js';

let vm = new Vue({
    el: '#app',
    data: {
        books: [],
        authors: [],
        genres: [],
        testMessage: 'This is a test',
        shoppingbasket: {
            items: [],
            total: 0,
            currency: "£",
            totalStr: "£0.00"
        },
        filteredGenres: []
    },
    components: {
        'book-widget': BookWidget,
        'shopping-basket': ShoppingBasket,
        'author-widget': AuthorsWidget,
        'genre-widget': GenresWidget
    },
    methods: {
        getData: function() {
            let self = this;

            axios.get('public/data/data.json')
            .then(function (response) {
                console.log(response.data.books);
                self.books = response.data.books;
                self.authors = response.data.authors;
                self.genres = response.data.genres;
            }).catch(function (error) {
                console.log("Exception caught");
                console.log(error);
            })
            .then(function () {
                
            });
        },
        onAddToBasket: function(obj) {
            let item = {};
            item.book = obj;
            item.quantity = 1;

            this.shoppingbasket.total = this.shoppingbasket.total + obj.price;
            this.shoppingbasket.totalStr = this.shoppingbasket.currency + this.shoppingbasket.total.toFixed(2);

            this.shoppingbasket.items.push(obj);
        },
        onClearBasket: function() {
            this.shoppingbasket.items = [];
            this.shoppingbasket.total = 0;
            this.shoppingbasket.totalStr = this.shoppingbasket.currency + this.shoppingbasket.total.toFixed(2);
        },
        onFilterGenre: function(obj) {
            this.filteredGenres.push(obj);
            console.log({obj});
        }
    },
    mounted: function() {
        this.getData();
    },
    computed: {
        sortedAuthors: function() {
            return this.authors.sort((a,b) => {
                if(a.lastname < b.lastname) return -1;
                if(a.lastname > b.lastname) return 1;
                return 0;
            });
        },
        sortedGenres: function() {
            return this.genres.sort((a,b) => {
                if(a < b) return -1;
                if(a > b) return 1;
                return 0;
            });
        },
        sortedBooks: function() {
            return this.books.sort((a,b) => {
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            });
        }
    }
})

export default vm;