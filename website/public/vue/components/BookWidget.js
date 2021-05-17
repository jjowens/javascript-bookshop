let obj = Vue.component('book-widget', {
    props: ['book'],
    template: `
      <div class="book-widget" v-show="!book.HideFlag">
        <div>
            <h3 :title="book.title">{{ book.title }}</h3>
            <p><span v-for="author in book.authors">{{ author.fullname }}</span></p>
        </div>
        <div class="float-left">
            <p class="object-left=top" :title="book.title"><img src="/public/images/book-cover-default.jpg" /></p>
        </div>
        <div class="float-right m-2">
            £{{ book.price }}<br/>
            <button class='blue-button' v-on:click="$emit('add-to-basket', book)" v-show="!book.AddedToBasket">Add To Basket</button>
            <button class='orange-button' v-on:click="$emit('removefrom-basket', book)" v-show="book.AddedToBasket">Remove</button>
        </div>
        <div class="clear-both bg-blue-200">
            <span v-for="genre in book.genres" v-bind:genre="genre" class="genre-tag cursor-pointer" v-on:click="$emit('filter-genre', genre)">{{ genre.name }} </span>
        </div>
      </div>
    `
  });

export default obj;
