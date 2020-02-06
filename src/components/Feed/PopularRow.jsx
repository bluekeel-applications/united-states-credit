import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { getSrcFromHtml, trimSnippet } from '../../utils/feedTools';
import { Card } from 'react-bootstrap';

const LatestRow = () => {
    const { feedState } = useContext(AppContext);
    const articles = feedState.feed;
    let popularList = [];

    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const buildCardDeck = () => {
        for(let i = 13; i < 22; i++) {
            let currentObj = {
                title: articles[i].title,
                categories: articles[i].categories,
                link: articles[i].link,
                text: articles[i].contentSnippet,
                html: articles[i].content
            }
            popularList.push(currentObj);
        }

        return (
            popularList.map((article, i) => (
                <Card key={`article-card_${i}`} style={{ minWidth: '20vw', marginBottom: '20px' }} className='article-card' onClick={(e) => handleLinkClick(article.link, e)}>
                    <Card.Body className='card-body'>
                    <Card.Title className='row-column-item-title'>{article.title}</Card.Title>
                    <Card.Img variant="top" src={getSrcFromHtml(article.html)} />
                    <Card.Text className='card-text'>
                        {trimSnippet(article.text)} 
                    </Card.Text>
                    </Card.Body>                
                </Card>
            ))
        )
    };

    return (
        <div className='feed-row latest-row-container'>
            <div className='bottom-border row-title'>Popular</div>
            <div className='card-deck'>
                {!!articles && buildCardDeck()}
            </div>
        </div>
    )
};

export default LatestRow;