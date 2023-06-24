import {Card} from "react-bootstrap";
import newsImage from "../assets/No-Image-Found-400x264.png";

// eslint-disable-next-line react/prop-types
function Article({author, category, image, published_at, summary, title, url}) {

    return (
        <Card style={{ width: "100%", marginBottom: '1.7rem' }}>
            {image && <Card.Img variant="top" src={image } />}
            <Card.Body>
                <div className="mb-2">
                    <span className="data-source-name">{category}</span> -
                    <span className="article-date"> {published_at}</span>
                </div>
                <Card.Title><a target="_blank" href={url}>{title}</a></Card.Title>
                <Card.Text>{summary}</Card.Text>
                <div>
                    <span className="article-category">{author}</span>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Article;