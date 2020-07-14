import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import Loading from '../../Shared/Loading';
import { useQuery } from '@apollo/react-hooks';
import { LIST_OFFER } from '../../../utils/queries';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListButton from './ListButton';

const ListedOffer = ({ id }) => {
	const [isOpen, setIsOpen] = useState(false);
    const { loading, error, data } = useQuery(LIST_OFFER, { variables: { id } });

	if (error) {
		return <div>Error getting list offer...</div>;
	};
	
	if (loading) {
		return <Loading />;
	};

	const OfferItem = data.fetchOfferById.body;

    return (
		OfferItem && (
			<Card 
				className='offer-list-item__container' 
				onClick={() => setIsOpen(!isOpen)}
				raised
			>
				<CardMedia 
					className='offer-list-item__image'
					component='img'
					image={OfferItem.offer_image}
					title={OfferItem.image_title}
				/>
				<CardContent>
					<div className='offer-list-item__title'>{OfferItem.title}</div>
					<Collapse 
						isOpened={isOpen} 
						hasNestedCollapse
						>
						<div className='offer-list-item__subtitle'>{OfferItem.subtitle}</div>
						<div className='offer-list-item__description'>{OfferItem.description}</div>
					</Collapse>
					<div className='offer-list-item__learn'>
						More Info
						<FontAwesomeIcon 
							icon={['fal', 'chevron-up']}
							className={`chevron-${isOpen ? 'open' : 'closed'}`}
						/>
					</div>
				</CardContent>
				<ListButton 
					link={OfferItem.link}
				/>
			</Card>
		)
	);
}

export default ListedOffer;