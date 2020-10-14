export default {
    feed: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '20px 0 5vh 0',
        '@media (max-width: 767px)': {
            padding: '0',
        }
    },
    data: {
        topText: `Credit, now more than ever, has become the financial lifeblood of the American consumer. 
        At United States Credit we know and understand the importance and impacts credit can have. 
        We also know and understand the frustrations involved in the credit approval process. 
        United States Credit provides a wealth of knowledge at your fingertips written in a way that 
        the credit laymen can understand. Find the right loan, find the right credit card and find the 
        right knowledge. When your ready, answer a few quick questions and our visual credit search can 
        help to simplify the process and remove the frustration in finding the right credit for you!`
    },
    overrideFeatured: {
        featuredTitle: {
            color: '#092c7e',
            marginRight: '25px',
            fontSize: '3rem',
            fontFamily: 'Roboto'
        },
        itemTitle: {
            color: '#092c7e',
            fontFamily: 'Roboto'
        }
    },
    overrideKnowledge: {
        contentTitleSpan: { color: '#f80000', fontFamily: 'Roboto' },
        typeColumnTitle: { color: '#f80000', fontFamily: 'Roboto' },
        columnItemTitle: { color: '#092c7e' }
    },
    overrideEditorial: {
        contentTitleSpan: { color: '#f80000', fontFamily: 'Roboto' },
        editorialTitle: { color: '#092c7e', fontFamily: 'Roboto' },
        articleTitle: { color: '#092c7e', fontFamily: 'Roboto' }
    },
    overrideLatest: {
        contentTitleSpan: { color: '#f80000', fontFamily: 'Roboto' },
        articleTitle: { color: '#092c7e', fontFamily: 'Roboto' }
    },
    overridePopular: {
        contentTitleSpan: { color: '#f80000', fontFamily: 'Roboto' },
        cardTitle: { color: '#092c7e', fontFamily: 'Roboto' }
    },
}