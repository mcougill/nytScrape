const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: true},
    date: { type: Date, default: Date.now},
    url: {type: String, required: true}
});

const News = mongoose.model("News", newsSchema);

module.exports = News;