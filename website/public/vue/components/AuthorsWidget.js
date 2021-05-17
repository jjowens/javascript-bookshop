let obj = Vue.component('authors-widget', {
    props: ['authors'],
    template: `
        <div>
            <p v-for="item in authors" class="cursor-pointer" v-on:click="$emit('filter-author', item)">{{ item.firstname }} {{ item.lastname }}</p>
        </div>
    `
  }
  );

  export default obj;