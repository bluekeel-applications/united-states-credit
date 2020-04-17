import React, { useContext } from 'react';
import { AppContext } from '../../context';
import { getSrcFromHtml, trimSnippet } from '../../utils/feedTools';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
                <Card key={`article-card_${i}`} className='article-card'>
                    <CardActionArea onClick={(e) => handleLinkClick(article.link, e)} >
                        <CardContent className='card-body'>
                            <h2 className='row-column-item-title'>{article.title}</h2>
                            <CardMedia component='img' src={getSrcFromHtml(article.html)} />
                            <p className='card-text'>{trimSnippet(article.text)}</p>
                        </CardContent>
                    </CardActionArea>        
                </Card>
            ))
        )
    };

    return (
        <div className='feed-row latest-row-container'>
            <div className='bottom-border popular-title row-title'>Popular</div>
            <div className='card-deck'>
                {!!articles && buildCardDeck()}
            </div>
        </div>
    )
};

export default LatestRow;