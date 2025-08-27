const data = require('../data/truecaller-data.json');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { number, search, page = 1, limit = 10 } = req.query;
    
    let result = [...data];
    
    // Filter by number if provided
    if (number) {
      result = result.filter(item => 
        item.Number.includes(number) || item.Number === number
      );
    }
    
    // Search across multiple fields if search query is provided
    if (search) {
      const searchTerm = search.toLowerCase();
      result = result.filter(item => 
        item.Name.toLowerCase().includes(searchTerm) ||
        item.Email.toLowerCase().includes(searchTerm) ||
        item.Address.toLowerCase().includes(searchTerm)
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    
    const paginatedResult = result.slice(startIndex, endIndex);
    
    // Return response
    res.status(200).json({
      success: true,
      data: paginatedResult,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

    
