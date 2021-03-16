import { Parse } from 'parse';
const internal = ["objectId", "id", "className", "createdAt", "updatedAt", "_localId", "_objCount"];
class ParseVueObject extends Parse.Object {
  constructor(className) {
    super(className);
    this.loadData(this);
  }
  loadData(object) {
    if (!object || !object.toJSON) {
      return;
    }
    const data = object.toJSON();
    for (const key in data) {
      if (internal.includes(key)) {
        continue;
      }
      const value = data[key];
      object[key] = value;
      this.loadData(value);
    }
  }
  set(key, value) {
    super.set(key, value);
    this[key] = value;
  }
  async save() {
    const internal = ["id", "className", "createdAt", "updatedAt", "ACL"];
    for (const key in this) {
      if (internal.includes(key)) {
        continue;
      }
      if (JSON.stringify(this[key]) !== JSON.stringify(this.get(key))) {
        this.set(key, this[key]);
      }
    }
    // await super.save(); // uncomment on live server
  }
  _finishFetch(serverData) {
    super._finishFetch(serverData);
    this.loadData(this);
  }
}
export { ParseVueObject }
