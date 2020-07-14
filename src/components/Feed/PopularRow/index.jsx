import React from 'react';
import { getSrcFromHtml, trimSnippet } from '../../../utils/feedTools';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_FEED } from '../../../utils/queries';
import Loading from '../../Shared/Loading';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const LatestRow = () => {
    
    const handleLinkClick = (linkout, e) => {
        e.preventDefault();
        window.open(linkout, '_blank');
    };

    const { loading, error, data } = useQuery(FETCH_FEED, { variables: { type: 'popular' }});

    if(error) {
        return <div className='feed_loader'>Error occurred fetching Popular Article Feed!...please reload</div>
    };

    if(loading) {
        return (
            <div className='feed-row popular-row-container'>
                <div className='bottom-border popular-title row-title'>Popular</div>
                <div className='feed_loader'><Loading /></div>
            </div>
        )
    };

    const popular = data.fetchFeed.body.items;

    const buildCardDeck = () => {
        let popularList = [];
        popular.map((article, idx) => {
            if(idx >= 4) return null;
            let currentObj = {
                title: article.title,
                categories: article.categories,
                link: article.link,
                content: article.contentSnippet,
                html: article.content
            };
            popularList.push(currentObj);
            return null;
        });

        return (
            popularList.length > 0 && (
                popularList.map((article, i) => (
                    <Card key={`article-card_${i}`} className='article-card'>
                        <CardActionArea onClick={(e) => handleLinkClick(article.link, e)} >
                            <CardContent className='card-body'>
                                <h2 className='card-title row-column-item-title'>{article.title}</h2>
                                <CardMedia component='img' src={getSrcFromHtml(article.html, true, 'lg')} />
                                <p className='card-text'>{trimSnippet(article.content)}</p>
                            </CardContent>
                        </CardActionArea>        
                    </Card>
                ))
            )
        )
    };

    return (
        <div className='feed-row popular-row-container'>
            <div className='bottom-border popular-title row-title'>Popular</div>
            {data && (
                <div className='card-deck'>
                    {buildCardDeck()}
                </div>
            )}
        </div>
    )
};

export default LatestRow;