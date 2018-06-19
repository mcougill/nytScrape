import axios from "axios";
const apiKEY = "f7b63bb7c86c48f8acf22dc039778738";
const nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export default {
    getNYTArticles: function(topic, from, to){
        return axios.get(nytURL+`?api-key=${apiKEY}&q=${topic}&begin_date=${from}&end_date=${to}`);
    },

    getArticles: function(){
        return axios.get("./api/articles");
    },

    getArticle: function(id) {
        return axios.get("./api/articles/"+id);
    },

    deleteArticle: function(id){
        return axios.delete("./api/articles/" + id);
    },

    saveArticle: function(articleData) {
        return axios.post("./api/articles", articleData);
    }
};