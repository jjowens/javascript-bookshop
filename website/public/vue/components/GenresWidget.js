let obj = Vue.component('genres-widget', {
    props: ['genres'],
    template: `
        <div>
            <p class="capitalize cursor-pointer" v-on:click="$emit('clear-genrefilter')">Clear All</p>
            <p v-for="genre in genres" 
            v-bind:genre="genre" class="capitalize cursor-pointer" v-on:click="$emit('filter-genre', genre)">{{ genre.name }} {{ genre.HideFlag }}</p>
        </div>
    `
  });

  export default obj;