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

                tempBooks = tempBooks.map(self.addProps);
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
            let searchResults = this.filteredGenres.find(el => el.name === obj.name);

            if (searchResults !== undefined) {
                let deleteIdx = this.filteredGenres.indexOf(searchResults);
                this.filteredGenres.splice(deleteIdx, 1);

                obj.HideFlag = true;
            } else {
                obj.HideFlag = true;
                this.filteredGenres.push(obj);
            }

            this.onFilterBooks();
        },
        onFilterBooks: function() {
            let hideFlag = !(this.filteredGenres.length === 0);

            this.books.map(book => {
                book.HideFlag = hideFlag;
            });

            this.filteredGenres.forEach(genre => {
                let bookGenres = this.books.filter(book => book.GenreList.indexOf(genre.name) > -1 && book.HideFlag === true);

                if (bookGenres.length > -1) {
                    bookGenres.map(book => {
                        book.HideFlag = false;
                    });
                }
                console.log("Filtered Genre: " + genre.name);
            });
        },
        onClearGenreFilter: function() {
            this.filteredGenres = [];
            this.books.map(book => book.HideFlag = false);
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