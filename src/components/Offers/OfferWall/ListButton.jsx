import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListButton = ({ link }) => {
	
    return (
		link && (
			<div className='offer-list-item__button'>
				<FontAwesomeIcon 
					icon={['fal', 'chevron-up']}
					className='chevron-link'
				/>
			</div>
		)
	);
}

export default ListButton;