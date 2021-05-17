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
        shoppingbasket: {
            items: [],
            total: 0,
            currency: "£",
            totalStr: "£0.00"
        },
        filteredGenres: [],
        filteredAuthorsTest: []
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
                let tempBooks = response.data.books;

                tempBooks = tempBooks.map(self.addBookProps);
                tempBooks = tempBooks.map(self.addGenreListProp);

                tempBooks.forEach(book => {
                    book.genres = book.genres.map(self.addGenreProps);
                });

                self.books = tempBooks;
                self.genres = response.data.genres.map(self.addGenreProps);
            }).catch(function (error) {
                console.log("Exception caught");
                console.log(error);
            })
            .then(function () {
                
            });
        },
        addProps: function(obj) {
            obj.HideFlag = false;
            return obj;
        },
        addBookProps: function(obj) {
            obj.HideFlag = false;
            obj.AddedToBasket = false;
            return obj;
        },
        addGenreProps: function(obj) {
            let newObj = {};
            newObj.name = obj;
            newObj.HideFlag = false;
            return newObj;
        },
        addGenreListProp: function(obj) {
            obj.GenreList = obj.genres.join(", ");
            return obj;
        },
        onAddToBasket: function(obj) {
            let item = {};
            item.book = obj;
            item.quantity = 1;
            obj.AddedToBasket = true;
            this.shoppingbasket.items.push(obj);

            this.updateShoppingBasketTotal();
        },
        onRemoveFromBasket: function(obj) {
            let newObj = this.shoppingbasket.items.find(item => item.title === obj.title);
            let idx = this.shoppingbasket.items.indexOf(newObj);

            console.log(idx);

            if (idx > -1) {
                this.shoppingbasket.items.splice(idx, 1);
                console.log(idx);
                obj.AddedToBasket = false;
            }
            this.updateShoppingBasketTotal();
        },
        updateShoppingBasketTotal: function() {
            let total = 0;
            this.shoppingbasket.items.map(function(item) { total += item.price; });

            this.shoppingbasket.total = total;
            this.shoppingbasket.totalStr = this.shoppingbasket.currency + total.toFixed(2); 
        },
        onClearBasket: function() {
            this.shoppingbasket.items = [];
            this.shoppingbasket.total = 0;
            this.shoppingbasket.totalStr = this.shoppingbasket.currency + this.shoppingbasket.total.toFixed(2);
            this.books.map(book => book.AddedToBasket = false);
        },
        onFilterGenre: function(obj) {
            let searchObj =  this.genres.find(el => el.name === obj.name);

            if (searchObj !== undefined) {
                searchObj.HideFlag = !searchObj.HideFlag;
            }

            this.onFilterBooks();
        },
        onFilterBooks: function() {
            let filterGenres = this.genres.filter(el => el.HideFlag === true);
            let hideFlag = (filterGenres.length > 0);

            this.books.map(book => {
                book.HideFlag = hideFlag;
            });

            if (filterGenres !== undefined) {
                for (let filterIdx = 0; filterIdx < filterGenres.length; filterIdx++) {
                    const filterGenre = filterGenres[filterIdx];

                    let bookGenres = this.books.filter(book => book.GenreList.indexOf(filterGenre.name) > -1);

                    if (bookGenres.length > -1) {
                        bookGenres.map(book => {
                            book.HideFlag = false;
                        });
                    }
                }
            }            
        },
        onClearGenreFilter: function() {
            this.books.map(book => book.HideFlag = false);
            this.genres.map(book => book.HideFlag = false);
        }
    },
    mounted: function() {
        this.getData();
    },
    computed: {
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