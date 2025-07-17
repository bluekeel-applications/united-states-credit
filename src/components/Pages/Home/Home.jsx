import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { getBlogArticles } from "./utils";
import stylesheet from "./Home.css.js";
import Radium from 'radium';
import Appbar from '../../Shared/Appbar';
import TitleSection from './TitleSection';
import Lander from './Lander';
import Headlines from './Headlines';
import Categories from './Categories';
import Base from '../../Shared/Base';
import Search from './Search';

const Home = () => {
    const [blogArticles, setBlogArticles] = useState([]);
    const [trendingArticles, setTrendingArticles] = useState([]);
    const [headlines, setHeadlines] = useState([]);

    const getDate = (iso) => {
        const date = new Date(iso);
        const day = date.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        return {day, month};
    };

    const chopDescription = (desc) => {
        if(desc.length > 100) {
            return desc.substring(0, 150) + '...';
        }
        return desc;
    };

    const getTrendingArticles = (blogs) => {
        if (!blogs || blogs.length === 0) return;
        
        let trending = [];
        const trendingIndexes = [2, 4, 6, 8, 10];

        blogs.forEach((blog, i) => {
            if(trendingIndexes.includes(i)) {
                trending.push(blog);
            };
        });
        
        // Ensure we have exactly 5 articles
        while (trending.length < 5) {
            trending.push({
                publishedAt: new Date().toISOString(),
                categories: [{ title: "General" }],
                title: "Sample Article",
                author: "Staff Writer"
            });
        };

        const cleanedTrending = trending.map((article, index) => ({
            date: getDate(article.publishedAt),
            image: !!article.heroImage ? `https://blogs.unitedstatescredit.com${article.heroImage}` : "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
            thumbnail: !!article.thumbnail ? `https://blogs.unitedstatescredit.com${article.thumbnail}` : "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
            category: article.categories?.[0]?.title || "General",
            title: article.title || "Sample Article",
            desc: chopDescription(article.description) || "",
            author: article.author,
            featured: index === 0,
            url: `https://blogs.unitedstatescredit.com/posts/${article.slug}`
        }));
        setTrendingArticles(cleanedTrending);

        const cleanedHeadlines = blogs.map((article, index) => ({
            text: article.title,
            url: `https://blogs.unitedstatescredit.com/posts/${article.slug}`
        }));
        setHeadlines(cleanedHeadlines);
    };
    const fetchBlogArticles = async () => {
        const blogs = await getBlogArticles();
        setBlogArticles(blogs);
        getTrendingArticles(blogs);
    };

    useEffect(() => {
        if(blogArticles.length === 0) {
            fetchBlogArticles()
        };
        // eslint-disable-next-line
    }, [blogArticles]);

    const DateBadge = ({date}) => {
        return (
            <div style={stylesheet.dateBadge}>
                <div style={stylesheet.dateBadgeDay}>{date.day}</div>
                <div style={stylesheet.dateBadgeMonth}>{date.month}</div>
            </div>
        )
    };

    const handleArticleClick = (url) => {
        window.open(url, '_blank');
    };

    const FeaturedArticle = ({article}) => {
        return (
            <div onClick={() => handleArticleClick(article.url)} style={{...stylesheet.featuredArticleCard, 
                backgroundImage: `url(${article.image})`,
                backgroundColor: 'transparent'}}
            >
                <div style={stylesheet.featuredArticleCardTopRow}>
                    <div style={stylesheet.dateBadgeContainer}>
                        <DateBadge date={article.date} />
                    </div>
                </div>
                <div style={stylesheet.featuredArticleCardBottomRow}>
                    <div style={stylesheet.articleCategory}>{article.category}</div>
                    <div style={stylesheet.featuredArticleContent}>
                        <div style={stylesheet.featuredArticleTitle}>{article.title}</div>
                        <div style={stylesheet.featuredArticleDesc}>{article.desc}</div>
                    </div>
                    <div style={stylesheet.featuredArticleAuthor}>
                        Written by
                        <span style={{fontWeight: 'bold', color: '#2F8DFA', marginLeft: '5px'}}>{article.author}</span>
                    </div>
                </div>
            </div>
        )
    };

    const ArticleCard = ({article}) => {
        return (
            <div style={stylesheet.articleCard}>
                <div style={{...stylesheet.articleCardTopRow, backgroundImage: `url(${article.thumbnail})`, backgroundColor: 'transparent'}}>
                    <div style={stylesheet.dateBadgeContainer}>
                        <DateBadge date={article.date} />
                    </div>
                </div>
                <div style={stylesheet.articleCardBottomRow}>
                    <div style={stylesheet.articleCardCategory}>{article.category}</div>
                    <div style={stylesheet.articleCardTitle}>{article.title}</div>
                </div>
            </div>
        )
    };

    if(trendingArticles.length === 0) return <div>Loading...</div>;
  return (
    <div className={styles.homeWrapper}>
        <Appbar>
        {/* Lander Section */}
        <Lander />

        {/* Headlines */}
        <Headlines headlines={headlines} />

        {/* Trending Articles */}
        <section className={styles.trendingSection}>
            <TitleSection title="Trending Articles" />
            <div style={stylesheet.trendingGrid}>
                <div style={stylesheet.featuredArticleContainer}>
                    <FeaturedArticle article={trendingArticles[0]} />
                </div>
                <div style={stylesheet.articleCardContainer}>
                    <div style={{...stylesheet.articleCardContainerRow, marginBottom: '10px'}}>
                        <ArticleCard article={trendingArticles[1]} />
                        <ArticleCard article={trendingArticles[2]} />
                    </div>
                    <div style={{...stylesheet.articleCardContainerRow, marginTop: '10px'}}>
                        <ArticleCard article={trendingArticles[3]} />
                        <ArticleCard article={trendingArticles[4]} />  
                    </div>
                </div>
            </div>
        </section>

        {/* Categories */}
        <Categories />

        {/* Search */}
        <Search />

        <Base />

        </Appbar>
    </div>
  );
};

export default Radium(Home);