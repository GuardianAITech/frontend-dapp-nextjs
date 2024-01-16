
export default async function handler(req, res) {
    const { wallet } = req.query;
  
    if (!wallet) {
      return res.status(400).json({ error: 'Address is required' });
    }
  
    try {
      const authHeader = 'XYZ123';
  
      const transactionsResponse = await fetch(`https://testapi.hydra.ceo/get_transactions?wallet=${wallet}&page=0`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader
        }
      });
      const transactionsData = await transactionsResponse.json();
  
      res.status(200).json({ transactionsData });
  
    } catch (error) {
      console.error('API call error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }