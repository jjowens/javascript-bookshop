let obj = Vue.component('shopping-basket-widget', {
    props: ['shoppingbasket'],
    template: `
        <div >
            <p>
            Items: {{ shoppingbasket.items.length }}
            Total: {{ shoppingbasket.totalStr }}
            <button v-on:click="$emit('clear-basket')" class="blue-button">Clear</button>
            </p>
        </div>
    `
  });

  export default obj;