import Article from "../../components/Article";
import {useState, useEffect} from "react";
import {Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

import "react-datepicker/dist/react-datepicker.css";
import Search from "../../components/Search";
import echo from "../../libs/Websockets";
import ArticlePlaceHolder from "../../components/ArticlesPlaceHolder";
import {useAuth} from "../../providers/Auth.jsx";


function Articles() {

    const [articles, setArticles] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const auth = useAuth();
    const user = typeof auth.user == "object" ? auth.user : JSON.parse(auth.user)

    useEffect(() => {
        console.log(user.id)
        const channel = echo.private('articles.' + user.id);

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
                    return <div key={article.title} className="col-xl-3 col-lg-3 col-md-4 col-sm-6"><Article {...article} /></div>
                })}
                {articles.length <= 0 && showLoading && [0,1,2,3,4,5,6,7].map((key) => {
                    return <div key={key} className="col-xl-3 col-lg-3 col-md-4 col-sm-6"><ArticlePlaceHolder /></div>
                })}
            </Row>
        </Container>

    </>);
}

export default Articles;