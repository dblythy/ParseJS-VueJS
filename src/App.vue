<template>
  <div id="app">
    <div>
      <input type="text" placeholder="Monster Name" v-model="monster.name"/>
      <button @click="save(monster)">Save</button>
    </div>
    <button @click="loadObjects">Load Objects</button>
    <div v-for="object,index in objects" :key="index">
      <input type="text" placeholder="text" v-model="object.text"/>
      <button @click="save(object)">Save</button>
      object.index: {{object.index}}
      object.text: {{object.text}}
    </div>
  </div>
</template>
<script>
import { ParseVueObject } from './ParseVueObject';
import { Parse } from 'parse';
export default {
  name: 'App',
  data() {
    return {
      monster: new ParseVueObject('Monster'),
      objects: []
    }
  },
  async created() {
    // build some mock data
    const getRandomItem = () => {
      const quotes = ["foo", "bar", "baz", "chuck"];
      return quotes[Math.floor( Math.random() * quotes.length )];
    }
    const objs = [];
    for (let i=0;i<10;i++) {
      const myObject = new Parse.Object('MyObject');
      myObject.set('index',i);
      myObject.set('text', getRandomItem());
      objs.push(myObject);
    }
    await Parse.Object.pinAll(objs);
  },
  methods: {
    async save(object) {
      await object.save();
      alert('Object saved:'+JSON.stringify(object.attributes));
      await object.pin();
    },
    async loadObjects() {
      const query = new Parse.Query('MyObject');
      query.fromLocalDatastore();
      this.objects = await query.find();
    }
  },
}
</script>
