import React from 'react';
import useDocumentMeta from '../../../../utils/hooks/useDocumentMeta';
import LegalPageLayout from './LegalPageLayout';

// Route element for a registry-driven legal page.
const LegalPage = ({ page, content }) => {
    useDocumentMeta(page.documentTitle, page.metaDescription);
    return <LegalPageLayout h1={page.h1} lede={page.lede} content={content} />;
};

export default LegalPage;
