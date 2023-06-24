import Article from "../../components/Article";
import {useState, useEffect} from "react";
import {Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

import "react-datepicker/dist/react-datepicker.css";
import Search from "../../components/Search";
import echo from "../../libs/Websockets";
import newsapi from "../../data/NewsApi";
import ArticlePlaceHolder from "../../components/ArticlesPlaceHolder";


function Articles() {

    const [articles, setArticles] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const channel = echo.private('articles.1');

        channel.listen('.data', (data) => {
            if("collection" in data){
                setShowLoading(false)
                setArticles(data.collection)
            }
        });

        return () => {
            channel.stopListening('.data');
        };
    }, []);

    const emptyArticles = () => {
        setShowLoading(true)
        setArticles([])
    }

    return (<>
        <Container>
            <Search cleanArticle={emptyArticles}/>
            <Row>
                {articles.length > 0 && articles.map((article) => {
                    return <div key={article.title} className="col-lg-3 col-md-4 col-sm-12"><Article {...article} /></div>
                })}
                {articles.length <= 0 && showLoading && [0,1,2,3,4,5,6,7].map((key) => {
                    return <div key={key} className="col-lg-3 col-md-4 col-sm-12"><ArticlePlaceHolder /></div>
                })}
            </Row>
        </Container>

    </>);
}

export default Articles;