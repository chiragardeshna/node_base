export default async (value, model, field) => {
    let filter = {};
    filter[field] = value;
    let entity = await model.findOne(filter);
    if (entity) throw "Entity already exists";
}