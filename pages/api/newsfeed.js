
export default async function handler(req, res) {
    try {

      const rssResponse = await fetch('https://cointelegraph.com/rss/tag/hackers');
      if (!rssResponse.ok) {
        throw new Error(`Failed to fetch RSS feed. Status: ${rssResponse.status}`);
      }

      const rssData = await rssResponse.text();
  
      res.setHeader('Content-Type', 'application/xml');
      
      res.status(200).send(rssData);
    } catch (error) {
      console.error('API call error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }