let obj = Vue.component('genres-widget', {
    props: ['genres'],
    template: `
        <div>
            <p class="filter-text" v-on:click="$emit('clear-genrefilter')">Clear All</p>
            <p v-for="genre in genres" 
            v-bind:genre="genre" class="filter-text" 
            v-on:click="$emit('filter-genre', genre)"
            v-bind:class="{ 'filter-highlight': genre.HideFlag }"
            >{{ genre.name }}</p>
        </div>
    `
  });

  export default obj;