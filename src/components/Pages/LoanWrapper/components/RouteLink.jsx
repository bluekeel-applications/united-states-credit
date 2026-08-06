import React from 'react';
import Radium from 'radium';
import { useNavigate } from 'react-router-dom';

// Router link rendered as a plain <a> so Radium can resolve ':hover' and
// '@media' keys in its style prop — Radium skips composite components like
// react-router's <Link>, leaving those keys inert. Modified clicks (new tab,
// download, middle-click) and links with a non-self target keep native
// anchor behavior, like react-router's own <Link>.
const RouteLink = ({ to, onClick, target, ...props }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        if (onClick) onClick(event);
        if (event.defaultPrevented) return;
        if (target && target !== '_self') return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        navigate(to);
    };

    // eslint-disable-next-line jsx-a11y/anchor-has-content -- children arrive via spread
    return <a href={to} target={target} onClick={handleClick} {...props} />;
};

export default Radium(RouteLink);
