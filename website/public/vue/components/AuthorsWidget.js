let obj = Vue.component('authors-widget', {
    props: ['authors'],
    template: `
        <div>
            <p v-for="item in authors" >{{ item.firstname }} {{ item.lastname }}</p>
        </div>
    `
  }
  );

  export default obj;