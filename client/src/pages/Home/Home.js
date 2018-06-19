import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";

import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import moment from "moment";

class Home extends Component {
    state = {
        articles: [],
        NYTResults: [],
        topic: "",
        from: "",
        to: ""
    };

    //load articles when first get to home page
    componentDidMount() {
        this.loadArticles();
        this.getOnlineNYTArticles("Travel", "20170101", "20180606");
    }

    getOnlineNYTArticles(topic, from, to) {
        var component = this;

        API.getNYTArticles(topic, from, to).then(function (res) {
            if (res) {
                var data = [];
                for (var i = 0; i < (5 > res.data.response.docs.length ? (res.data.response.docs.length) : 5); i++) {
                    var url = res.data.response.docs[i].web_url;
                    var title = res.data.response.docs[i].headline.main;
                    var pub_date = res.data.response.docs[i].pub_date;
                    var id = res.data.response.docs[i]._id;
                    var newData = {
                        _id: id,
                        title: title,
                        url: url,
                        pun_date: pub_date
                    }
                    data.push(newData)
                }
                component.setState({ NYTResults: data });
            }
        });
    }

    loadArticles() {
        API.getArticles()
            .then(res => this.setState({
                articles: res.data,
                topic: "",
                from: "",
                to: ""
            })).catch(err => console.log(err));
    }

    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    };


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    createNewArticle = (title, url) => {
        
        API.saveArticle({
          title: title,
          url: url,
          date: Date.now()
        })
          .then(res => this.loadArticles())
          .catch(err => console.log(err));
      }

    handleSearchNYT = event => {
        event.preventDefault();
        if (this.state.topic && this.state.from && this.state.to) {
            this.getOnlineNYTArticles(this.state.topic,
                moment(this.state.from).format("YYYYMMDD"),
                moment(this.state.to).format("YYYYMMDD"));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>Curate NYT articles of interest to you</h1>
                           
                        </Jumbotron>
                        <form>
                            {/* this part is the: Topic Input */}
                            <Input
                                value={this.state.topic}
                                onChange={this.handleInputChange}
                                name="topic"
                                placeholder="Topic"
                            />
                            {/* this part is the: From Input */}
                            <Input
                                value={this.state.from}
                                onChange={this.handleInputChange}
                                name="from"
                                placeholder="From Year"
                            />
                            {/* this part is the: To Input */}
                            <Input
                                value={this.state.to}
                                onChange={this.handleInputChange}
                                name="to"
                                placeholder="To Year"
                            />

                            <FormBtn
                                disabled={!(this.state.topic && this.state.from && this.state.to)}
                                onClick={this.handleSearchNYT}
                            >
                                Search NYT
                  </FormBtn>
                        </form>
                    </Col>
                </Row>
                {/* {console.log(this.state.NYTResults)} */}
                {this.state.NYTResults.length ? (
                    <Row>
                        <Col size="md-12 sm-12">
                            <p>Top Results:</p>
                            <List>
                                {this.state.NYTResults.map(article => (
                                    <ListItem key={article._id}>
                                        <Link to={article.url} target="_blank">
                                            <strong>
                                                {article.title}
                                                <br />{article.url}
                                                <br />Published at: {moment(article.pub_date).format("d/m/Y")}
                                            </strong>
                                        </Link>
                                        <SaveBtn onClick={() => this.createNewArticle(article.title, article.url)} />
                                    </ListItem>
                                ))}
                            </List>
                        </Col>
                    </Row>
                ) : (
                        <p></p>
                    )}
                <Row>
                    <Col size="md-12 sm-12">
                        <Jumbotron>
                            <h1>Saved Articles</h1>
                        </Jumbotron>
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map(article => (
                                    <ListItem key={article._id}>
                                        <Link to={article.url} target="_blank">
                                            <strong>
                                                Title: {article.title}
                                                <br />Link: {article.url}
                                                <br />Saved at: {moment(article.date).format("d/m/Y")}
                                            </strong>
                                        </Link>
                                        <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Home;