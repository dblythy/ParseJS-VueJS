import { Parse } from 'parse';
const internal = ["objectId", "id", "className", "createdAt", "updatedAt", "_localId", "_objCount"];
class ParseVueObject extends Parse.Object {
  constructor(className) {
    super(className);
    this.loadData(this);
  }
  loadData(object) {
    if (!object.toJSON) {
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
  async save() {
    const saveNested = object => {
      for (const key in object) {
        if (internal.includes(key)) {
          continue;
        }
        let value = this[key];
        if (Array.isArray(value)) {
          const newArray = [];
          for (let i = 0; i < value.length; i++) {
            let nestedValue = value[i];
            if (nestedValue && nestedValue.__type) {
              nestedValue = Parse._decode(null, nestedValue);
            }
            newArray.push(nestedValue);
          }
          value = newArray;
        }
        if (value && value.__type) {
          const obj = Parse._decode(null, this[key]);
          saveNested(obj);
        } else if (JSON.stringify(object.get(key)) !== JSON.stringify(value)) {
          object.set(key, value);
        }
      }
    };
    saveNested(this);
    // await super.save(); uncomment on live server
  }
  _finishFetch(serverData) {
    super._finishFetch(serverData);
    this.loadData(this);
  }
}
export { ParseVueObject }