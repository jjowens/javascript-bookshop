let obj = Vue.component('genres-widget', {
    props: ['genres'],
    template: `
        <div>
            <p v-for="genre in genres" v-bind:genre="genre" class="capitalize cursor-pointer">{{ genre }}</p>
        </div>
    `
  });

  export default obj;