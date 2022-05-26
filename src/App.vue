<template>
  <div id="app">
    <div>
      <input type="text" placeholder="Monster Name" v-model="monster.name" />
      <button @click="save(monster)">Save</button>
    </div>
    <button @click="loadObjects">Load Objects</button>
    <div v-for="(object, index) in objects" :key="index">
      <input type="text" placeholder="name" v-model="object.name" />
      <button @click="save(object)">Save</button>
      object.index: {{ index }} object.name: {{ object.name }}
    </div>
  </div>
</template>
<script>
import { ParseVueObject } from './ParseVueObject';
export default {
  name: 'App',
  data() {
    return {
      monster: new ParseVueObject('Monster'),
      objects: [],
    };
  },
  methods: {
    async save(object) {
      alert('Object saved:' + JSON.stringify(object.attributes));
    },
    async loadObjects() {
      const getRandomItem = () => {
        const quotes = ['foo', 'bar', 'baz', 'chuck'];
        return quotes[Math.floor(Math.random() * quotes.length)];
      };
      const startSize = this.objects.length;
      const objs = [];
      for (let i = 0; i < 10; i++) {
        const myObject = new ParseVueObject('Monster');
        myObject.set('index', startSize + i);
        myObject.set('name', getRandomItem());
        objs.push(myObject);
      }
      this.objects.push(...objs);
    },
  },
};
</script>
