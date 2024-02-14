
export default async function handler(req, res) {
    const { contract } = req.query;
    if (!contract) {
      return res.status(400).json({ error: 'Address is required' });
    }
  
    try {
      const authHeader = 'XYZ123';
  
      const scanResponse = await fetch(`https://testapi.hydra.ceo/analyze_contract/${contract}`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader
        }
      });
      const scanData = await scanResponse.json();
  
      res.status(200).json({ scanData});
  
    } catch (error) {
      console.error('API call error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }