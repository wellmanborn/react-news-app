import {Card, Placeholder} from "react-bootstrap";
import PlaceHolderImg from "../assets/placeholder.png";

// eslint-disable-next-line react/prop-types
function ArticlePlaceHolder() {

    return (
        <Card style={{ width: "100%", marginBottom: '1.7rem' }}>
            <Card.Img variant="top" src={PlaceHolderImg} />
            <Card.Body>
                <div className="mb-2">
                    <span className="data-source-name"><Placeholder xs={3} /></span> -
                    <span className="article-date"> <Placeholder xs={6} /> </span>
                </div>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={12} />
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <div>
                    <span className="article-category"><Placeholder xs={3} /></span>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ArticlePlaceHolder;