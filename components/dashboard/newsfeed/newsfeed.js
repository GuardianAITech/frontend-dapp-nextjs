"use client"
import React, { useState, useEffect } from 'react';
import Parser from 'rss-parser';

const LoadingModal = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1E1E2E] rounded-lg p-6 w-full max-w-md mx-auto text-center">
        <div className="flex justify-center">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>
        <p className="mt-2 text-lg text-white">Loading News Feed...</p>
      </div>
    </div>
  );
};

const NewsFeed = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsFeed = async () => {
      try {
        const response = await fetch('/api/newsfeed');
        const xmlData = await response.text();
        const parser = new Parser();
        const feed = await parser.parseString(xmlData);

        const keywords = ['Hackers', 'Hacks', 'Fraud', 'exploit', 'crypto hacks', 'exploits', 'scams', 'hackers', 'phishing', 'exploit', 'hack', 'hacks', 'Phishing Scam', 'Malicious Link', 'Drainer Wallet', 'Hacking Risks', 'Scamming', 'Money Laundering', 'Cyber Crime' ];
        const filteredItems = feed.items.filter((item) =>
          item.categories.some((category) =>
            keywords.some((keyword) => category.includes(keyword))
          )
        );

        setNewsItems(filteredItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching news feed:', error);
      }
    };

    fetchNewsFeed();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-light text-white">Latest News about Exploits and Hacks</h2>
      {isLoading ? (
        <LoadingModal show={isLoading} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-[#1E1E2E] p-4 rounded-lg">
              {item.enclosure && item.enclosure.url && (
                <img src={item.enclosure.url} alt={item.title} className="w-full h-auto" />
              )}
              <h3 className="text-lg text-white mt-2">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.contentSnippet}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2">Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;

